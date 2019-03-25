import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateItemInCart, getProdInCart, removeItemInCart } from '../../redux/actions/shoppingCartActions';
import { connect } from 'react-redux';

class CartItem extends Component {
	updateOne = (id, qty) => {
		this.props.updateItemInCart(id, qty, this.props.getProdInCart);
	};

	removeItem = (id) => {
		this.props.removeItemInCart(id, this.props.getProdInCart);
	};

	render() {
		const { product } = this.props;
		return (
			<tr>
				<td onClick={() => this.removeItem(product.item_id)} style={{ cursor: 'pointer' }}>
					<i className="fas fa-times" style={{ color: 'red' }} />
					&nbsp;
					<small>Remove</small>
				</td>
				<td>{product.name}</td>
				<td>{product.attributes}</td>
				<td>${product.price}</td>
				<td>
					<span className="update-btn" onClick={() => this.updateOne(product.item_id, product.quantity - 1)}>
						<i className="fas fa-minus" />
					</span>
					{product.quantity}
					<span className="update-btn" onClick={() => this.updateOne(product.item_id, product.quantity + 1)}>
						<i className="fas fa-plus" />
					</span>
				</td>
				<td>${product.subtotal}</td>
			</tr>
		);
	}
}

CartItem.propTypes = { 
	updateItemInCart: PropTypes.func.isRequired,
	getProdInCart: PropTypes.func.isRequired,
	removeItemInCart: PropTypes.func.isRequired,
}

export default connect(null, { updateItemInCart, getProdInCart, removeItemInCart })(CartItem);
