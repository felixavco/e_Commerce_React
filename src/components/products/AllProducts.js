import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Components
import Loading from '../commons/Loading';
import Pagination from './Pagination';
import Products from './Products';
import CategoryNav from './CategoryNav';
// import SingleProduct from './SingleProduct';
//Redux
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/productsAction';

class AllProducts extends Component {

	state = {
		isLoading: true,
		products: [],
		itemsPerPage: 15,
		descriptionLen: 100 //Description Length
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.allProducts.length > 0) {
			this.setState({
				products: nextProps.allProducts,
				isLoading: false
			});
		}
	};

	componentDidMount() {
		const { itemsPerPage, descriptionLen } = this.state;
		//set the first page when the page is loaded
		const query = {
			page: 1,
			limit: itemsPerPage,
			descLen: descriptionLen
		};
		this.props.getProducts(query);
	}

	render() {
		const { isLoading, products, itemsPerPage, descriptionLen } = this.state;

		let content;

		if (isLoading) {
			content = (
				<Loading text="Loading Products..."/>
			);
		} else {
			content = (
				<div className="products-List">
					<Pagination itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />

						<Products products={products} addToChart={this.addToChart} />

					<Pagination itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />
				</div>
			);
		}

		return (
			<div className="all-Products">
				<div className="row">
					<div className="col s12 l2 categoryNav-cont">
						<CategoryNav />
					</div>
					<div className="col s12 l10">{content}</div>
				</div>
			</div>
		);
	}
}

AllProducts.propTypes = { 
	allProducts: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired,
	totalProducts: PropTypes.number.isRequired,
	searchQuery: PropTypes.string.isRequired,
	getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	allProducts: state.products.allProducts,
	errors: state.errors,
	totalProducts: state.products.totalProducts,
	searchQuery: state.products.searchQuery, 
});

export default connect(mapStateToProps, { getProducts })(AllProducts);
