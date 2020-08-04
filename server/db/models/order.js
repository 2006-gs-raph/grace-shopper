const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  //The products array below will contain objects with productId
  //name, quantity, price
  products: {
    type: DataTypes.STRING,
    get: function() {
      //Here we are parsing the string to get back an array of objects
      return JSON.parse(this.getDataValue('products'))
    },
    set: function(orderArray) {
      //Here we are stringifying our array so that it can be stored in the db
      return this.setDataValue('products', JSON.stringify(orderArray))
    },
    validate: {
      notEmpty: true
    }
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
