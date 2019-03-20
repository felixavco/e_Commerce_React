import React, { Component } from 'react';
import { connect } from 'react-redux';
import Attributes from './Attributes';
import { addProdToChart, getTotalAmount } from '../../../redux/actions/shoppingCartActions';
import { clearSingleProduct } from '../../../redux/actions/productsAction';

class AddToCart extends Component {
	state = {
		colors: [],
		sizes: [],
		color: 'White',
		size: 'S'
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.prod_attributes) {
			this.setState({
				colors: nextProps.prod_attributes.filter((attr) => attr.attribute_name === 'Color'),
				sizes: nextProps.prod_attributes.filter((attr) => attr.attribute_name === 'Size'),
			});
		}
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	addProduct = (e) => {
		e.preventDefault();
		const { product_id } = this.props;
		const { color, size } = this.state;
		const attributes = `Color: ${color}, Size: ${size}`;
		this.props.addProdToChart(product_id, attributes);
		this.closeModal();
		this.props.getTotalAmount();
	};

	closeModal = () => {
		this.props.clearSingleProduct();
	};

	render() {
		const { colors, sizes, color, size} = this.state;

		return (
			<div>
				<form onSubmit={this.addProduct}>
					<Attributes
						picked_color={color}
						picked_size={size}
						onChange={this.onChange}
						sizes={sizes}
						colors={colors}
					/>
					<div className="btn-cont">
						<button className="add-btn">Add to cart</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	prod_attributes: state.products.prod_attributes
});

export default connect(mapStateToProps, { addProdToChart, clearSingleProduct, getTotalAmount })(AddToCart);
