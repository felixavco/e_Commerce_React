import React from 'react';
//Router
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeparments, setDeptId } from '../../../redux/actions/productsAction';

const MainNav = ({ closeMenu, deparments, setDeptId }) => {

	const elements = deparments.map((el) => (
		<li key={el.department_id} onClick={closeMenu}>
			<NavLink activeClassName="mainNav-active" onClick={() => setDeptId(el.department_id)} to={`/deparment/${el.department_id}`}>
				{el.name}
			</NavLink>
		</li>
	));
	return (
		<nav className="mainNav">
			<ul>{elements}</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	deparments: state.products.deparments
});

export default connect(mapStateToProps, { getDeparments, setDeptId })(MainNav);
