import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export const ConfirmationPage = props => {
  return (
    <div>
      <h1>Confirmation Page</h1>
    </div>
  )
}

export default connect(null, null)(ConfirmationPage)
