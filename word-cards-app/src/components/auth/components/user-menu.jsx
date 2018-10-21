import React from 'react'
import {Link} from 'react-router-dom'
import Signout from './signout.jsx'

class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.match = props.match
  }
  render () {
    let elem = null
    if (this.props.userName) {
      elem = (
        <div className="user-menu">
          <h4>User menu</h4>
          <p>User: {this.props.userName}</p>
          <Signout changeUser={this.props.changeUser} match={this.match} />
        </div>
      )
    } else {
      elem = (
        <div className="user-menu">
          <h4>User menu</h4>
          <Link to={`${this.match.url}/signin`}>Signin</Link>
          <p>or</p>
          <Link to={`${this.match.url}/signup`}>Signup</Link>
        </div>
      )
    }

    return elem
  }
}

export default UserMenu
