import React from 'react';

const Spinner = ({size = ""}) => {

	const contStyles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	return (
		<div style={contStyles}>
			<div  className={`preloader-wrapper active ${size}`}>
				<div className="spinner-layer spinner-red-only">
					<div className="circle-clipper left">
						<div className="circle" />
					</div>
					<div className="gap-patch">
						<div className="circle" />
					</div>
					<div className="circle-clipper right">
						<div className="circle" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
