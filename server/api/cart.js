const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'cart'
      }
    })
    res.json(cart[0])
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

router.put('')
