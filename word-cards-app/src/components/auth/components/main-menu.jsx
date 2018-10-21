import React from 'react'
import {Link} from 'react-router-dom'

const MainMenu = ({ match }) => (
  <nav className="main-menu">
    <h3 className="main-menu_header">Main menu</h3>
    <ul className="main-menu__list">
      <li className="main-menu__item">
        <Link to={`${match.url}`}>Home</Link>
      </li>
      <li className="main-menu__item">
        <Link to={`${match.url}/admin`}>Admin page</Link>
      </li>
      <li className="main-menu__item">
        <Link to={`${match.url}/public-page`}>Public</Link>
      </li>
      <li className="main-menu__item">
        <Link to={`${match.url}/profile`}>Profile</Link>
      </li>
    </ul>
  </nav>
)

export default MainMenu
