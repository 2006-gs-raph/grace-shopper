import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUser} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, user} = props

  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
      <div className="card">
        <div className="card-header">User Information:</div>

        <div className="card-body">
          <h5 className="card-title">
            {user.firstName} {user.lastName}
          </h5>
          <p className="card-text">
            {user.address} {user.phone}
          </p>
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
    email: state.user.email,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
