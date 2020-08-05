const router = require('express').Router()

const {Order} = require('../db/models')
//const {User} = require('../db/models')

//get all orders
router.get('/', async (req, res, next) => {
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
router.get('/:orderNumber', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderNumber)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//create new order
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

//delete an order
router.delete('/:orderNumber', (req, res, next) => {
  Order.destroy({
    where: {
      orderNumber: req.params.orderNumber
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

//update an order
router.put('/:orderNumber', (req, res, next) => {
  Order.findByPk(req.params.orderNumber)
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})

module.exports = router
