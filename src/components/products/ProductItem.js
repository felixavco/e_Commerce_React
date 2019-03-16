import React from 'react';
import { baseURL } from '../../config/config';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import { addProdToChart } from '../../redux/actions/shoppingCartActions';
const productImagesURL = baseURL + '/images/products/';

const ProductItem = ({ product, addToChart }) => {
	const { product_id, name, description, price, discounted_price, thumbnail } = product;

	return (
		<div className="product-item">
			<h5 className="center-align">{name}</h5>

			<div className="cont">
				<div className="img-cont">
					<Link to={'/product/' + product_id}>
						<img src={productImagesURL + thumbnail} alt={name} />
					</Link>
				</div>
				<div className="content">
					<div className="price">
						<span className={discounted_price === '0.00' ? 'reg-price' : 'x-price'}>${price}</span>
						&nbsp;
            &nbsp;
						<span className={discounted_price === '0.00' ? 'hide-price' : 'disc-price'}>
							${discounted_price}
						</span>
					</div>
					<div className="actions">
						<Link to={'/product/' + product_id}><i className="far fa-plus-square"/> See Details...</Link>
						<button onClick={() => addToChart(product_id)} className="btn-floating btn waves-effect waves-light red">
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

export default ProductItem;
