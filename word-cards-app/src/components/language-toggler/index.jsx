// // @flow

import React from 'react';

export default props => (
  <div>
    <button onClick={() => { props.clickHandler('ru'); }}>RU</button>
    <button onClick={() => { props.clickHandler('en'); }}>EN</button>
  </div>
);
