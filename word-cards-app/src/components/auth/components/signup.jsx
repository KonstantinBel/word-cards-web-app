import React from 'react'
import elemReqData from '../../../lib/elem_req_data'

class Signup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      pwd: '',
      pwdConf: '',
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

    if (res.message === 'passwords do not match') {
      this.setState({ error: 'Passwords do not match' })
      return
    }

    if (res.message === 'duplicate email') {
      this.setState({ error: `Email: ${res.arg} alrady exist` })
      return
    }

    if (res.message === 'duplicate username') {
      this.setState({ error: `User: ${res.arg} alrady exist` })
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
    !this.state.email ||
    !this.state.pwd ||
    !this.state.pwdConf
    ) {
      this.handleError({message: 'required field is not filled'})
      return
    }

    if (this.state.pwd !== this.state.pwdConf) {
      this.handleError({message: 'passwords do not match'})
      return
    }

    let reqData = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.pwd,
      passwordConf: this.state.pwdConf
    }

    elemReqData(
      `/word-cards-api/auth/signup`,
      'post',
      JSON.stringify(reqData)
    )
      .then(res => {
        if (res.type === 'ok') {
          elemReqData(
            `/word-cards-api/auth/signin`,
            'post',
            JSON.stringify(reqData)
          )
            .then(res => {
              if (res.type === 'ok') this.props.channgeUser(res.arg.username)
              if (res.type === 'error') this.handleError(res.message)
            })
        }
        if (res.type === 'error') this.handleError(res)
      })
  }

  render () {
    return (
      <div>
        <h2>Singnup form</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
            Name:
              <br/><input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
            </label><br/>
            <label>
            E-mail:
              <br/><input type="email" value={this.state.email} onChange={this.handleChange} name="email" id=""/>
            </label><br/>
            <label>
            Password:
              <br/><input type="password" value={this.state.pwd} onChange={this.handleChange} name="pwd" />
            </label><br/>
            <label>
            Confirm password:
              <br/><input type="password" value={this.state.pwdConf} onChange={this.handleChange} name="pwdConf" />
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
      </div>
    )
  }
}

export default Signup
