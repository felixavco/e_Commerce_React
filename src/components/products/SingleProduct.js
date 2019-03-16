import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, getProductReviews } from '../../redux/actions/productsAction';
import { baseURL } from '../../config/config';
import Spinner from '../commons/Spinner';

class SingleProduct extends Component {
	state = {
		productId: this.props.match.params.productId,
		isLoading: true
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.singleProduct) {
			this.setState({ isLoading: false });
		}
	};

	componentWillMount() {
		this.props.getSingleProduct(this.state.productId);
		this.props.getProductReviews(this.state.productId);
	}

	render() {
		let content;
		console.log(this.state.isLoading);
		const { isLoading } = this.state;
		if (isLoading) {
			content = (
				<div style={{ padding: '8rem' }}>
					<Spinner size="big" />
					<h5 className="center-align">Loading Product...</h5>
				</div>
			);
		} else {
			const { name, description, price, discounted_price, image, image_2 } = this.props.singleProduct;
			content = (
				<div className="row">
					<div>
						<h4>{name}</h4>
						<div className="price">
							<span className="reg-price">${price}</span>
							<span className="disc-price">${discounted_price}</span>
						</div>
					</div>

					<div className="col s12 m5 red">
						<div className="img-cont">
							<img src={baseURL + '/images/products/' + image} alt={name} />
						</div>
						<div className="desc">
							<p>{description}</p>
						</div>
					</div>

					<div className="col s12 m7 blue">PRoduct</div>
				</div>
			);
		}

		return (
			<div className="singleProduct">
				<div className="container">{content}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	singleProduct: state.products.singleProduct,
	ProductReviews: state.products.ProductReviews
});

export default connect(mapStateToProps, { getSingleProduct, getProductReviews })(SingleProduct);
