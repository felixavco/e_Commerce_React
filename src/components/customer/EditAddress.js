import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAddress, getProfile,  } from '../../redux/actions/customerActions';
import country_list from './country_list';

class EditAddress extends Component {
	state = {
		address_1: '',
		address_2: '',
		city: '',
		region: '',
		postal_code: '',
		country: '',
		shipping_region_id: ''
	};

	componentWillMount() {
		const { address_1, address_2, city, region, postal_code, country, shipping_region_id } = this.props.profile;

		this.setState({
			address_1,
			address_2,
			city,
			region,
			postal_code,
			country,
			shipping_region_id
		});
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { address_1, address_2, city, region, postal_code, country, shipping_region_id } = this.state;
		this.props.updateAddress({ address_1, address_2, city, region, postal_code, country, shipping_region_id });
		this.props.getProfile();
		this.props.closeEditMode(e);
	};

	render() {
		const { address_1, address_2, city, region, postal_code, country, shipping_region_id } = this.state;
		const { shipping_regions } = this.props;

		const { closeEditMode } = this.props;

		const countries = country_list.map((country, index) => (
			<option key={index} value={country}>
				{country}
			</option>
		));

		const ship_regs = shipping_regions.map((region) => (
			<option key={region.shipping_region_id} value={region.shipping_region_id}>
				{region.shipping_region}
			</option>
		));

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<ul>
						<li>
							<span>Address 1:</span>
							<input onChange={this.onChange} name="address_1" value={address_1} type="text" />
						</li>
						<li>
							<span>Address 2:</span>
							<input onChange={this.onChange} name="address_2" value={address_2} type="text" />
						</li>
						<li>
							<span>City:</span>
							<input placeholder="City" onChange={this.onChange} name="city" value={city} type="text" />
						</li>
						<li>
							<span>Region:</span>
							<input
								placeholder="Region"
								onChange={this.onChange}
								name="region"
								value={region}
								type="text"
							/>
						</li>
						<li>
							<span>Postal Code:</span>
							<input
								placeholder="Enter your secondary phone number"
								onChange={this.onChange}
								name="postal_code"
								value={postal_code}
								type="text"
							/>
						</li>
						<li>
							<span>Country:</span>
							<select onChange={this.onChange} name="country" value={country}>
								{countries}
							</select>
						</li>
						<li>
							<span>Shipping Region:</span>
							<select onChange={this.onChange} name="shipping_region_id" value={shipping_region_id}>
								{ship_regs}
							</select>
						</li>
					</ul>
					<div className="save-btn-cont">
						<button onClick={closeEditMode} className="btn">
							Cancel&nbsp;
							<i className="fas fa-times" />
						</button>

						<button className="btn save-btn">
							Save&nbsp;
							<i className="far fa-save" />
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.customer.profile
});

export default connect(mapStateToProps, { updateAddress, getProfile })(EditAddress);
