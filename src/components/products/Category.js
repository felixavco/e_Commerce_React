import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//Components
import Loading from '../commons/Loading';
import Pagination from './Pagination';
import Products from './Products';
import CategoryNav from './CategoryNav';
//Redux
import { connect } from 'react-redux';
import { getProductsinCat } from '../../redux/actions/productsAction';

class Category extends Component {
	state = {
		isLoading: true,
		itemsPerPage: 5,
		descriptionLen: 100,
		products: []
  };

  componentWillReceiveProps(nextProps) {
		if (nextProps.allProducts.length > 0) {
			this.setState({
				products: nextProps.allProducts,
				isLoading: false
			});
		}

		if(nextProps.category_id !== this.props.category_id) {
			this.setState({
				isLoading: true
			})
			this.setFirstPage(nextProps.category_id);
		}
	}
  
  componentWillMount() {
		const { catId } = this.props.match.params;
		this.setFirstPage(catId);
	}

	setFirstPage = (catId) => {
		const { itemsPerPage, descriptionLen } = this.state;
		const data = {
			page: 1,
			limit: itemsPerPage,
			descLen: descriptionLen
		};
		this.props.getProductsinCat(catId, data);
	};

	render() {
    const pagePath = this.props.match.url.match(/([^/0-9])/g).join('');
		const { catId } = this.props.match.params;
		const { isLoading, products, itemsPerPage, descriptionLen } = this.state;
		let content;
		if (isLoading) {
			content = <Loading text="Loading Products..." />;
		} else {
			content = (
				<div className="products-List">
					<Pagination
						deptId={catId}
						pagePath={pagePath}
						itemsPerPage={itemsPerPage}
						descriptionLen={descriptionLen}
					/>

					<Fragment>
						<Products products={products} />
					</Fragment>

					<Pagination
						deptId={catId}
						pagePath={pagePath}
						itemsPerPage={itemsPerPage}
						descriptionLen={descriptionLen}
					/>
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

Category.propTypes = {
	allProducts: PropTypes.array.isRequired,
	getProductsinCat: PropTypes.func.isRequired,
	category_id: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
	allProducts: state.products.allProducts,
	category_id: state.products.category_id
});

export default connect(mapStateToProps, { getProductsinCat })(Category);
