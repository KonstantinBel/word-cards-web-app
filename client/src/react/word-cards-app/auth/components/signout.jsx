class Signout extends React.Component {
  constructor (props) {
    super(props)
    this.match = props.match
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    fetch('/api/auth/signout', {
      method: 'post',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (DEV) console.log(res)
        this.props.changeUser(false)
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <Link to={this.match.url} onClick={this.handleClick}>Signout</Link>
    )
  }
}

export default Signout
