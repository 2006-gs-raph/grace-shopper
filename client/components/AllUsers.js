import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/userReducer'

const AllUsers = props => {
  const {users, getUsers} = props
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      {users.map(user => (
        <table className="table" key={user.id}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td className="btn-group" role="group">
                <button type="button" className="btn btn-success">
                  Add
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button type="button" className="btn btn-info">
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

const mapState = state => {
  return {
    users: state.userReducer.list
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
