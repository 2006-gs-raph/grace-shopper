const router = require('express').Router()

const {Order} = require('../db/models')
//const {User} = require('../db/models')

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('You do not have access')
    error.status = 401
    return next(error)
  }
  next()
}

//get all orders
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        'orderNumber',
        'productList',
        'subTotal',
        'status',
        'orderDate'
      ]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//get one order by orderNumber
//need a way to restrict this to admins and users?
router.get('/:orderNumber', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderNumber)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//create new order
//need a way to restrict this to admins and users?
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

//delete an order
router.delete('/:orderNumber', isAdmin, (req, res, next) => {
  Order.destroy({
    where: {
      orderNumber: req.params.orderNumber
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

//update an order
router.put('/:orderNumber', isAdmin, (req, res, next) => {
  Order.findByPk(req.params.orderNumber)
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})

module.exports = router
