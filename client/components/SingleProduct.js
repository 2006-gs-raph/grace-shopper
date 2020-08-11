import React, {useState, useEffect} from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import ProdQtyButton from './ProdQtyButton'

const SingleProduct = props => {
  const {product, onAddToCart, getProduct} = props
  useEffect(() => {
    const productId = props.match.params.productId
    getProduct(productId)
  }, [])
  // create onAddToCart function in main component (index.js?)
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
        <ProdQtyButton />
        <br />
        <button
          type="button"
          className="btn btn-primary mx-2 mb-2"
          onClick={() => {
            if (onAddToCart) {
              onAddToCart()
            }
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
    getProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
