import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stripeCharge } from '../../../redux/actions/shoppingCartActions';
import { withRouter } from 'react-router-dom';

class Payment extends Component {
	state = {
		description: ''
	};

	makePayment = () => {
		const data = {
			order_id: this.props.placed_order,
			description: this.state.description,
			amount: this.props.totalToPay * 100
		};

		this.props.stripeCharge(data, this.cb);
	};

	cb() {
		console.log('Payment Successfuly');
	}

	render() {
		let mainBtn;
		if (this.state.description.trim() === '') {
			mainBtn = (
				<button className="disabled" disabled>
					PAY NOW
				</button>
			);
		} else {
			mainBtn = <button onClick={this.makePayment}>PAY NOW</button>;
		}
		return (
			<div className="payment container">
				<h4 className="center-align">Payment</h4>

				<table>
					<tbody>
						<tr>
							<td> Name:</td>
							<td>
								<span>{this.props.userName}</span>
							</td>
						</tr>

						<tr>
							<td> Total to Pay:</td>
							<td>
								<span>${this.props.totalToPay}</span>
							</td>
						</tr>

						<tr>
							<td>Order ID:</td>
							<td>
								<span>{this.props.placed_order}</span>
							</td>
						</tr>
					</tbody>
				</table>

				<div className="text-area-cont">
					<label htmlFor="description">Description (Requiered)</label>
					<textarea
						onChange={(e) => this.setState({ description: e.target.value })}
						name="description"
						value={this.state.description}
						id="description"
					/>
				</div>

				<div className="btn-cont">{mainBtn}</div>
			</div>
		);
	}
}

Payment.propTypes = {
	totalToPay: PropTypes.number.isRequired,
	placed_order: PropTypes.number.isRequired, 
	userName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	totalToPay: state.shoppingCart.totalToPay,
	placed_order: state.shoppingCart.placed_order,
	userName: state.auth.user.name
});

export default connect(mapStateToProps, { stripeCharge })(withRouter(Payment));
