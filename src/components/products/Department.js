import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//Components
import Loading from '../commons/Loading';
import Pagination from './Pagination';
import Products from './Products';
import CategoryNav from './CategoryNav';
//Redux
import { connect } from 'react-redux';
import { getProductsInDept } from '../../redux/actions/productsAction';

class Department extends Component {
	state = {
		isLoading: true,
		itemsPerPage: 5,
		descriptionLen: 100,
		products: [],
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.allProducts.length > 0) {
			this.setState({
				products: nextProps.allProducts,
				isLoading: false
			});
		}
		
		if(nextProps.deparment_id !== this.props.deparment_id) {
			this.setState({
				isLoading: true
			})
			this.setFirstPage(nextProps.deparment_id);
		}
	}

	componentWillMount() {
		const { deptId } = this.props.match.params;
		this.setFirstPage(deptId);
	}

	setFirstPage = (deptId) => {
		const { itemsPerPage, descriptionLen } = this.state;

		const data = {
			page: 1,
			limit: itemsPerPage,
			descLen: descriptionLen
		};

		this.props.getProductsInDept(deptId, data);
	};

	render() {
		const pagePath =  this.props.match.url.match(/([^/0-9])/g).join('');
		const { deptId } = this.props.match.params;
		const { isLoading, products, itemsPerPage, descriptionLen } = this.state;
		let content;
		if (isLoading) {
			content = <Loading text="Loading Products..." />;
		} else {
			content = (
				<div className="products-List">
	
					<Pagination deptId={deptId} pagePath={pagePath} itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />

					<Fragment>
						<Products products={products} />
					</Fragment>

					<Pagination deptId={deptId} pagePath={pagePath} itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />
				</div>
			);
		}

		return (
			<div className="all-Products">
				<div className="row">
					<div className="col s12 l2 categoryNav-cont">
						<CategoryNav department={deptId} />
					</div>
					<div className="col s12 l10">{content}</div>
				</div>
			</div>
		);
	}
}

Department.propTypes = {
	allProducts: PropTypes.any.isRequired,
	getProductsInDept: PropTypes.func.isRequired,
	deparment_id: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
	allProducts: state.products.allProducts, 
	deparment_id: state.products.deparment_id
});

export default connect(mapStateToProps, { getProductsInDept })(Department);
