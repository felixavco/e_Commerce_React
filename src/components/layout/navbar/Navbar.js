import React, { Component } from 'react';

import TopNav from './TopNav';
import BottomNav from './BottomNav';

//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/authActions';
import { searchingProduct, getDeparments } from '../../../redux/actions/productsAction';
import { getTotalAmount, getProdInCart } from '../../../redux/actions/shoppingCartActions';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: this.props.auth.isAuthenticated,
      isMenuActive: false,
      isSearch: true,
      bagCount: 0,
      total: 0,
      searchText: "",
    }
  }

  // Change state when user is logged in 
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth) {
      this.setState({ 
        isAuth: nextProps.auth.isAuthenticated,
      });
    }

    if (nextProps.totalAmount) {
      this.setState({total: nextProps.totalAmount});
    }

    if(nextProps.qtyAllProd) {
      this.setState({bagCount: nextProps.qtyAllProd})
    }

  };

  componentDidMount() {
    this.props.getTotalAmount();
    this.props.getProdInCart();
    this.props.getDeparments();
  }

  closeMenu = () => this.setState({isMenuActive: false});

  openMenu = () => this.setState({isMenuActive: true});

  toggleSearch = () => this.setState({isSearch: !this.state.isSearch});

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.onSearch(this.state.searchText);
    });
  }

  onSearch = (search) => {
      this.props.searchingProduct(search);
  }

  render() {
    const { isAuth, isMenuActive, bagCount, isSearch, searchText, total } = this.state;
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
            totalAmount={total}
          />

          <BottomNav 
            closeMenu={this.closeMenu}
            isSearch={isSearch}
            toggleSearch={this.toggleSearch}
            searchText={searchText}
            onChange={this.onChange}
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
  auth: state.auth,
  totalAmount: state.shoppingCart.totalAmount,
  qtyAllProd: state.shoppingCart.qtyAllProd
})

export default connect(mapStateToProps, { logoutUser, searchingProduct, getTotalAmount, getProdInCart, getDeparments })(Navbar);
