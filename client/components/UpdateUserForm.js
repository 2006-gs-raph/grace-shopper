import React from 'react'

const UserForm = props => (
  <form id="user-form" onSubmit={props.handleSubmit}>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="firstName">First Name:</label>

        <input
          name="firstName"
          className="form-control"
          type="text"
          onChange={props.handleChange}
          value={props.firstName}
          placeholder="First Name required"
          required
        />
      </div>

      <div className="form-group col-md-6">
        <label htmlFor="lastName">Last Name:</label>

        <input
          name="lastName"
          className="form-control"
          type="text"
          onChange={props.handleChange}
          value={props.lastName}
          placeholder="Last Name required"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="btn btn-info"
      disabled={!props.firstName || !props.lastName}
    >
      Submit
    </button>
  </form>
)

export default UserForm
