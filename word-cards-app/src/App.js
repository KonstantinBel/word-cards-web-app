import './App.scss'
import React from 'react';
import {Route} from 'react-router-dom'
import Auth from './components/auth/auth.jsx'
import AnotherPage from './components/example-app-page/example-app-page.jsx'
import RouteExample from './components/route-example/route-example.jsx'
import Menu from './components/menu.jsx'

export default ({ match }) => {
  return (
    <div>
      {process.env.REACT_APP_DEV && <span style={{color: 'red'}}>starting in dev mode</span>}
      <h1>word cards app</h1>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/auth`} component={Auth} />
      <Route path={`${match.path}/page`} component={AnotherPage} />
      <Route path={`${match.path}/route-example`} component={RouteExample} />
      <a href="/">Go to base page</a>
    </div>
  )
}
