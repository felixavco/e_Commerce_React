import React, { Component } from 'react';
import isEmpty from '../../../utils/isEmpty'
import { connect } from 'react-redux';
import { clearSingleProduct } from '../../../redux/actions/productsAction';
//Components
import Gallery from './Gallery';
import Details from './Details';

class SingleProduct extends Component {

	state = {
		active: false,
		product: [], 
	}

	componentWillReceiveProps(nextProps) {
		if(!isEmpty(nextProps.singleProduct)) {
			this.setState({
				active: true,
				product: nextProps.singleProduct
			})
		} else {
			this.setState({
				active: false,
				product: {}
			})
		}
	}

	//Closes the modal when user clicks on the X or outside of the modal body, this also sets to empty the product and its attributes
	closeModal = (e) => {
		if(e.target.className.split(' ')[1] === "active"){
			this.props.clearSingleProduct()
		}
	}

	render() {
		const { active } = this.state;
		const { product_id, name, description, price, discounted_price, image, image_2 } = this.state.product;
		const product = { product_id, name, description, price, discounted_price }
		const { clearSingleProduct } = this.props

		return (
			<div onClick={this.closeModal} className={`single-product ${active ? "active" : ""}`}>
				<div className="product-cont container">
				<span className="btn-close" onClick={clearSingleProduct}><i class="far fa-times-circle"/></span>
					<div className="row">
						<h3 className="center-align">{name}</h3>
						<div className="col s12 m5">
							<Gallery images={[image, image_2]}/>
						</div>
						<div className="col s12 m7">
							<Details closeModal={this.closeModal} product={product}/> 
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	singleProduct: state.products.singleProduct,
	prod_attributes: state.products.prod_attributes
})

export default connect(mapStateToProps, { clearSingleProduct })(SingleProduct);
