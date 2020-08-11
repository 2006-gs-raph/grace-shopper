import React, {useState, useEffect} from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import {addOrUpdateProductThunk, fetchCartThunk} from '../store/cart.js'
import ProdQtyButton from './ProdQtyButton'

const SingleProduct = props => {
  const {product, getProduct, getCart, orderId} = props

  useEffect(() => {
    const productId = props.match.params.productId
    getProduct(productId)
  }, [])
  // create onAddToCart function in main component (index.js?)
  //const onAddToCart = () => addOrUpdateProductThunk()
  let productQty = 1

  return (
    <div>
      <br />
      <img src={product.imageUrl} className="w-25" />
      <br />
      {product.name}
      <br />${product.price / 100}
      <br />
      {product.description}
      <br />
      <div className="row">
        <ProdQtyButton
          onUpdated={qty => {
            productQty = qty
          }}
        />
        <br />
        <button
          type="button"
          className="btn btn-primary mx-2 mb-2"
          onClick={() => {
            addOrUpdateProductThunk(orderId, product.id, productQty)
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    product: state.product.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => dispatch(fetchSingleProduct(productId)),
    addOrUpdateProduct: (orderId, productId, quantity) =>
      dispatch(addOrUpdateProductThunk(orderId, productId, quantity)),
    getCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
