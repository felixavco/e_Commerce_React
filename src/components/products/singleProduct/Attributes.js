import React from 'react';
import PropTypes from 'prop-types';

const Attributes = ({ colors, sizes, onChange, picked_color, picked_size }) => {
	const COLORS = colors.map((color) => (
		<li
			className={picked_color === color.attribute_value ? 'picked' : ''}
			key={color.attribute_value_id}
			style={{ border: '2px solid geen' }}
		>
			<label
				htmlFor={color.attribute_value}
				style={{
					backgroundColor: `${color.attribute_value.toLowerCase()}`
				}}
			/>
			<input
				onChange={(e) => onChange(e)}
				type="radio"
				name="color"
				id={color.attribute_value}
				value={color.attribute_value}
			/>
		</li>
	));

	const SIZES = sizes.map((size) => (
		<li className={picked_size === size.attribute_value ? 'picked' : ''} key={size.attribute_value_id}>
			<label htmlFor={size.attribute_value}>{size.attribute_value}</label>
			<input
				onChange={(e) => onChange(e)}
				type="radio"
				name="size"
				id={size.attribute_value}
				value={size.attribute_value}
			/>
		</li>
	));

	return (
		<div className="attributes">
			<h6>Color</h6>
			<ul className="colors">{COLORS}</ul>
			<h6>Size</h6>
			<ul className="sizes">{SIZES}</ul>
		</div>
	);
};

Attributes.propTypes = {
	picked_color: PropTypes.string.isRequired, 
	picked_size: PropTypes.string.isRequired, 
	onChange: PropTypes.func.isRequired, 
	sizes: PropTypes.array.isRequired, 
	colors: PropTypes.array.isRequired
}

export default Attributes;
