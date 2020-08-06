const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderProduct
