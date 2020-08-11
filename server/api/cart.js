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
      //include: [{model: Product}], (eager loading option)
    })
    res.json(cartDetails)
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

/**
 * OLD PUT ROUTE
 */

// router.put('/', async (req, res, next) => {
//   try {
//     const cart = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'cart',
//       },
//     })
//     const userId = req.user.id
//     const orderId = cart.id
//     const [numUpdated, updatedOrderProduct] = await OrderProduct.update(
//       req.body,
//       {
//         where: {
//           userId,
//           orderId,
//         },
//         returning: true,
//         plain: true,
//       }
//     )
//     if (numUpdated) {
//       res.json(updatedOrderProduct[0])
//     } else {
//       res.status(400).end()
//     }
//   } catch (err) {
//     next(err)
//   }
// })
