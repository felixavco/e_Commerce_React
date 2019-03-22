import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { getProducts, getProductsInDept, getProductsinCat, searchProducts } from '../../redux/actions/productsAction';

class Pagination extends Component {
	state = {
		currentPage: 1,
		pages: 0
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.totalProducts !== this.props.totalProducts) {
			this.setNumOfPages(nextProps.totalProducts);
		}
	}
	

	componentWillMount() {
		this.setNumOfPages(this.props.totalProducts);
	}

	/*
    Sets the number of pages depending on the total number of items 
    if the total number of items is greater than the total of items per page, checks for the number of pages required to display all items.
  */
	setNumOfPages = (items) => {
		const { itemsPerPage } = this.props;

		if (items > itemsPerPage) {
			if (items % itemsPerPage === 0) {
				this.setState({ pages: items / itemsPerPage });
			} else {
				const x = Math.trunc(items / itemsPerPage);
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
		const { currentPage } = this.state;
		const { itemsPerPage, descriptionLen, pagePath, deptId, search } = this.props;

		const query = {
			page: currentPage,
			limit: itemsPerPage,
			descLen: descriptionLen
		};

		switch (pagePath) {
			case 'deparment':
				this.props.getProductsInDept(deptId, query);
				break;

			case 'category':
				this.props.getProductsinCat(deptId, query);
				break;
			
			case 'search-results':
				const data = {...query, search}
				this.props.searchProducts(data);
				break;

			default:
				this.props.getProducts(query);
				break;
		}
	};

	render() {
		const { currentPage, pages } = this.state;
		let PAGES = [];

		for (let i = 0; i < pages; i++) {
			PAGES = [
				...PAGES,
				<li
					onClick={() => this.setPage(i + 1)}
					key={i}
					className={i + 1 === currentPage ? 'active' : 'waves-effect'}
				>
					<a onClick={(e) => e.preventDefault()} href="/">
						{i + 1}
					</a>
				</li>
			];
		}

		return (
			<ul className="pagination">
				<li onClick={this.prevPage} className={currentPage <= 1 ? 'disabled' : 'waves-effect'}>
					<a onClick={(e) => e.preventDefault()} href="/">
						<i className="material-icons">chevron_left</i>
					</a>
				</li>

				{PAGES}

				<li onClick={this.nextPage} className={currentPage >= pages ? 'disabled' : 'waves-effect'}>
					<a onClick={(e) => e.preventDefault()} href="/">
						<i className="material-icons">chevron_right</i>
					</a>
				</li>
			</ul>
		);
	}
}

Pagination.propTypes = {
	itemsPerPage: PropTypes.number.isRequired,
	descriptionLen: PropTypes.number.isRequired,
	pagePath: PropTypes.string,
	deptId: PropTypes.string
};

Pagination.defaultProps = {
	deptId: 1,
	pagePath: ''
};

const mapStateToProps = (state) => ({
	totalProducts: state.products.totalProducts
});

export default connect(mapStateToProps, { getProducts, getProductsInDept, getProductsinCat, searchProducts })(Pagination);
