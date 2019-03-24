import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthModal } from '../../../redux/actions/authActions';

class TopNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownActive: false
		};
	}

	showDropdown = () => this.setState({ isDropdownActive: !this.state.isDropdownActive });
	closeDropdown = () => this.setState({ isDropdownActive: false });

	openAuthModal = (e, value) => {
		e.preventDefault();
		this.props.setAuthModal(value);
	};

	render() {
		const { isAuth, name, closeMenu, bagCount, logout, totalAmount } = this.props;
		const { isDropdownActive } = this.state;
		let content;
		let bagItems = '';
		if (isAuth) {
			content = (
				<h6 className="dropdown-cont">
					Hi!&nbsp;
					<span onClick={this.showDropdown} style={{ cursor: 'pointer' }}>
						{name} <i className="fas fa-caret-down" />
					</span>
					<ul
						onMouseLeave={this.closeDropdown}
						className={`my-dropdown ${isDropdownActive ? 'dropDown-active' : ''}`}
					>
						<li onClick={this.showDropdown}>
							<Link to="/my-bag">
								<i className="fas fa-shopping-bag" />&nbsp;&nbsp;My Bag
							</Link>
						</li>
						<li onClick={this.showDropdown}>
							<Link to="/profile">
								<i className="far fa-user-circle" />&nbsp;&nbsp;My Profile
							</Link>
						</li>
						<li onClick={this.showDropdown}>
							<Link onClick={logout} to="/">
								<i className="fas fa-sign-out-alt" />&nbsp;&nbsp;Logout
							</Link>
						</li>
					</ul>
				</h6>
			);
		} else {
			content = (
				<h6>
					Hi!{' '}
					<a
						onClick={(event) => {
							this.openAuthModal(event, 'login');
							this.props.closeMenu();
						}}
						href="#!"
					>
						Sign in
					</a>
					&nbsp;or&nbsp;
					<a
						onClick={(event) => {
							this.openAuthModal(event, 'register');
							this.props.closeMenu();
						}}
						href="#!"
					>
						Register
					</a>
				</h6>
			);
		}

		if (bagCount > 0) {
			bagItems = <span className="bag-counter">{bagCount}</span>;
		}

		return (
			<div className="topNav">
				<div>
					<span className="loginRegister">{content}</span>
					<i onClick={closeMenu} className="small material-icons close-btn">
						close
					</i>
				</div>

				<div>
					<nav>
						<ul className="secondary-menu">
							<li>
								<Link to="/daily-deals">Daily Deals</Link>
							</li>
							<li>
								<Link to="/sell">Sell</Link>
							</li>
							<li>
								<Link to="/help-contact">Help & Contact</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div>
					<Link onClick={closeMenu} to="/my-bag">
						<h6 className="topBag">
							<span className="bag-container">
								<i className="fas fa-shopping-bag" />
								{bagItems}
							</span>
							&nbsp; Your Bag: <span>${totalAmount === null ? '0.00' : totalAmount}</span>
						</h6>
					</Link>
				</div>
			</div>
		);
	}
}

export default connect(null, { setAuthModal })(TopNav);
