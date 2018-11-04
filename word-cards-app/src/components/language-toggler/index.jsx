// @flow

import React from 'react';

export default (props: { clickHandler: Function }) => (
  <div>
    <button type="button" onClick={() => { props.clickHandler('ru'); }}>RU</button>
    <button type="button" onClick={() => { props.clickHandler('en'); }}>EN</button>
  </div>
);
