import React from 'react'
import {Link} from 'react-router-dom'

export default ({ match }) => {
  return (
    <div>
      <h1>Another app page</h1>
      <Link to='/word-cards-app'>Go to main app page</Link>
    </div>
  )
}
