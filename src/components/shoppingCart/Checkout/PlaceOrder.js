import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTaxes, placeOrder, setTotalToPay } from '../../../redux/actions/shoppingCartActions';
const cartID = localStorage.turingShoppingCart;
let totalToPay;


class PlaceOrder extends Component {

	componentDidMount = () => {
		this.props.getTaxes();
	};

	placeOrder = () => {
		const data = {
			cart_id: cartID,
			customer_id: this.props.auth.user.customer_id,
			shipping_id: this.props.shipping_id,
			tax_id: 1
		};
    this.props.placeOrder(data);
    this.props.setTotalToPay(totalToPay);
	};

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
    

		return (
			<div className="place-order container">
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
					<Link onClick={this.placeOrder} className="btn" to="/payment">
						Checkout
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	totalAmount: state.shoppingCart.totalAmount,
	shippingOptions: state.shoppingCart.shippingOptions,
	taxes: state.shoppingCart.taxes
});

export default connect(mapStateToProps, { getTaxes, placeOrder, setTotalToPay })(PlaceOrder);