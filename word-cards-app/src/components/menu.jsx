// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../app-context';

class Menu extends Component {
  static contextType = AppContext;

  render() {
    const { match } = this.props;
    const { locale } = this.context;

    return (
      <div>
        <h2>{locale.menu.header}</h2>
        <ul>
          <li><Link to={`${match.url}/auth`}>Auth page</Link></li>
          <li><Link to={`${match.url}/page`}>Another page</Link></li>
          <li><Link to={`${match.url}/route-example`}>Route example page</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
