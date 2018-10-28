// @flow

import React from 'react';
import {
  Link, Route, Switch, Redirect,
} from 'react-router-dom';

import HomePage from './pages/home-page';
import AdminPage from './pages/admin-page';
import PublicPage from './pages/public-page';
import Profile from './pages/profile';
import Page404 from './pages/page-404';
import MainMenu from './components/main-menu';
import UserMenu from './components/user-menu';
import Signin from './components/signin';
import Signup from './components/signup';
import elemReqData from '../../lib/elem_req_data';

type Props = {
  match: Object,
};

type State = {
  userName: string,
};
export default class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { userName: '' };
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    elemReqData('/api/auth/check')
      .then((res) => {
        this.changeUser(res.arg.username);
      });
  }

  changeUser = (userName: string) => {
    this.setState({ userName });
  }

  render() {
    const { match } = this.props;
    const { userName } = this.state;

    return (
      <div className="wrapper">
        <div className="main-header">
          <h1>Site name</h1>
        </div>
        <MainMenu match={match} />
        <UserMenu changeUser={this.changeUser} userName={userName} match={match} />
        <div className="main-content">
          <Switch>
            <Route exact path={`${match.path}`} component={HomePage} />
            <Route path={`${match.path}/admin`} render={() => (<AdminPage homeLink={match.path} />)} />
            <Route path={`${match.path}/profile`} render={() => (<Profile homeLink={match.path} />)} />
            <Route path={`${match.path}/public-page`} component={PublicPage} />
            <Route
              path={`${match.path}/signin`}
              render={() => (
                !userName ? (
                  <Signin channgeUser={this.changeUser} match={match} />
                ) : (
                  <Redirect to={`${match.path}`} />
                )
              )}
            />

            <Route
              path={`${match.path}/signup`}
              render={() => (
                !userName ? (
                  <Signup channgeUser={this.changeUser} />
                ) : (
                  <Redirect to={`${match.path}`} />
                )
              )}
            />

            <Route component={Page404} />
          </Switch>
        </div>
        <Link to="/word-cards-app">Go to main app page</Link>
      </div>
    );
  }
}
