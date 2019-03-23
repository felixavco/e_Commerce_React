import axios from 'axios';
import {
	GET_ERRORS,
	GET_TOTAL_AMOUNT,
	ADD_PROD_IN_CART,
	CLEAR_CART,
	GET_SHIPPING_OPTIONS,
	GET_TAXES,
	GET_ORDERS,
	PLACE_ORDER,
	SET_TOTAL_TO_PAY
} from './types';
import { baseURL, stripe_public_token } from '../../config/config';

//Get a unique Cart ID if there is no Cart id in localstorage
export const getCartId = () => (dispatch) => {
	const url = baseURL + '/shoppingcart/generateUniqueId';
	axios
		.get(url)
		.then((res) => {
			const cartId = res.data.cart_id;
			localStorage.setItem('turingShoppingCart', cartId);
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Profile Error'
			});
		});
};

//Add Product to Cart (Bag)
export const addProdToChart = (prodId, attr) => (dispatch) => {
	const cartId = localStorage.turingShoppingCart;
	const data = {
		cart_id: cartId,
		product_id: prodId,
		attributes: attr
	};

	axios
		.post(baseURL + '/shoppingcart/add', data)
		.then((res) => {
			dispatch({
				type: ADD_PROD_IN_CART,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error adding Product to cart'
			});
		});
};

export const updateItemInCart = (itemId, qty, callback) => (dispatch) => {
	axios.put(baseURL + '/shoppingcart/update/' + itemId, { quantity: qty }).then(() => callback()).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: 'Error updating product'
		});
	});
};

export const removeItemInCart = (itemId, callback) => (dispatch) => {
	axios.delete(baseURL + '/shoppingcart/removeProduct/' + itemId).then(() => callback()).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: 'Error removing Item from Cart'
		});
	});
};

export const getShippingOptions = (shipping_region_id) => (dispatch) => {
	axios
		.get(baseURL + '/shipping/regions/' + shipping_region_id)
		.then((res) => {
			dispatch({
				type: GET_SHIPPING_OPTIONS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error feching shipping options'
			});
		});
};

export const getTotalAmount = () => (dispatch) => {
	const cartId = localStorage.turingShoppingCart;
	const url = baseURL + '/shoppingcart/totalAmount/' + cartId;
	axios
		.get(url)
		.then((res) => {
			dispatch({
				type: GET_TOTAL_AMOUNT,
				payload: res.data.total_amount
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error getting Amount'
			});
		});
};

//Get all Products in cart
export const getProdInCart = () => (dispatch) => {
	const cartId = localStorage.turingShoppingCart;
	const url = baseURL + '/shoppingcart/' + cartId;
	axios
		.get(url)
		.then((res) => {
			dispatch({
				type: ADD_PROD_IN_CART,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error Products in cart'
			});
		});
};

export const clearCart = () => (dispatch) => {
	const cartId = localStorage.turingShoppingCart;
	axios
		.delete(baseURL + '/shoppingcart/empty/' + cartId)
		.then((res) => {
			dispatch({
				type: CLEAR_CART,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'ERROR clearing cart'
			});
		});
};

export const getTaxes = () => (dispatch) => {
	axios
		.get(baseURL + '/tax')
		.then((res) => {
			dispatch({
				type: GET_TAXES,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error feching taxes'
			});
		});
};

export const placeOrder = (data) => (dispatch) => {
	const token = localStorage.jwtToken;
	const headers = {
		headers: { 'user-key': token }
	};
	axios
		.post(baseURL + '/orders', data, headers)
		.then((res) => {
			dispatch({
				type: PLACE_ORDER,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.data
			});
		});
};

export const getOrders = () => (dispatch) => {
	const token = localStorage.jwtToken;
	const headers = {
		headers: { 'user-key': token }
	};

	axios
		.get(baseURL + '/orders/inCustomer', headers)
		.then((res) => {
			dispatch({
				type: GET_ORDERS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.data
			});
		});
};

export const stripeCharge = (data, callback) => dispatch => {
	data.stripeToken = stripe_public_token;
	axios
		.post(baseURL + "/stripe/charge", data)
		.then(() => callback())
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data.error.message
			})
		})
}

export const setTotalToPay = amount => dispatch => {
	dispatch({
		type: SET_TOTAL_TO_PAY, 
		payload: amount
	})
} 
