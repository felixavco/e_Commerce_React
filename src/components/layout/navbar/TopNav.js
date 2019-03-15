import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownActive: false
    }
  }

  showDropdown = () => {
    this.setState({ isDropdownActive: ! this.state.isDropdownActive })
  }

  render() {
    const { isAuth, name, closeMenu, bagCount, logout } = this.props;
    const { isDropdownActive } = this.state;
    let content;
    let bagItems = "";
    if(isAuth) {
      content = (
        <h6 className="dropdown-cont">
          Hi!&nbsp;
          <span onClick={this.showDropdown} style={{cursor: "pointer"}}>
            {name} <i class="fas fa-caret-down" />
          </span> 
          <ul className={`my-dropdown ${isDropdownActive ? "dropDown-active" : ""}`}>
            <li><Link to="/my-bag">My Bag</Link></li>
            <li><Link onClick={logout} to="/login">Logout</Link></li>
          </ul>
        </h6>
      )
    } else {
      content = (<h6>Hi! <Link to="/login">Sign in</Link> or <Link to="/register">Register</Link></h6>)
    }

    if(bagCount > 0) {
      bagItems = <span className="bag-counter">{bagCount}</span>
    }
    
    return (
      <div className="topNav">
        
          <div>
            <span className="loginRegister">{ content }</span>
            <i onClick={closeMenu} className="small material-icons close-btn">close</i>
          </div>
  
          <div>
            <nav>
                <ul className="secondary-menu">
                    <li><Link to="/daily-deals">Daily Deals</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                    <li><Link to="/help-contact">Help & Contact</Link></li>
                </ul>
            </nav>
          </div>
  
          <div>
            <h6 className="topBag">
              <span className="bag-container">  
                <i className="fas fa-shopping-bag"/>
                {bagItems}
              </span>
              &nbsp;
              Your Bag: <span>$250.00</span>
            </h6>
          </div>
  
      </div>
    )
  }
}

export default TopNav;
