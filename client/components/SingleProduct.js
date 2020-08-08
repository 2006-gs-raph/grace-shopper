import React, {useState, useEffect} from 'react'
import {Dropdown} from 'react-bootstrap'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'

// const fakeDropdownFunc = () => {
//   return 'also welp'
// }

const SingleProduct = props => {
  const {product, onAddToCart, getProduct} = props
  useEffect(() => {
    const productId = props.match.params.productId
    getProduct(productId)
  }, [])
  // create onAddToCart function in main component (index.js?)
  console.log('help')
  return (
    <div>
      <br />
      <img src={product.imageUrl} />
      <br />
      {product.name}
      <br />${product.price / 100}
      <br />
      {product.description}
      <br />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <button
        type="button"
        onClick={() => {
          if (onAddToCart) {
            onAddToCart()
          }
        }}
      >
        Add to cart
      </button>
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
