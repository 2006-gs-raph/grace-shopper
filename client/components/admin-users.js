import React from 'react'

export const AdminUsers = props => {
  const {users} = props

  users.map(user => {
    return (
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
    )
  })
}

export default AdminUsers
