// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export default ({ match }: { match: Object }) => (
  <div>
    <h2>Main app page</h2>
    <ul>
      <li><Link to={`${match.url}/auth`}>Auth page</Link></li>
      <li><Link to={`${match.url}/page`}>Another page</Link></li>
      <li><Link to={`${match.url}/route-example`}>Route example page</Link></li>
    </ul>
  </div>
);
