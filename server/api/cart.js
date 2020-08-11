const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
module.exports = router

//finds or creates cart (Order with cart status) for logged-in and guest users
router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      //Logged-in Case
      const userId = req.user.id
      const cart = await Order.findOrCreate({
        where: {
          userId,
          status: 'cart'
        }
      })
      res.json(cart[0])
    } else {
      //Guest Case
      const userId = req.session.id
      const cart = await Order.findOrCreate({
        where: {
          userId,
          status: 'cart'
        }
      })
      res.json(cart[0])
    }
  } catch (err) {
    next(err)
  }
})

//gets information from OrderProduct through table based on orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const {orderId} = req.params
    //use orderId to findAll OrderProduct rows
    //with the information needed to display cart details.
    const cartDetails = await OrderProduct.findAll({
      where: {
        orderId
      }
      //include: [{model: Product}],
      //Eager Loading doesn't work here due to an association not existing
      //I will need to see if I can include model Product on an order query
      //Otherwise, another option would be to run a Promise.all using productId(s) from the return above
    })
    res.json(cartDetails)
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params
    const [orderDetails] = await OrderProduct.findOrCreate({
      where: {
        orderId,
        productId
      }
    })
    //load product instance
    const productInstance = await Product.findByPk(productId)
    const {quantity} = req.body

    //decrement product inventory by given quantity
    await productInstance.decrement(['inventory'], {by: quantity})

    //increment order_products instance by quantity
    const updatedDetails = await orderDetails.increment(['quantity'], {
      by: quantity
    })

    //return updated instance of order details
    res.json(updatedDetails)
  } catch (err) {
    next(err)
  }
})

/**
 *
 * (delete route)
 * remove product from cart route (destroy)
 *
 */

router.delete('/:orderId/product/:productId', async (req, res, next) => {
  try {
    const {orderId, productId} = req.params

    //find row to grab quantity (could also be passed by req.body? from state?)
    const productToRemove = await OrderProduct.findOne({
      where: {
        orderId,
        productId
      }
    })

    //load product instance
    const productInstance = await Product.findByPk(productId)

    //increment inventory by quantity from product being removed
    await productInstance.increment(['inventory'], {
      by: productToRemove.quantity
    })

    //remove row from through table
    const removalSuccess = await OrderProduct.destroy({
      where: {
        orderId,
        productId
      }
    })
    res.json(removalSuccess)
  } catch (err) {
    next(err)
  }
})
