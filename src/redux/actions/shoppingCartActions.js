import axios from 'axios';
import { GET_ERRORS, GET_TOTAL_AMOUNT, ADD_PROD_IN_CART, CLEAR_CART } from './types';
import { baseURL } from '../../config/config';

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
export const addProdToChart = (prodId, attr = ' ') => (dispatch) => {
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

export const updateItemInCart = (itemId, qty) => dispatch => {
	 
	axios
		.put(baseURL + "/shoppingcart/update/" + itemId, {quantity: qty})
		.then(console.log("OK"))
		.catch(err => {
			dispatch({
				type: GET_ERRORS, 
				payload: "Error updating product"
			})
		})
}

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


