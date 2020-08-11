const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
module.exports = router

//needs to update to give back through-table information

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      //Logged-In case
      const userId = req.user.id
      //use userId to find order with status cart
      const cart = await Order.findOrCreate({
        where: {
          userId,
          status: 'cart'
        }
      })
      const orderId = cart[0].id
      //use userId and orderId to find OrderProduct (through table)
      //with the information needed to display cart details.
      const cartDetails = await OrderProduct.findAll({
        where: {
          orderId
        },
        include: [{model: Product}]
      })
      res.json(cartDetails)
    } else {
      //Guest Case
      if (!req.session.cart) {
        req.session.cart = {}
      }
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

//Goal is to have the one order with status 'cart' update upon changes to redux
//state, such as add and remove operations
router.put('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'cart'
      }
    })
    const userId = req.user.id
    const orderId = cart.id
    const [numUpdated, updatedOrderProduct] = await OrderProduct.update(
      req.body,
      {
        where: {
          userId,
          orderId
        },
        returning: true,
        plain: true
      }
    )
    if (numUpdated) {
      res.json(updatedOrderProduct[0])
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})
