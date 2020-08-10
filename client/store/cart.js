import axios from 'axios'
import history from '../history'

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
const addProductToCart = product => ({type: ADD_PRODUCT_TO_CART, product})
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

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
