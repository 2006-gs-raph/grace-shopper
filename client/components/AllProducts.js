import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/product'
import {connect} from 'react-redux'

const fakeAddToCartFunc = () => {
  return 'welp'
}

export const AllProducts = props => {
  /*     //useState Hook below (substitute for local state)
  const [name, setName] = useState('');
  const [lasName, setLastName] = useState(''); */

  //useEffect Hook
  useEffect(() => {
    getProducts()
  }, [])

  const {products, getProducts, onAddToCart} = props

  return (
    <div>
      <h1>All Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <br />
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <br />
              {product.name}
            </Link>
            <br />${product.price / 100}
            {/* not sure if the above is right; also we need to update the prices elsewhere to be x100 */}
            <br />
            {/* code for displaying whether the product is in stock */}
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
        ))}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.product.list
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
