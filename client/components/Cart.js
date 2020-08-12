import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchCartThunk,
  addOrUpdateProductThunk,
  removeProductFromCartThunk
} from '../store/cart'

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
  const {
    products,
    order,
    orderId,
    getCart,
    addOrUpdateProduct,
    removeProductFromCart
  } = props

  useEffect(() => {
    getCart()
  }, [])

  async function handleRemoveFromCart(productId) {
    await removeProductFromCart(orderId, productId)
    await getCart()
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="card-deck mb-5">
        {products.map(product => (
          <div key={product.id} className="card">
            <br />
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} className="w-100" />
              <br />
              {product.name}
            </Link>
            <br />${product.price / 100}
            <br />
            {/* code for displaying whether the product is in stock */}
            <br />
            <button
              type="button"
              className="btn btn-outline-primary mx-2 mb-2"
              onClick={() => handleClick(product.id)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="btn btn-outline-primary mx-2 mb-2"
              onClick={() => handleRemoveFromCart(product.id)}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    orderId: state.cart.order.id,
    order: state.cart.order,
    products: state.cart.order.products
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(fetchCartThunk()),
    addOrUpdateProduct: (orderId, productId, quantity) =>
      dispatch(addOrUpdateProductThunk(orderId, productId, quantity)),
    removeProductFromCart: (orderId, productId) =>
      dispatch(removeProductFromCartThunk(orderId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
