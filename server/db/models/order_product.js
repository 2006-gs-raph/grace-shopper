const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_products', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
