import React, { Component } from 'react';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import { withRouter, Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/authActions';
import { setSearchQuery, getDeparments } from '../../../redux/actions/productsAction';
import { getTotalAmount, getProdInCart } from '../../../redux/actions/shoppingCartActions';
let timer;

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuth: this.props.auth.isAuthenticated,
			isMenuActive: false,
			isSearch: true,
			bagCount: 0,
			total: 0,
			searchText: ''
		};
	}

	// Change state when user is logged in
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.auth) {
			this.setState({
				isAuth: nextProps.auth.isAuthenticated
			});
		}

		if (nextProps.totalAmount !== this.props.totalAmount) {
			this.setState({ total: nextProps.totalAmount });
		}

		if (nextProps.qtyAllProd !== this.props.qtyAllProd) {
			this.setState({ bagCount: nextProps.qtyAllProd });
		}
	};

	componentDidMount() {
		this.props.getTotalAmount();
		this.props.getProdInCart();
		this.props.getDeparments();
	}

	closeMenu = () => this.setState({ isMenuActive: false });

	openMenu = () => this.setState({ isMenuActive: true });

	toggleSearch = () => this.setState({ isSearch: !this.state.isSearch });

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onKeyUp = (e) => {
		let value = e.target.value.trim();
		clearTimeout(timer);
		timer = setTimeout(() => {
			this.onSearch(value);
		}, 500);
	};

	onKeyDown = () => {
		clearTimeout(timer);
	};

	onSearch(search) {
		this.props.setSearchQuery(search, this.props.history);
	}

	render() {
		const { isAuth, isMenuActive, bagCount, isSearch, searchText, total } = this.state;
		const { name } = this.props.auth.user;
		return (
			<header>
				<Link to="/">
					<h4 className="brand2">SHOPMATE</h4>
				</Link>
				<div className={isMenuActive ? 'nav menuActive' : 'nav'}>
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
						onKeyDown={this.onKeyDown}
						onKeyUp={this.onKeyUp}
					/>
				</div>
				<div onClick={this.openMenu} className="open-menu">
					<i className="small material-icons">menu</i>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	totalAmount: state.shoppingCart.totalAmount,
	qtyAllProd: state.shoppingCart.qtyAllProd
});

export default connect(mapStateToProps, { logoutUser, setSearchQuery, getTotalAmount, getProdInCart, getDeparments })(
	withRouter(Navbar)
);
