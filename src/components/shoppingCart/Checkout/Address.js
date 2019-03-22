import React from 'react';
import country_list from '../../customer/country_list';
country_list.unshift("Please Select");


const Address = ({ address, onchange, regions, shipping_options }) => {
	const { address_1, address_2, city, region, postal_code, country, shipping_region_id, shipping_method } = address;

	const countries = country_list.map((country, index) => (
		<option key={index} value={country}>
			{country}
		</option>
	));

	const ship_regs = regions.map((region) => (
		<option key={region.shipping_region_id} value={region.shipping_region_id}>
			{region.shipping_region}
		</option>
	));

	shipping_options = [{shipping_type: "Please Select"}, ...shipping_options];

	const ship_opts = shipping_options.map((option, i) => (
		<option key={i} value={option.shipping_id}>
			{option.shipping_type}
		</option>
	));

	return (
		<div className="container">

			<div className="input-field">
				<label style={{ position: `${address_1 ? 'static' : 'absolute'}` }} htmlFor="address_1">
					Address 1
				</label>
				<input onChange={onchange} type="text" name="address_1" value={address_1 } id="address_1" />
			</div>

			<div className="input-field">
				<label style={{ position: `${address_2 ? 'static' : 'absolute'}` }} htmlFor="address_2">
					Address 2
				</label>
				<input onChange={onchange} type="text" name="address_2" value={address_2} id="address_2" />
			</div>

			<div className="row">
				<div className="col s12 m4">
					<div className="input-field">
						<label style={{ position: `${city ? 'static' : 'absolute'}` }} htmlFor="city">
							City
						</label>
						<input onChange={onchange} type="text" name="city" value={city} id="city" />
					</div>
				</div>
				<div className="col s12 m4">
					<div className="input-field">
						<label style={{ position: `${region ? 'static' : 'absolute'}` }} htmlFor="region">
							Region
						</label>
						<input onChange={onchange} type="text" name="region" value={region} id="region" />
					</div>
				</div>
				<div className="col s12 m4">
					<div className="input-field">
						<label style={{ position: `${postal_code ? 'static' : 'absolute'}` }} htmlFor="postal_code">
							Postal Code
						</label>
						<input
              id="postal_code"
							onChange={onchange}
							type="text"
							name="postal_code"
							value={postal_code}
						/>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col s12 m4">
          <div className="input-field">
          <label style={{position: "static"}} htmlFor="country">Country</label>
					<select id="country" onChange={onchange} name="country" value={country} style={{ display: 'block' }}>
						{countries}
					</select>
          </div>
				</div>

				<div className="col s12 m4">
					<div className="input-field">
						<label style={{position: "static"}} htmlFor="shipping_region_id">Shipping Region</label>
						<select
							onChange={onchange}
							name="shipping_region_id"
							value={shipping_region_id}
              style={{ display: 'block' }}
              id="shipping_region_id"
						>
							{ship_regs}
						</select>
					</div>
				</div>

				<div className="col s12 m4">
					<div className="input-field">
						<label style={{position: "static"}} htmlFor="shipping_method">Shipping Options</label>
						<select
							onChange={onchange}
							name="shipping_method"
							value={shipping_method}
              style={{ display: 'block' }}
              id="shipping_method"
						>
							{ship_opts}
						</select>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Address;
