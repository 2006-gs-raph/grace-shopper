import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

// MY CODE

const SET_USERS = 'SET_USERS'
const SET_SINGLE_USER = 'SET_SINGLE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

//_____________________________________________

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

// MY CODE

const setUsers = users => ({type: SET_USERS, users})
const setSingleUser = user => ({type: SET_SINGLE_USER, user})
const addUser = user => ({type: ADD_USER, user})
const updatedUser = user => ({type: UPDATE_USER, user})
const deleteUser = userId => ({type: DELETE_USER, userId})

//_____________________________________________

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// MY CODE

export const fetchUsers = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleUser = userId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const postUser = user => {
  return async function(dispatch) {
    try {
      const {data} = await axios.post('/api/users', user)
      dispatch(addUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateUser = user => {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(updateUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteSelectedUser = userId => {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(fetchUsers)
    } catch (error) {
      console.log(error)
    }
  }
}

//not sure about initial state??

//______________________________________________________

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case SET_USERS:
      return action.users
    case SET_SINGLE_USER:
      return action.user
    case ADD_USER:
      return action.user
    case UPDATE_USER:
      //NOT SURE ABOUT THIS ONE
      return action.user
    case DELETE_USER:
      return action.users
    default:
      return state
  }
}
