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
      },
      include: [{model: Product}]
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
 * ROUTES TO ADD
 *
 * (post route?)
 * add product to cart route (find or create) if found update, update product qty based on difference between found qty and given qty
 *      if not found create, decrement product qty based on given qty
 *
 * (delete route)
 * remove product from cart route (destroy)
 *
 */
