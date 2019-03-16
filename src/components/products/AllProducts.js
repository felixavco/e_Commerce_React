import React, { Component, Fragment } from 'react';
//Components
import Spinner from '../commons/Spinner';
import Pagination from './Pagination';
import Products from './Products';
// import SingleProduct from './SingleProduct';

//Redux
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/productsAction';
import { addProdToChart, getTotalAmount } from '../../redux/actions/shoppingCartActions';

class AllProducts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isSearch: false,
			searchQuery: '',
			pages: 0,
			currentPage: 1,
			products: [],
			perPage: 15,
			descriptionLen: 100 //Description Length
		};
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.allProducts.length > 0) {
			this.setState({
				products: nextProps.allProducts,
				isLoading: false,
				isSearch: false,
				searchQuery: ''
			});
			//this will set the total number of pages
			this.setNumOfPages(nextProps.totalProducts);
		}

		if (nextProps.searchQuery !== '') {
			this.setState({
				isSearch: true,
				searchQuery: nextProps.searchQuery
			});
		}
	};

	componentDidMount() {
		const { perPage, descriptionLen } = this.state;
		//set the first page when the page is loaded
		const query = {
			page: 1,
			limit: perPage,
			descLen: descriptionLen
		};
		this.props.getProducts(query);
	}

	/*
    Sets the number of pages depending on the total number of items 
    if the total number of items is greater than the total of items per page, checks for the number of pages required to display all items.
  */
	setNumOfPages = (items) => {
		const { perPage } = this.state;

		if (items > perPage) {
			if (items % perPage === 0) {
				this.setState({ pages: items / perPage });
			} else {
				const x = Math.trunc(items / perPage);
				this.setState({ pages: x + 1 });
			}
		} else {
			this.setState({ pages: 1 });
		}
	};

	/* Adds 1 to "currentPage" when the user clicks on the next button in the pagination */
	nextPage = () => {
		const { currentPage, pages } = this.state;
		if (currentPage >= pages) {
			this.setState({ currentPage: pages });
		} else {
			this.setState({ currentPage: currentPage + 1 }, () => {
				this.loadPage();
			});
		}
	};

	/* Substract 1 to "currentPage" when the user clicks on the Prev button in the pagination */
	prevPage = () => {
		const { currentPage } = this.state;
		if (currentPage <= 1) {
			this.setState({ currentPage: 1 });
		} else {
			this.setState({ currentPage: currentPage - 1 }, () => {
				this.loadPage();
			});
		}
	};

	setPage = (page) => {
		this.setState({ currentPage: page }, () => {
			this.loadPage();
		});
	};

	//Loads the items on the selected page
	loadPage = () => {
		const { currentPage, perPage, descriptionLen } = this.state;

		if (this.state.isSearch) {
			console.log(this.state.searchQuery);
		} else {
			const query = {
				page: currentPage,
				limit: perPage,
				descLen: descriptionLen
			};

			this.props.getProducts(query);
		}

		this.setState({ isSearch: false });
	};

	addToChart = (id) => {
		this.props.addProdToChart(id);
		this.props.getTotalAmount();
	};

	render() {
		const { isLoading, currentPage, pages, products } = this.state;

		let content;

		if (isLoading) {
			content = (
				<div style={{ padding: '8rem' }}>
					<Spinner size="big" />
					<h5 className="center-align">Loading Products...</h5>
				</div>
			);
		} else {
			content = (
				<div className="products-List">
					<Pagination
						currentPage={currentPage}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						setPage={this.setPage}
						pages={pages}
					/>

					<Fragment>
						<Products products={products} addToChart={this.addToChart} />
					</Fragment>

					<Pagination
						currentPage={currentPage}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						setPage={this.setPage}
						pages={pages}
					/>
				</div>
			);
		}

		return (
			<div className="all-Products">
				<div className="row">
					<div className="col s12 l3 teal">
						<h1>HOLIS</h1>
					</div>
					<div className="col s12 l9">{content}</div>
				</div>
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

export default connect(mapStateToProps, { getProducts, addProdToChart, getTotalAmount })(AllProducts);
