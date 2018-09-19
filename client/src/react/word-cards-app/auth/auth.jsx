import HomePage from './pages/home-page.jsx'
import AdminPage from './pages/admin-page.jsx'
import PublicPage from './pages/public-page.jsx'
import Profile from './pages/profile.jsx'
import Page404 from './pages/page-404.jsx'
import MainMenu from './components/main-menu.jsx'
import UserMenu from './components/user-menu.jsx'
import Signin from './components/signin.jsx'
import Signup from './components/signup.jsx'

export default class Auth extends React.Component { // eslint-disable-line
  constructor (props) {
    super(props)
    this.match = props.match
    this.state = {userName: ''}
    this.changeUser = this.changeUser.bind(this)
  }

  componentDidMount () {
    fetch('/api/auth/check', {
      method: 'get',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (DEV) console.log(res)
        this.changeUser(res.arg.username)
      })
      .catch(err => console.log(err))
  }

  changeUser (userName) {
    this.setState({userName: userName})
  }

  render () {
    let userName = this.state.userName
    return (
      <div className="wrapper">
        <div className="main-header">
          <h1>Site name</h1>
        </div>
        <MainMenu match={this.match} />
        <UserMenu changeUser={this.changeUser} userName={userName} match={this.match} />
        <div className="main-content">
          <Switch>
            <Route exact path={`${this.match.path}`} component={HomePage} />
            <Route path={`${this.match.path}/admin`} render={() => (<AdminPage homeLink={this.match.path} />) } />
            <Route path={`${this.match.path}/profile`} render={() => (<Profile homeLink={this.match.path} />) } />
            <Route path={`${this.match.path}/public-page`} component={PublicPage} />
            <Route path={`${this.match.path}/signin`} render={() => (
              !userName ? (
                <Signin channgeUser={this.changeUser} match={this.match} />
              ) : (
                <Redirect to={`${this.match.path}`}/>
              )
            )} />

            <Route path={`${this.match.path}/signup`} render={() => (
              !userName ? (
                <Signup channgeUser={this.changeUser} />
              ) : (
                <Redirect to={`${this.match.path}`}/>
              )
            )} />

            <Route component={Page404}/>
          </Switch>
        </div>
        <Link to='/word-cards-app'>Go to main app page</Link>
      </div>
    )
  }
}
