import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCartThunk} from '../store/cart'

/**
 *
 * CART Component Needs:
 * list of items and quantities in cart
 * ability remove an item from cart
 *
 * checkout button (performs checkout operations)
 *    updates order to 'completed' status and creates new empty cart
 *    pushes confirmation page to history (navigates to confirmation page)
 */

const Cart = props => {
  const {list, getCart} = props
  useEffect(() => {
    getCart()
  }, [])

  return <div>Cart Page</div>
}

const mapState = state => {
  return {
    order: state.cart.order
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Cart)
