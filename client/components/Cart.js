import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/order'

const Cart = props => {
  const {list, cart, selectedOrder, getCart} = props
  useEffect(() => {
    getCart()
  })

  return <div>Cart Page</div>
}

const mapState = state => {
  return {
    list: state.order.list,
    cart: state.order.cart,
    selectedOrder: state.order.selectedOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
