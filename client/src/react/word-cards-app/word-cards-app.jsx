import './word-cards-app.scss'
import Auth from './auth/auth.jsx'
import AnotherPage from './example-app-page/example-app-page.jsx'
import RouteExample from './route-example/route-example.jsx'

if (DEV) {
  console.log('word-cards-app is running in mode')
  console.log('---------------------------------')
}

window.Link = ReactRouterDOM.Link
window.Route = ReactRouterDOM.Route
window.Switch = ReactRouterDOM.Switch
window.Redirect = ReactRouterDOM.Redirect
window.BrowserRouter = ReactRouterDOM.BrowserRouter

const WordCardsApp = ({ match }) => {
  return (
    <div>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/auth`} component={Auth} />
      <Route path={`${match.path}/page`} component={AnotherPage} />
      <Route path={`${match.path}/route-example`} component={RouteExample} />
      <a href="/">Go to base page</a>
    </div>
  )
}

const Menu = ({ match }) => (
  <div>
    <h1>Main app page</h1>
    <ul>
      <li><Link to={`${match.url}/auth`}>Auth page</Link></li>
      <li><Link to={`${match.url}/page`}>Another page</Link></li>
      <li><Link to={`${match.url}/route-example`}>Route example page</Link></li>
    </ul>
  </div>
)

ReactDOM.render(
  <BrowserRouter>
    <Route path='/word-cards-app' component={WordCardsApp}/>
  </BrowserRouter>,
  document.getElementById('root'))
