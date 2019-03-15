import React, { Component } from 'react';
import 'materialize-css';
import Spinner from '../commons/Spinner';

//Redux
import { connect } from 'react-redux';
import { authUser } from '../../redux/actions/authActions';
//Router
import { withRouter } from 'react-router-dom';

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
		const { email, password } = this.state;
		this.setState({isLoading: true});
		this.props.authUser({email, password }, this.props.history, true);
	};

	render() {
		const { email, password, isLoading } = this.state;
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
						Sign in
					</button>
				</div>
			);
		}

		return (
			<div className="container">
				<h3 className="center-align">Sign in</h3>
				<div className="container" >
					<form onSubmit={this.onSubmit} className="row" noValidate>

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

            <div className="col s12 input-field">
              <input
                onChange={this.onChange}
                id="password"
                type="password"
                name="password"
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
						{ content }
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { authUser })(withRouter(Login));

