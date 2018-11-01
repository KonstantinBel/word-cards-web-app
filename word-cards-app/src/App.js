// @flow

import './App.scss';
import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import cookie from 'js-cookie';
import AnotherPage from './components/example-app-page/example-app-page';
import RouteExample from './components/route-example/route-example';
import Menu from './components/menu';
import LanguageToggler from './components/language-toggler';
import getLocale from './locale';
import AppContext from './app-context';

const Auth = React.lazy(() => import('./components/auth/auth'));

class App extends Component {
  state = { locale: getLocale(cookie.get('userlang') || navigator.language || navigator.userLanguage) };

  setLocale = (localeName) => {
    cookie.set('userlang', localeName);
    this.setState({ locale: getLocale(localeName) });
  }

  render() {
    const { match } = this.props;
    const { locale } = this.state;

    return (
      <AppContext.Provider value={{ locale }}>
        <div>
          {process.env.REACT_APP_DEV && <span style={{ color: 'red' }}>starting in dev mode</span>}
          <h1>{locale.mainPage.header}</h1>
          <p>{locale.mainPage.mainContent}</p>
          <LanguageToggler clickHandler={this.setLocale} />
          <Route exact path={match.path} component={Menu} />
          {/* lazyload page example */}
          <Route
            path={`${match.path}/auth`}
            render={props => (
              <Suspense fallback={<div>Loading...</div>}>
                <Auth {...props} />
              </Suspense>
            )}
          />
          <Route path={`${match.path}/page`} component={AnotherPage} />
          <Route path={`${match.path}/route-example`} component={RouteExample} />
          <a href="/">Go to base page</a>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
