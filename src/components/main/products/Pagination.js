import React from 'react';

const Pagination = ({ currentPage, nextPage, prevPage, setPage, pages }) => {

	let PAGES = [];

	for(let i = 0; i < pages; i++) {
		PAGES = [
			...PAGES,
			<li onClick={() => setPage(i + 1)} key={i} className={i + 1 === currentPage ? "active" : "waves-effect" }>
				<a onClick={(e) => e.preventDefault()} href="/">{i + 1}</a>
			</li>
		]
	}

	return (
		<ul className="pagination">
			<li onClick={prevPage} className={currentPage <= 1 ? "disabled" : "waves-effect"}>
				<a onClick={(e) => e.preventDefault()} href="/">
					<i className="material-icons">chevron_left</i>
				</a>
			</li>

			{ PAGES }

			<li onClick={nextPage} className={currentPage >= pages ? "disabled" : "waves-effect"}>
				<a onClick={(e) => e.preventDefault()} href="/">
					<i className="material-icons">chevron_right</i>
				</a>
			</li>
		</ul>
	);
};

export default Pagination;
