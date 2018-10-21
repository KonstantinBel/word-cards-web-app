import React from 'react'
import elemReqData from '../../../lib/elem_req_data.jsx'
import elemHandleError from '../../../lib/elem_handle_error.jsx'

class AdminPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: '',
      response: ''
    }
  }

  componentDidMount () {
    elemReqData(`/api/site/admin-page`)
      .then(res => this.setState({response: res}))
      .catch(err => this.setState({error: err}))
  }

  render () {
    let response = this.state.response
    let error = this.state.error

    let elem = !response && !error ? null
      : elemHandleError(response, error, this.props.homeLink) || (
        <div>
          <h2>Admin page</h2>
          <p>Welcome!</p>
          <p>Dynamic data: {response.arg.text}</p>
        </div>
      )

    return elem
  }
}

export default AdminPage
