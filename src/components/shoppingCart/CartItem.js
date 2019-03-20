import React, { Component } from 'react';
import { updateItemInCart } from '../../redux/actions/shoppingCartActions';
import { connect } from 'react-redux';


class CartItem extends Component {

	updateOne = (id, qty) => {
		this.props.updateItemInCart(id, qty);
  };
  
	render() {
    const { product } = this.props;
		return (
			<tr>
				<td>{product.name}</td>
				<td>{product.attributes}</td>
				<td>${product.price}</td>
				<td>
					<button onClick={() => this.updateOne(product.item_id, product.quantity - 1)}>-</button>
					{product.quantity}
					<button onClick={() => this.updateOne(product.item_id, product.quantity + 1)}>+</button>
				</td>
				<td>${product.subtotal}</td>
			</tr>
		);
	}
}

export default connect(null, { updateItemInCart })(CartItem)
