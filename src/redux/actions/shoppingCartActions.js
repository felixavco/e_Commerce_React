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
import { baseURL } from '../../config/config';

/**
 * Method: GET
 * Protected: false
 * Desc: Gets a unique Cart ID and store the id in Local Storage as 'turingShoppingCart'
 */
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

/**
 * Method: POST
 * Protected: false
 * Desc: Adds Product to cart (bag)
 */export const addProdToChart = (prodId, attr) => (dispatch) => {
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

/**
 * Method: PUT
 * Protected: false
 * Desc: Update single product in cart 
 */
export const updateItemInCart = (itemId, qty, callback) => (dispatch) => {
	axios
	.put(baseURL + '/shoppingcart/update/' + itemId, { quantity: qty })
	.then(() => callback())
	.catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: 'Error updating product'
		});
	});
};

/**
 * Method: DELETE
 * Protected: false
 * Desc: Removes a product from cart
 */
export const removeItemInCart = (itemId, callback) => (dispatch) => {
	axios
		.delete(baseURL + '/shoppingcart/removeProduct/' + itemId)
		.then(() => callback())
		.catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: 'Error removing Item from Cart'
		});
	});
};

/**
 * Method: GET
 * Protected: false
 * Desc: Gets an array with the shipping options and price
 */
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

/**
 * Method: GET
 * Protected: false
 * Desc: Gets the Total of the sum of all products
 */
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

/**
 * Method: GET
 * Protected: false
 * Desc: Rerturns an array with all the products in Cart
 */
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

/**
 * Method: delete
 * Protected: false
 * Desc: Deletes all the products in Cart
 */
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

/**
 * Method: GET
 * Protected: false
 * Desc: Returns an array with Tax options
 */
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

/**
 * Method: POST
 * Protected: true
 * Desc: Saves the Order and Clears cart
 */
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
				payload: res.data.orderId
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.data
			});
		});
};

/**
 * Method: GET
 * Protected: true
 * Desc: Returns an array with all the orders made by a user 
 */
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

/**
 * Method: POST 
 * Protected: false
 * Desc: Performs the payment through stripe
 */
export const stripeCharge = (data) => dispatch => {
	axios
		.post(baseURL + "/stripe/charge", data)
		.then(() => console.log("Payment Successfuly"))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data.error.message
			})
		})
}

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets the total to pay in the store to be used in the payment page
 */
export const setTotalToPay = amount => dispatch => {
	dispatch({
		type: SET_TOTAL_TO_PAY, 
		payload: amount
	})
} 
