import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { getTaxes, stripeCharge, placeOrder } from '../../../redux/actions/shoppingCartActions';
import 'materialize-css';

class StripeForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: '',
			cardHolder: '',
			cartID: localStorage.turingShoppingCart,
			orderId: '', 
			cardCompleted: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.placed_order !== this.props.placed_order) {
			this.setState({ orderId: nextProps.placed_order }, () => {
				//Once the order ID is received then proceed to submit the payment with stripe
				this.makePayment();
			});
		}
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await this.props.stripe.createToken({ name: this.state.cardHolder });

			this.setState({ token: res.token.id });

			if (this.state.token !== '') {
				//Creates the order ID
				this.processOrder();
			}
		} catch (error) {
			throw error;
		}
	};

	processOrder = () => {
		const data = {
			cart_id: this.state.cartID,
			customer_id: this.props.customer_id,
			shipping_id: this.props.shipping_id,
			tax_id: 1
		};

		this.props.placeOrder(data);
	};

	makePayment = () => {
		const data = {
			order_id: this.state.orderId,
			description: 'Purchase!',
			amount: this.props.totalToPay * 100,
			stripeToken: this.state.token
		};

		this.props.stripeCharge(data);
	};

	render() {
		const { showModal, toggleModal } = this.props;
		const { cardHolder, cardCompleted } = this.state;
		return (
			<div className={`stripeForm ${showModal ? 'card-form-active' : ''}`}>
				<div className="row test">
					<div className="form_cont col s12 m7 l5">
						<form onSubmit={this.onFormSubmit}>
							<h5 className="align-center">Payment Details</h5>
							<label htmlFor="cardHolder">Card Holder</label>
							<input
								type="text"
								name="cardHolder"
								value={this.state.cardHolder}
								onChange={this.onChange}
								placeholder="Card Holder Name"
							/>

							<label>CC Number -- Expiration Date -- CVC -- ZIP Code</label>
							<br />
							<div className="creditCard_cont">
								<CardElement onChange={(e) => this.setState({ cardCompleted: e.complete })} />
							</div>
							<div className="form_btn-cont">
								<button onClick={toggleModal} className="btn" type="reset">
									Cancel
								</button>
								<button className={`btn ${cardHolder.length > 4 && cardCompleted ? "" : "disabled"}`} type="submit">
									Pay Now!
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	totalToPay: state.shoppingCart.totalToPay,
	placed_order: state.shoppingCart.placed_order,
	customer_id: state.auth.user.customer_id
});

export default connect(mapStateToProps, { getTaxes, placeOrder, stripeCharge })(injectStripe(StripeForm));
