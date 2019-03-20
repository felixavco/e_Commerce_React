import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategories, getCategoriesInDept, setCatId } from '../../redux/actions/productsAction';

class CategoryNav extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.department !== this.props.department) {
			this.props.getCategoriesInDept(nextProps.department);
		}
	}

	componentWillMount() {
		if (this.props.department) {
			this.props.getCategoriesInDept(this.props.department);
		} else {
			this.props.getCategories();
		}
  }
  
  setId = (id) => {
    this.props.setCatId(id)
  }

	render() {

		let elements;
		if (this.props.categories && this.props.categories.length > 0) {
			elements = this.props.categories.map((element) => (
				<li key={element.category_id}>
					<NavLink activeClassName="cat-active" onClick={() => this.setId(element.category_id)} to={`/category/${element.category_id}`}>
						{element.name}
					</NavLink>
				</li>
			));
		}

		return (
			<div className="categoriesNav">
				<h5>Categories</h5>
				<hr/>
				<ul>{elements}</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.products.categories
});

export default connect(mapStateToProps, { getCategories, getCategoriesInDept, setCatId })(CategoryNav);
