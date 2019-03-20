import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCartId, clearCart, getTotalAmount } from '../../redux/actions/shoppingCartActions';
import CartItem from './CartItem';

class MyBag extends Component {
	state = {
		cartId: localStorage.turingShoppingCart
	};

	componentDidMount() {
		if (!this.state.cartId) {
			this.props.getCartId();
		}
  }
  
  deleteCartItems = () => {
    this.props.clearCart();
    this.props.getTotalAmount();
  }



	render() {
		const { productsInCart } = this.props;

		let content;

		const cart_items = productsInCart.map((product) => (
      <CartItem key={product.item_id} product={product}/>
		));

		if (productsInCart.length !== 0) {
			content = (
				<Fragment>
					<button onClick={this.deleteCartItems}>Clear Cart</button>
					<table className="striped">
						<thead>
							<tr>
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
				<div>
					<h3 className="center-align">Your Bag is Empty</h3>
				</div>
			);
		}
		return <div className="container">{content}</div>;
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	productsInCart: state.shoppingCart.productsInCart
});

export default connect(mapStateToProps, { getCartId, clearCart, getTotalAmount })(MyBag);
