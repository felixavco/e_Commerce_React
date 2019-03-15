import React, { Component } from 'react';
import 'materialize-css';
import Spinner from '../commons/Spinner';

//Redux
import { connect } from 'react-redux';
import { authUser } from '../../redux/actions/authActions';
//Router
import { withRouter } from 'react-router-dom';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	//Set errors from redux to the component state
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors) {
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
		const { name, email, password, password2 } = this.state;
		this.setState({isLoading: true});
		if (password !== password2) {
			return alert("Password don't match");
		}
		this.props.authUser({ name, email, password }, this.props.history);
	};

	render() {
		const { name, email, password, password2, isLoading } = this.state;
		let content;
		if (isLoading) {
			content = (
				<div>
					<Spinner size="small" />
				</div>
			)
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
			<div className="container">
				<h3 className="center-align">Register</h3>
				<div className="container" >
					<form onSubmit={this.onSubmit} className="row" noValidate>
						<div className="col s12 input-field">
							<input 
								onChange={this.onChange} 
								id="name" 
								type="text" 
								name="name" 
								value={name} 
							/>
							<label htmlFor="name">Name</label>
						</div>

						<div className="col s12 input-field">
							<input 
								onChange={this.onChange} 
								id="email" 
								type="email" 
								name="email" 
								value={email} 
							/>
							<label htmlFor="email">Email</label>
						</div>

						<div className="row">
							<div className="col s12 l6 input-field">
								<input
									onChange={this.onChange}
									id="password"
									type="password"
									name="password"
									value={password}
								/>
								<label htmlFor="password">Password</label>
							</div>

							<div className="col s12 l6 input-field">
								<input
									onChange={this.onChange}
									id="password2"
									type="password"
									name="password2"
									value={password2}
								/>
								<label htmlFor="password2">Confirm your Password</label>
							</div>
						</div>
						{ content }
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { authUser })(withRouter(Register));
