import React from 'react'

export default (props) => (
  <div>
    <h2>error: 404</h2>
    <p>Page not found: {props.location.pathname}</p>
  </div>
)
