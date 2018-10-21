import React from 'react'
import {Link} from 'react-router-dom'
import elemReqData from '../../../lib/elem_req_data'

class Signout extends React.Component {
  constructor (props) {
    super(props)
    this.match = props.match
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    elemReqData(`/api/auth/signout`, 'post')
      .then(res => {
        if (res.type === 'ok') this.props.changeUser(false)
      })
  }

  render () {
    return (
      <Link to={this.match.url} onClick={this.handleClick}>Signout</Link>
    )
  }
}

export default Signout
