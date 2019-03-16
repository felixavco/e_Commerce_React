import React, { Component } from 'react'
import MainNav from './navbar/MainNav';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="top-footer">
          <h5>subscribe</h5> 
        </div>
        <div className="bottom-footer container">
          <MainNav />
          <div className="social-media">
            <ul>
              <li><a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram"/></a></li>
              <li><a href="https://www.pinterest.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-pinterest"/></a></li>
              <li><a href="https://twitter.com/" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter"/></a></li>
              <li><a href="https://www.facebook.com/me" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f"/></a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li><a href="/">&copy;{new Date().getFullYear()} shopmate Ltd &diams;</a></li>
              <li><a href="/">Contact &diams;</a></li>
              <li><a href="/">Privacy policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;