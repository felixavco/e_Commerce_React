import React from 'react';

import MainNav from './MainNav';

const BottomNav = ({ closeMenu, isSearch, toggleSearch }) => {

	return (
		<div className="bottomNav">
			<div>
				<h4 className="brand">SHOPMATE</h4>
			</div>

			<div className="col s12 l4">
				<MainNav closeMenu={closeMenu} />
			</div>

			<div className="searchBar">
				<input className={isSearch ? "input-active" : ""} type="text" name="search" id="search" placeholder="Search Anything" />
				<i onClick={toggleSearch} className="small material-icons search-icon">search</i>
			</div>
		</div>
	);
};

export default BottomNav;
