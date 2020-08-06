import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const fakeAddToCartFunc = () => {
  return 'welp'
}

function AllProducts(props) {
  const products = props.products

  return (
    <div>
      <h1>All Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <br />
            <Link to={`/products/{product.id}`}>
              <img src={product.imageUrl} />
              <br />
              {product.name}
            </Link>
            <br />
            &dollar;{product.price / 100}
            {/* not sure if the above is right; also we need to update the prices elsewhere to be x100 */}
            <br />
            {/* code for displaying whether the product is in stock */}
            <br />
            <button type="button" onClick={() => fakeAddToCartFunc()}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
