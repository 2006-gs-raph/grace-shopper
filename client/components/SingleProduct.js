import React from 'react'

const fakeAddToCartFunc = () => {
  return 'welp'
}

const fakeDropdownFunc = () => {
  return 'also welp'
}

function SingleProduct(props) {
  const product = props.product

  return (
    <div>
      <br />
      <img src={product.imageUrl} />
      <br />
      {product.name}
      <br />
      &dollar;{product.price / 100}
      {/* not sure if on right track; in any case need to adjust for decimal places */}
      <br />
      {product.description}
      <br />
      <div className="dropdown">
        <button type="button" onClick={() => fakeDropdownFunc()}>
          Qty
        </button>
        <div id="dropdownContent">
          {/* dropdown content (numbers 1-x?); each dropdown selection needs functionality in terms of qty added to cart */}
        </div>
      </div>
      <br />
      <button type="button" onClick={() => fakeAddToCartFunc()}>
        Add to cart
      </button>
    </div>
  )
}

export default SingleProduct
