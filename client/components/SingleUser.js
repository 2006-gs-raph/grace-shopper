import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {putUser, fetchSingleUser} from '../store/userReducer'
import UpdateUserForm from './UpdateUserForm'

/**
 * COMPONENT
 */
export const SingleUser = props => {
  useEffect(() => {
    const userId = props.match.params.userId
    getUser(userId)
  }, [])

  const {user, getUser} = props

  return (
    <div className="row">
      <div className="col-sm-4">
        <h3 className="lead">User Information </h3>{' '}
        <div className="card">
          <div className="card-body">
            <p className="card-title">
              <strong>Full Name:</strong> <span />
              {user.firstName} {user.lastName}
            </p>
            <p className="card-text">
              {' '}
              <strong>Address:</strong> {user.address}{' '}
            </p>
            <p className="card-text">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
            <button type="button" className="btn btn-outline-info">
              UPDATE
            </button>
          </div>
        </div>
      </div>
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
