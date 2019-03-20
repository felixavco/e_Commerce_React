import React from 'react';
import Spinner from './Spinner';

const Loading = ({text}) => {
	return (
		<div style={{ padding: '8rem' }}>
			<Spinner size="big" />
			<h5 className="center-align">{ text }</h5>
		</div>
	);
};

export default Loading;
