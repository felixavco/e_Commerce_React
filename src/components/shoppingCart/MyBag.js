import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCartId, clearCart, getTotalAmount } from '../../redux/actions/shoppingCartActions';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CategoryNav from '../products/CategoryNav';

class MyBag extends Component {
	state = {
		cartId: localStorage.turingShoppingCart
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.productsInCart !== this.props.productsInCart) {
			this.props.getTotalAmount();
		}

		if (nextProps.totalAmount === 0) {
			this.props.getTotalAmount();
		}
	};

	componentDidMount() {
		if (!this.state.cartId) {
			this.props.getCartId();
		}
	}

	deleteCartItems = () => {
		this.props.clearCart();
	};

	render() {
		const { productsInCart, totalAmount } = this.props;

		let content;

		const cart_items = productsInCart.map((product) => <CartItem key={product.item_id} product={product} />);

		if (productsInCart.length !== 0) {
			content = (
				<Fragment>
					<div className="header">
						<span className="clear-cart btn" onClick={this.deleteCartItems}>
							Empty Cart
						</span>
						<h5>Total: ${totalAmount}</h5>
						<Link className="btn" to="/checkout">
							Place Order
						</Link>
					</div>

					<table className="striped">
						<thead>
							<tr>
								<th>&nbsp;</th>
								<th>Name</th>
								<th>Attributes</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>{cart_items}</tbody>
					</table>
				</Fragment>
			);
		} else {
			content = (
				<div className="cart-emtpy">
					<h2>Your Bag is Empty</h2>
					<h4>Find by category</h4>
					<CategoryNav />
				</div>
			);
		}
		return <div className="container my-bag">{content}</div>;
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	productsInCart: state.shoppingCart.productsInCart,
	totalAmount: state.shoppingCart.totalAmount
});

export default connect(mapStateToProps, { getCartId, clearCart, getTotalAmount })(MyBag);
