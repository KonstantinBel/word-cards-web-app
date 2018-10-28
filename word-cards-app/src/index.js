// @flow

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Link, Switch,
} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_DEV) {
  console.log('word-cards-app is running in mode');
  console.log('---------------------------------');
}

const container: ?HTMLElement = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/word-cards-app" component={App} />
        <Route exac path="/" component={() => (<Link to="/word-cards-app">App page</Link>)} />
      </Switch>
    </BrowserRouter>,
    container,
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
