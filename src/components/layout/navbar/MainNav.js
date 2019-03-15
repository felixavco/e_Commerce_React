import React from 'react'

//Router
import { NavLink } from 'react-router-dom';

const MainNav = ({closeMenu}) => {
  return (
    <nav className="mainNav">
      <ul>
        <li onClick={closeMenu}><NavLink to="/woman">Woman</NavLink></li>
        <li onClick={closeMenu}><NavLink to="/men">Men</NavLink></li>
        <li onClick={closeMenu}><NavLink to="/kids">Kids</NavLink></li>
        <li onClick={closeMenu}><NavLink to="/shoes">Shoes</NavLink></li>
        <li onClick={closeMenu}><NavLink to="/brands">Brands</NavLink></li>
      </ul>
    </nav>
  )
}

export default MainNav;
