import axios from 'axios'
import history from '../history'
import product from './product'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const UPDATE_PRODUCT_QTY = 'UPDATE PRODUCT_QTY'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})
const addProductToCart = selectedProduct => ({
  type: ADD_PRODUCT_TO_CART,
  selectedProduct
})
const updateProductQty = (productId, qty) => ({
  type: UPDATE_PRODUCT_QTY,
  productId,
  qty
})
const removeProductFromCart = productId => ({
  type: REMOVE_PRODUCT_FROM_CART,
  productId
})

/**
 * THUNK CREATORS
 */

export const fetchCart = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(setCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCart = selectedProduct => {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/cart', selectedProduct)
      dispatch(addProductToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProduct = (productId, qty) => {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/cart/${productId}`, qty)
      dispatch(updateProductQty(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = productId => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/cart/${productId}`)
      dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  list: [],
  selectedProduct: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, list: action.cart}
    case ADD_PRODUCT_TO_CART:
      return {...state, selectedProduct: action.selectedProduct}
    case UPDATE_PRODUCT_QTY:
      return {...state}
    case REMOVE_PRODUCT_FROM_CART:
      return {}
    default:
      return state
  }
}
