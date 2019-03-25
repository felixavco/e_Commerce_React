import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../commons/Spinner';

//Redux
import { connect } from 'react-redux';
import { authUser, setAuthModal } from '../../redux/actions/authActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			email: '',
			password: '',
			errors: {}
		};
	}

	//Set errors from redux to the component state
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors !== this.props.errors) {
			this.setState({
				errors: nextProps.errors,
				isLoading: false
			});
		}
	};

	// Set state values when user types on inputs
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.setState({ isLoading: true });
		this.props.authUser({ email, password }, true, this.props.closeModal);
	};

	openAuthModal = (e, value) => {
		e.preventDefault();
		this.props.setAuthModal(value);
	};

	render() {
		const { email, password, isLoading, errors } = this.state;
		let content;
		if (isLoading) {
			content = (
				<div className="col s12">
					<Spinner size="small" />
				</div>
			);
		} else {
			content = (
				<div className="center-align">
					<button className="btn" type="submit">
						Sign in
					</button>
				</div>
			);
		}

		return (
			<div className="modal-cont container" id="login-cont">
				<div className="login">
					<div className="btn-close-cont">
						<i className="modal-cont far fa-times-circle" />
					</div>
					<form className="row" onSubmit={this.onSubmit} noValidate>
						<h3 className="center-align">Sign in</h3>
						<small>* All Fields Are Required!</small>

						<div className={`col s12 input-field  ${errors.field === 'email' ? 'onErrorInput' : ''}`}>
							<input onChange={this.onChange} id="email" type="email" name="email" value={email} />
							<label htmlFor="email">{errors.field === 'email' ? errors.message : 'Email *'}</label>
						</div>

						<div className={`col s12 input-field  ${errors.field === 'password' ? 'onErrorInput' : ''}`}>
							<input
								onChange={this.onChange}
								id="password"
								type="password"
								name="password"
								value={password}
								autoComplete="true"
							/>
							<label htmlFor="password">
								{errors.field === 'password' ? errors.message : 'Password *'}
							</label>
						</div>
						{content}
					</form>
					<h6>
						Don't have an account?
						<a onClick={(event) => this.openAuthModal(event, 'register')} href="#!">
							Register
						</a>
					</h6>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	setAuthModal: PropTypes.func.isRequired,
	authUser: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { authUser, setAuthModal })(Login);
