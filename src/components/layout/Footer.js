import React, { Fragment } from 'react';
import PropTypes from 'prop-types'; 
import MainNav from './navbar/MainNav';
import AuthModal from '../authentication/AuthModal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = ({isAuthenticated}) => {
	let content;
	
	if(!isAuthenticated) {
		content = <AuthModal />
	}

	return (
		<Fragment>
			{ content }
			<footer>
				<div className="container">
					<MainNav />

					<div className="social-media">
						<ul>
							<li>
								<a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank">
									<i className="fab fa-instagram" />
								</a>
							</li>
							<li>
								<a href="https://www.pinterest.com/" rel="noopener noreferrer" target="_blank">
									<i className="fab fa-pinterest" />
								</a>
							</li>
							<li>
								<a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">
									<i className="fab fa-twitter" />
								</a>
							</li>
							<li>
								<a href="https://www.facebook.com/me" rel="noopener noreferrer" target="_blank">
									<i className="fab fa-facebook-f" />
								</a>
							</li>
						</ul>
					</div>

					<div className="copy-rights">
						<ul>
							<li>
								<Link to="/">&copy;{new Date().getFullYear()} Shopmate Ltd</Link>
							</li>
							&nbsp;
							<li>
								<Link to="/">Contact</Link>
							</li>
							&nbsp;
							<li>
								<Link to="/">Privacy policy</Link>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</Fragment>
	);
};

Footer.propTypes = { 
	isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Footer);
