import React from 'react';
import { baseURL } from '../../config/config';
import { connect } from 'react-redux';
import { getSingleProduct, getProdAttr, getProductReviews } from '../../redux/actions/productsAction';
const productImagesURL = baseURL + '/images/products/';

const ProductItem = ({ product, getSingleProduct, getProdAttr, getProductReviews }) => {
	const { product_id, name, description, price, discounted_price, thumbnail } = product;

	const getProduct = (id) => {
		getSingleProduct(id);
		getProdAttr(id);
		getProductReviews(id)
	};

	return (
		<div onClick={() => getProduct(product_id)} className="product-item">
			<h5 className="center-align">{name}</h5>

			<div className="cont">
				<div className="img-cont">
					<img src={productImagesURL + thumbnail} alt={name} />
				</div>
				<div className="content">
					<div className="price">
						<span className={discounted_price === '0.00' ? 'reg-price' : 'x-price'}>${price}</span>
						&nbsp; &nbsp;
						<span className={discounted_price === '0.00' ? 'hide-price' : 'disc-price'}>
							${discounted_price}
						</span>
					</div>
					<div className="description">
						<p>{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { getSingleProduct, getProdAttr, getProductReviews })(ProductItem);
