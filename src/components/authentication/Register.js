import React, { Component } from 'react';
import 'materialize-css';
import Spinner from '../commons/Spinner';

//Redux
import { connect } from 'react-redux';
import { authUser, setAuthModal } from '../../redux/actions/authActions';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			name: '',
			email: '',
			password: '',
			password2: '',
			pwdMatch: true,
			errors: {},
			errorField: []
		};
	}

	//Set errors from redux to the component state
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors) {
			this.setState(
				{
					errors: nextProps.errors,
					isLoading: false
				},
				() => this.getErrorMessage()
			);
		}
	};

	// Set state values when user types on inputs
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		this.setState({ isLoading: true });
		if (password !== password2) {
			return this.setState({
				pwdMatch: false,
				isLoading: false
			});
		}
		this.setState({ pwdMatch: true });
		this.props.authUser({ name, email, password }, false, this.props.closeModal);
	};

	getErrorMessage = () => {
		const { errors } = this.state;
		if (this.state.errors.field) {
			this.setState({ errorField: errors.field.split(',') });
		}
	};

	openAuthModal = (e, value) => {
		e.preventDefault();
		this.props.setAuthModal(value);
	};

	render() {
		const { name, email, password, password2, isLoading, errors, errorField, pwdMatch } = this.state;
		let content;

		if (isLoading) {
			content = (
				<div>
					<Spinner size="small" />
				</div>
			);
		} else {
			content = (
				<div className="center-align">
					<button className="btn" type="submit">
						Create account
					</button>
				</div>
			);
		}

		return (
			<div className="modal-cont container" id="register-cont">
				<div className="register">
					<div className="btn-close-cont">
						<i className="modal-cont far fa-times-circle" />
					</div>
					<form
						onSubmit={this.onSubmit}
						className={errorField.length > 1 ? 'onErrorAll row' : 'row'}
						noValidate
					>
						<h3 className="center-align">Register</h3>

						<small className={errorField.length > 1 ? 'onError' : ''}>* All Fields Are Required!</small>
						<div className={`col s12 input-field  ${errors.field === 'name' ? 'onErrorInput' : ''}`}>
							<input onChange={this.onChange} id="name" type="text" name="name" value={name} />
							<label htmlFor="name">{errors.field === 'name' ? 'Name is required!' : 'Name *'}</label>
						</div>

						<div className={`col s12 input-field  ${errors.field === 'email' ? 'onErrorInput' : ''}`}>
							<input onChange={this.onChange} id="email" type="email" name="email" value={email} />
							<label htmlFor="email">{errors.field === 'email' ? errors.message : 'Email *'}</label>
						</div>

						<div className="row">
							<div
								className={`col s12 l6 input-field  ${errors.field === 'password'
									? 'onErrorInput'
									: ''}`}
							>
								<input
									onChange={this.onChange}
									id="password"
									type="password"
									name="password"
									value={password}
								/>
								<label htmlFor="password">
									{errors.field === 'password' ? 'Password is required!' : 'Password *'}
								</label>
							</div>

							<div className={`col s12 l6 input-field  ${!pwdMatch ? 'onErrorInput' : ''}`}>
								<input
									onChange={this.onChange}
									id="password2"
									type="password"
									name="password2"
									value={password2}
								/>
								<label htmlFor="password2">
									{!pwdMatch ? "Passwords don't match" : 'Confirm your Password *'}
								</label>
							</div>
						</div>
						{content}
					</form>
					<h6>
						Already have an account?{' '}
						<a onClick={(event) => this.openAuthModal(event, 'login')} href="#!">
							Login
						</a>
					</h6>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { authUser, setAuthModal })(Register);
