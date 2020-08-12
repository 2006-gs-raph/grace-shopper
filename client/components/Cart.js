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
    async function callGetCart() {
      await getCart()
    }
    callGetCart()
  }, [])

  async function handleRemoveFromCart(productId) {
    await removeProductFromCart(orderId, productId)
    await getCart()
  }

  async function handleIncreaseQuantity(productId) {
    await addOrUpdateProduct(orderId, productId, 1)
    await getCart()
  }

  async function handleCheckout() {}

  let orderTotal
  return !products ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>Cart</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          {products.map(product => (
            <li key={product.id} className="list-group-item">
              <br />
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} className="w-25" />
                <br />
                {product.name}
              </Link>
              <br />
              {`Price $${product.price / 100}`}
              <br />
              {`Quantity ${product.order_products.quantity}`}
              <br />
              {`Subtotal $${(
                product.price *
                product.order_products.quantity /
                100
              ).toFixed(2)}`}
              {/* code for displaying whether the product is in stock */}
              <br />
              <button
                type="button"
                className="btn btn-outline-primary mx-2 mb-2"
                onClick={() => handleIncreaseQuantity(product.id)}
              >
                Increase quantity
              </button>
              <button
                type="button"
                className="btn btn-outline-primary mx-2 mb-2"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                Remove from cart
              </button>
            </li>
          ))}
          <li className="list-group-item">
            {`Order Total $${(orderTotal =
              order.products.reduce((accum, currVal) => {
                return (accum +=
                  currVal.price * currVal.order_products.quantity)
              }, 0) / 100).toFixed(2)}`}
            <button
              type="button"
              className="btn btn-outline-primary mx-2 mb-2"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </li>
        </ul>
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
