import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTaxes, setTotalToPay } from '../../../redux/actions/shoppingCartActions';
import { setAuthModal } from '../../../redux/actions/authActions';
import Stripe from './Stripe'
let totalToPay;

class PlaceOrder extends Component {

	state = {
		showCardModal: false
	}

	componentDidMount = () => {
		this.props.getTaxes();
	};

	checkoutBtn = (e) => {
		e.preventDefault();
		this.props.setTotalToPay(Math.round(totalToPay * 100)/100);
		this.toggleCardModal();
	}

	//Toggle Card Modal
	toggleCardModal = () => {
		this.setState({showCardModal: !this.state.showCardModal})
	}

	//Open modal to login
	openModal = (value) => {
		this.props.setAuthModal(value);
	}

	render() {
		const { totalAmount, shippingOptions, shipping_id, taxes } = this.props;

		const tax = taxes.filter((tax) => tax.tax_id === 1)[0];
		const shipCost = shippingOptions.filter((option) => option.shipping_id === parseInt(shipping_id))[0];

		let totalPlustax;
		if (tax !== undefined) {
			totalPlustax = parseFloat(tax.tax_percentage) * parseFloat(totalAmount) / 100;
		}

		if (tax !== undefined && shipCost !== undefined) {
			totalToPay = parseFloat(totalAmount) + totalPlustax + parseFloat(shipCost.shipping_cost);
		}

		let content;
		if (this.props.auth.isAuthenticated) { //Check if the user is logged in 
			content = (
				<Fragment>
					<div className="cont">
						<span>
							<strong>Total:</strong>
						</span>
						<span>${totalAmount}</span>
					</div>

					<div className="cont">
						<span>
							<strong>Shipping Cost:</strong>
						</span>
						<span>{shipCost !== undefined ? shipCost.shipping_type.match(/[^()]/g) : 0}</span>
					</div>

					<div className="cont">
						<span>
							<strong>{tax !== undefined ? tax.tax_type : ''}:</strong>
						</span>
						<span>${Math.round(totalPlustax * 100) / 100}</span>
					</div>
					<hr />
					<div className="cont total-topay">
						<span>
							<strong>Total to Pay:</strong>
						</span>
						<span>${Math.round(totalToPay * 100) / 100}</span>
					</div>
					<div className="btn-cont">
						<a href="/" className="btn" onClick={this.checkoutBtn}>
							Checkout
						</a>
					</div>
					{/* Stripe Component */}
					<Stripe shipId={shipping_id} showModal={this.state.showCardModal}  toggleModal={this.toggleCardModal} />
				</Fragment>
			);
		} else {
			content = (
				<div>
					<h4 className="center-align">Please Login to Proceed</h4>

					<div className="btn-cont" style={{margin: "3rem"}}>
						<button onClick={() => this.openModal("login")}>Login</button>
					</div>
				</div>
			);
		}

		return <div className="place-order container">{content}</div>;
	}
}

PlaceOrder.propTypes = { 
	auth: PropTypes.object.isRequired, 
	totalAmount: PropTypes.string.isRequired, 
	shippingOptions: PropTypes.array.isRequired, 
	taxes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	totalAmount: state.shoppingCart.totalAmount,
	shippingOptions: state.shoppingCart.shippingOptions,
	taxes: state.shoppingCart.taxes
});

export default connect(mapStateToProps, { getTaxes, setTotalToPay, setAuthModal })(PlaceOrder);
