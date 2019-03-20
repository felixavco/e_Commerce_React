import axios from 'axios';
import { GET_ERRORS, GET_PROFILE, GET_REGIONS } from './types';
import { baseURL } from '../../config/config';

/**
 * Method: GET
 * Protected: true
 * Desc: sets users profile on redux store
 */
export const getProfile = () => (dispatch) => {
	const token = localStorage.jwtToken;
	const url = baseURL + '/customer';
	axios
		.get(url, { headers: { 'user-key': token } })
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Profile Error'
			});
    });
};

/**
 * Method: PUT
 * Protected: true
 * Desc: Update user's profile Basic info,
 */
export const updateProfile = (data) => (dispatch) => {
	const token = localStorage.jwtToken;
	const url = baseURL + '/customer';
	axios
		.put(url, data, { headers: { 'user-key': token } })
		.then(() => console.log('OK'))
		.catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data.error
		});
	});
};

/**
 * Method: PUT
 * Protected: true
 * Desc: Update customer's Address,
 */
export const updateAddress = (data) => (dispatch) => {
	const token = localStorage.jwtToken;
	const url = baseURL + '/customers/address';
	axios
		.put(url, data, { headers: { 'user-key': token } })
		.then(() => console.log('OK'))
		.catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data.error
		});
	});
};

/**
 * Method: PUT
 * Protected: true
 * Desc: Update user's credit card,
 */
export const updateCreditCard = (creditCard) => (dispatch) => {
	const token = localStorage.jwtToken;
	const url = baseURL + '/customers/creditCard';
	axios.put(url, creditCard, { headers: { 'user-key': token } }).then(() => console.log('OK')).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data.error
		});
	});
};

/**
 * Method: GET
 * Protected: false
 * Desc: return all Shipping regions
 */
export const getShipRegs = () => (dispatch) => {
	const url = baseURL + '/shipping/regions';
	axios
		.get(url)
		.then((res) => {
			dispatch({
				type: GET_REGIONS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error getting regions'
			});
		});
};

/**
 * Method: GET
 * Protected: false
 * Desc: return single shipping region
 */
export const getSingleShipReg = (shipRegId) => (dispatch) => {
	const url = baseURL + '/shipping/regions' + shipRegId;
	axios
		.get(url)
		.then((res) => {
			dispatch({
				type: GET_REGIONS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error getting regions'
			});
		});
};
