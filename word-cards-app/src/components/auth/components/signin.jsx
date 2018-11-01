import React from 'react'
import {Link} from 'react-router-dom'
import elemReqData from '../../../lib/elem_req_data'

class Signin extends React.Component {
  constructor (props) {
    super(props)
    this.match = props.match
    this.state = {
      name: '',
      pwd: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleError (res) {
    if (res.message === 'required field is not filled') {
      this.setState({ error: 'Required field is not filled' })
      return
    }

    this.setState({ error: res })
  }

  handleChange (event) {
    let target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ error: '' })

    if (!this.state.name ||
    !this.state.pwd
    ) {
      this.handleError({message: 'required field is not filled'})
      return
    }

    let reqData = {
      email: this.state.name,
      password: this.state.pwd
    }

    elemReqData(`/word-cards-api/auth/signin`,
      'post',
      JSON.stringify(reqData)
    )
      .then(res => {
        if (res.type === 'ok') this.props.channgeUser(res.arg.username)
        if (res.type === 'error') this.handleError(res.message)
      })
  }

  render () {
    return (
      <div>
        <h2>Singnin form</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
            E-mail:
              <br/><input type="email" value={this.state.name} onChange={this.handleChange} name="name" />
            </label><br/>
            <label>
            Password:
              <br/><input type="password" value={this.state.pwd} onChange={this.handleChange} name="pwd" />
            </label><br/>
            <label>
              <br/><input type="submit"/>
            </label>
          </p>
          {this.state.error
            ? <p className="form-error">{this.state.error}</p>
            : null
          }
        </form>
        <p>New user? <Link to={`${this.match.url}/signup`}>Create an account</Link></p>
        <p>or</p>
        <a href="/word-cards-api/auth/google">Login with Google account</a>
      </div>
    )
  }
}

export default Signin
