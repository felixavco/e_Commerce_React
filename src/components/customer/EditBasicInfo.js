import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, getProfile, updateCreditCard } from '../../redux/actions/customerActions';

class EditBasicInfo extends Component {
	state = {
		name: '',
		email: '',
		credit_card: '',
		day_phone: '',
		eve_phone: '',
		mob_phone: ''
	};

	componentWillMount() {
		const { name, email, credit_card, day_phone, eve_phone, mob_phone } = this.props.profile;
		this.setState({ name, email, credit_card, day_phone, eve_phone, mob_phone });
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const { name, email, day_phone, eve_phone, mob_phone, credit_card } = this.state;
		this.props.updateProfile({name, email, day_phone, eve_phone, mob_phone});
		if(credit_card !== '') {
			this.props.updateCreditCard({credit_card});
		}
		this.props.getProfile();
		this.props.closeEditMode();
	}

	render() {
		const { name, email, credit_card, day_phone, eve_phone, mob_phone } = this.state;
		const { closeEditMode } = this.props
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<ul>
						<li>
							<span>
								<i className="fas fa-user" />&nbsp;Name:
							</span>
							<input
								placeholder="Name is required"
								onChange={this.onChange}
								name="name"
								value={name}
								type="text"
							/>
						</li>
						<li>
							<span>
								<i className="fas fa-at" />&nbsp;Email:
							</span>
							<input
								placeholder="Email is required"
								onChange={this.onChange}
								name="email"
								value={email}
								type="email"
							/>
						</li>
						<li>
							<span>
								<i className="far fa-credit-card" />&nbsp;Card:
							</span>
							<input
								placeholder="Credit Card"
								onChange={this.onChange}
								name="credit_card"
								value={credit_card}
								type="text"
							/>
						</li>
						<li>
							<span>
								<i className="fas fa-phone-square" />&nbsp;Phone:
							</span>
							<input
								placeholder="Enter your primary phone number"
								onChange={this.onChange}
								name="day_phone"
								value={day_phone}
								type="text"
							/>
						</li>
						<li>
							<span>
								<i className="fas fa-phone-square" />&nbsp;Phone 2:
							</span>
							<input
								placeholder="Enter your secondary phone number"
								onChange={this.onChange}
								name="eve_phone"
								value={eve_phone}
								type="text"
							/>
						</li>
						<li>
							<span>
								<i className="fas fa-mobile-alt" />&nbsp;Mobile:
							</span>
							<input
								placeholder="Enter your mobile number"
								onChange={this.onChange}
								name="mob_phone"
								value={mob_phone}
								type="text"
							/>
						</li>
					</ul>
					<div className="save-btn-cont">
						<button onClick={closeEditMode} className="btn">
							Cancel&nbsp;
							<i class="fas fa-times" />
						</button>

						<button className="btn save-btn">
							Save&nbsp;
							<i class="far fa-save" />
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.customer.profile
});

export default connect(mapStateToProps, {updateProfile, getProfile, updateCreditCard})(EditBasicInfo);
