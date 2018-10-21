import React from 'react'
import {Link} from 'react-router-dom'

function handleError (response, error, homeLink) {
  let elem = null

  if (error) {
    elem = (
      <div>
        <p>Error: {error.message}</p>
        <Link to={homeLink}>Home</Link>
      </div>
    )
  } else if (response.message === 'need authorization') {
    elem = (
      <div>
        <p>You need authorized to access this page</p>
        <Link to={`${homeLink}/signin`}>Go to signin page</Link>
        <br/>
        <Link to={homeLink}>Home</Link>
      </div>
    )
  } else if (response.message === 'not enough rights') {
    let groupList = response.arg.groupList.map(group => group + ' ')
    elem = (
      <div>
        <h4>Hello {response.arg.userName}!</h4>
        <p>Access denied</p>
        <hr/>
        <h4>Details</h4>
        <p>You grou: {response.arg.userGroup}</p>
        <p>Access available for groups: {groupList}</p>
        <Link to={homeLink}>Home</Link>
      </div>
    )
  } else if (response.type === 'error') {
    elem = (
      <div>
        <p>The server sent an error: {response.message}</p>
        <Link to={homeLink}>Home</Link>
      </div>
    )
  }

  return elem
}

export default handleError
