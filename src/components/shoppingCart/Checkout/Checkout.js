import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShipRegs, getProfile } from '../../../redux/actions/customerActions';
import { getShippingOptions } from '../../../redux/actions/shoppingCartActions';

import Address from './Address';

class Checkout extends Component {
	state = {
		address_1: '',
		address_2: '',
		city: '',
		region: '',
		postal_code: '',
		country: '',
		shipping_region_id: '',
		shipping_method: '',
		shipping_options: [],
		showNext: false,
		showPrev: false,
		page2: false
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.profile) {
			const { address_1, address_2, city, region, postal_code, country } = nextProps.profile;
			this.setState({
				address_1,
				address_2,
				city,
				region,
				postal_code,
				country
				// shipping_region_id
			});
		}

		if (nextProps.shippingOptions !== this.props.shippingOptions) {
			this.setState({ shipping_options: nextProps.shippingOptions });
		}
	};

	componentDidMount = () => {
		this.props.getShipRegs();
		const { auth, getProfile, getShippingOptions, profile } = this.props;
		if (auth.isAuthenticated) {
			getProfile();
			getShippingOptions(profile.shipping_region_id);
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			this.validation(this.enableShipOpts);
		});
	};

	validation = (callback) => {
		const { address_1, city, region, postal_code, country, shipping_region_id } = this.state;
		if (
			address_1 !== '' &&
			city !== '' &&
			region !== '' &&
			postal_code !== '' &&
			country !== 'Please Select' &&
			shipping_region_id !== undefined &&
			shipping_region_id !== '1'
		) {
			this.props.getShippingOptions(shipping_region_id);
		} else {
			this.setState({ showNext: false });
		}

		callback();
	};

	enableShipOpts = () => {
		if (
			this.state.shipping_method !== '' &&
			this.state.shipping_method !== undefined &&
			this.state.shipping_method !== 'Please Select'
		) {
			this.setState({ showNext: true });
		} else {
			this.setState({ showNext: false });
		}
	};

	onPrev = () => {
		this.setState({
			page2: false,
			showPrev: false,
			showNext: true
		});
	};

	onNext = () => {
		this.setState({
			page2: true,
			showPrev: true,
			showNext: false
		});
	};

	render() {
		const {
			address_1,
			address_2,
			city,
			region,
			postal_code,
			country,
			shipping_region_id,
			showNext,
			shipping_method,
			shipping_options,
			page2,
			showPrev
		} = this.state;

		const address = {
			address_1,
			address_2,
			city,
			region,
			postal_code,
			country,
			shipping_region_id,
			shipping_method
		};
		const { regions } = this.props;

		return (
			<div className="checkout container">
        <div style={{ display: `${!page2 ? 'block' : 'none'}` }}>
          <Address
            shipping_options={shipping_options}
            onchange={this.onChange}
            address={address}
            regions={regions}
          />
        </div>

        <div style={{ display: `${page2 ? 'block' : 'none'}` }}>
          <h1>Page 2</h1>
        </div>
			
				<div className="btn-cont">
					<button onClick={this.onPrev} style={{ display: `${showPrev ? 'block' : 'none'}` }}>
						Prev{' '}
					</button>
					<button onClick={this.onNext} style={{ display: `${showNext ? 'block' : 'none'}` }}>
						Next >>{' '}
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	regions: state.customer.regions,
	profile: state.customer.profile,
	shippingOptions: state.shoppingCart.shippingOptions
});

export default connect(mapStateToProps, { getShipRegs, getProfile, getShippingOptions })(Checkout);
