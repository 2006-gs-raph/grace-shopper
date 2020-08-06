const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
    get: function() {
      const products = JSON.parse(this.getDataValue('products'))
      let total
      for (let product of products) {
        total += product.qty * product.price
      }
      return total
    }
  },
  status: {
    type: Sequelize.ENUM('cart', 'cancelled', 'pending', 'shipped'),
    defaultValue: 'cart'
  },
  orderDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order
