import React, { Component, Fragment } from 'react';
//Components
import Loading from '../commons/Loading';
import Pagination from './Pagination';
import Products from './Products';
//Redux
import { connect } from 'react-redux';
import { searchProducts, getProducts } from '../../redux/actions/productsAction';

class SearchResults extends Component {
	state = {
		isLoading: true,
		products: [],
		itemsPerPage: 5,
		descriptionLen: 100 //Description Length
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.allProducts.length > 0) {
			this.setState({
				products: nextProps.allProducts,
				isLoading: false
			});
		} else {
			this.setState({
				products: []
			});
		}

		if (nextProps.searchQuery !== this.props.searchQuery) {
			this.sendSearchRequest(nextProps.searchQuery);
		}
	};

	componentDidMount() {
		//set the first page when the page is loaded
		this.sendSearchRequest(this.props.searchQuery);
	}

	sendSearchRequest(searchQuery) {
		const { itemsPerPage, descriptionLen } = this.state;
		if (searchQuery !== '') {
			const query = {
				search: searchQuery,
				page: 1,
				limit: itemsPerPage,
				descLen: descriptionLen
			};
			this.props.searchProducts(query);
		} else {
			const query = {
				page: 1,
				limit: itemsPerPage,
				descLen: descriptionLen
			};

			this.props.getProducts(query);
		}
	}

	render() {
    const pagePath = this.props.match.url.match(/([^/0-9])/g).join('');
    const { searchQuery } = this.props
		const { isLoading, products, itemsPerPage, descriptionLen } = this.state;

    let content;

		if (isLoading) {
			content = <Loading text="Loading Products..." />;
		} else {
			if (this.state.products.length === 0) {
				content = (
					<div style={{margin: '8rem 0'}}>
						<h3 className="center-align">No Products Found :(</h3>
            <h3 className="center-align"><i className="far fa-frown"/></h3>
					</div>
				);
			} else {
				content = (
					<div className="products-List">
						<Pagination search={searchQuery} pagePath={pagePath} itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />

						<Fragment>
							<Products products={products} addToChart={this.addToChart} />
						</Fragment>

						<Pagination search={searchQuery} pagePath={pagePath} itemsPerPage={itemsPerPage} descriptionLen={descriptionLen} />
					</div>
				);
			}
    }

    let title;

    if(searchQuery === "") {
      title = <h3 className="center-align">Please Search</h3>
    } else {
      title = <h3 className="center-align">Results for: "{searchQuery}"</h3>
    }

		return (
			<div className="all-Products">
				{ title }
				<div className="container">{content}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	allProducts: state.products.allProducts,
	errors: state.errors,
	totalProducts: state.products.totalProducts,
	searchQuery: state.products.searchQuery
});

export default connect(mapStateToProps, { searchProducts, getProducts })(SearchResults);
