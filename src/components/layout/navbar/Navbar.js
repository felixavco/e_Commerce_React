import React, { Component } from 'react';

import TopNav from './TopNav';
import BottomNav from './BottomNav';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: this.props.auth.isAuthenticated,
      isMenuActive: false,
      isSearch: false,
      bagCount: 0,
    }
  }

  // Change state when user is logged in 
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth) {
      this.setState({ 
        isAuth: nextProps.auth.isAuthenticated,
      });
    }
  };

  closeMenu = () => this.setState({isMenuActive: false});
  openMenu = () => this.setState({isMenuActive: true});
  toggleSearch = () => this.setState({isSearch: !this.state.isSearch})

  render() {
    const { isAuth, isMenuActive, bagCount, isSearch } = this.state;
    const { name } = this.props.auth.user;
    return (
      <header>
        <h4 className="brand2">SHOPMATE</h4>
        <div className={isMenuActive ? "nav menuActive" : "nav"}>
          <TopNav 
            isAuth={isAuth} 
            name={name}
            closeMenu={this.closeMenu}
            bagCount={bagCount}
            logout={this.props.logoutUser}
          />

          <BottomNav 
            closeMenu={this.closeMenu}
            isSearch={isSearch}
            toggleSearch={this.toggleSearch}
          />
        </div>
        <div onClick={this.openMenu} className="open-menu">
          <i className="small material-icons">menu</i>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);
