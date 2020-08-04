const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://icon-library.com/images/bag-icon-png/bag-icon-png-21.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10000
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 10.0,
    validate: {
      min: 10.0,
      max: 10000.0
    }
  }
})

module.exports = Product
