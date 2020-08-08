import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {putUser, fetchSingleUser} from '../store/userReducer'

/**
 * COMPONENT
 */
export const SingleUser = props => {
  const {user, getUser} = props
  useEffect(() => {
    const userId = props.match.params.userId
    getUser(userId)
  }, [])
  return (
    <div>
      <h3>Profile for {user.email}</h3>
      <div className="card">
        <div className="card-header">User Information:</div>

        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.lastName}
          </h5>
          <p className="card-text"> {user.address} </p>
          <p className="card-text">{user.phone}</p>
          <p className="card-text">{email}</p>
          <button type="button" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>

      <h2>Order History:</h2>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    user: state.userReducer.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: userId => dispatch(fetchSingleUser(userId)),
    updateUser: userId => dispatch(putUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
