import React from 'react';
import { Link } from 'react-router-dom';

import MainNav from './MainNav';

const BottomNav = ({ closeMenu, isSearch, toggleSearch, searchText, onChange, onKeyDown, onKeyUp }) => {

	return (
		<div className="bottomNav">
			<div>
			<Link to="/"><h4 className="brand">SHOPMATE</h4></Link>
			</div>

			<div className="col s12 l4">
				<MainNav closeMenu={closeMenu} />
			</div>

			<div className="searchBar">
				<input 
					className={isSearch ? "input-active" : ""} 
					onChange={onChange}
					onKeyUp={(e) => onKeyUp(e)}
					onKeyDown={onKeyDown}
					type="text" 
					name="searchText" 
					id="search" 
					value={searchText} 
					placeholder="Search Anything" 
				/>
				<i onClick={toggleSearch} className="small material-icons search-icon">search</i>
			</div>
		</div>
	);
};

export default BottomNav;
