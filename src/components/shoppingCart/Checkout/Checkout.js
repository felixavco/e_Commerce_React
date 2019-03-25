import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getShipRegs, getProfile } from '../../../redux/actions/customerActions';
import { getShippingOptions } from '../../../redux/actions/shoppingCartActions';

import Address from './Address';
import PlaceOrder from './PlaceOrder';

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

		if(this.props.totalAmount === null || this.props.totalAmount === 0) {
			this.props.history.push("/my-bag")
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
					<h5 className="center-align">Shipping Address</h5>
          <Address
            shipping_options={shipping_options}
            onchange={this.onChange}
            address={address}
            regions={regions}
          />
        </div>

        <div style={{ display: `${page2 ? 'block' : 'none'}` }}>
          <PlaceOrder shipping_id={shipping_method} />
        </div>
			
				<div className="btn-l">
					<button onClick={this.onPrev} style={{ display: `${showPrev ? 'block' : 'none'}` }}>
					<i className="fas fa-chevron-left" /> Prev
					</button>
				</div>

				<div className="btn-r">
					<button onClick={this.onNext} style={{ display: `${showNext ? 'block' : 'none'}`}}>
						Next <i className="fas fa-chevron-right" />
					</button>
				</div>
			</div>
		);
	}
}

Checkout.propTypes = { 
	auth: PropTypes.object.isRequired, 
	regions: PropTypes.array.isRequired, 
	shippingOptions: PropTypes.array.isRequired, 
	profile: PropTypes.object.isRequired, 
	totalAmount: PropTypes.string.isRequired, 
	getShipRegs: PropTypes.func.isRequired, 
	getProfile: PropTypes.func.isRequired, 
	getShippingOptions: PropTypes.func.isRequired, 
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	regions: state.customer.regions,
	profile: state.customer.profile,
	shippingOptions: state.shoppingCart.shippingOptions, 
	totalAmount: state.shoppingCart.totalAmount
});

export default connect(mapStateToProps, { getShipRegs, getProfile, getShippingOptions })(withRouter(Checkout));
