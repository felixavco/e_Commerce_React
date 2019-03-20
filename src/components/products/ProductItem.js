import React from 'react';
import { baseURL } from '../../config/config';
import { connect } from 'react-redux';
import { addProdToChart, getTotalAmount } from '../../redux/actions/shoppingCartActions';
import { getSingleProduct, getProdAttr } from '../../redux/actions/productsAction';
const productImagesURL = baseURL + '/images/products/';

const ProductItem = ({ product, addProdToChart, getTotalAmount, getSingleProduct, getProdAttr }) => {
	const { product_id, name, description, price, discounted_price, thumbnail } = product;

	const addToChart = (id) => {
		addProdToChart(id);
		getTotalAmount();
	};

	const getProduct = (e, id) => {
		e.preventDefault();
		getSingleProduct(id);
		getProdAttr(id);
	};

	return (
		<div className="product-item">
			<h5 className="center-align">{name}</h5>

			<div className="cont">
				<div className="img-cont">
					<a onClick={(e) => getProduct(e, product_id)} href="#!">
						<img src={productImagesURL + thumbnail} alt={name} />
					</a>
				</div>
				<div className="content">
					<div className="price">
						<span className={discounted_price === '0.00' ? 'reg-price' : 'x-price'}>${price}</span>
						&nbsp; &nbsp;
						<span className={discounted_price === '0.00' ? 'hide-price' : 'disc-price'}>
							${discounted_price}
						</span>
					</div>
					<div className="actions">
						<a onClick={(e) => getProduct(e, product_id)} href="#!">
							<i className="far fa-plus-square" /> See Details...
						</a>
						<button
							onClick={() => addToChart(product_id)}
							className="btn-floating btn waves-effect waves-light red"
						>
							<i className="small material-icons">add_shopping_cart</i>
						</button>
					</div>
					<div className="description">
						<p>{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { addProdToChart, getTotalAmount, getSingleProduct, getProdAttr })(ProductItem);
