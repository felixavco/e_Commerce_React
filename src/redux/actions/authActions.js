import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, SET_AUTH_MODAL } from './types';
import { baseURL } from '../../config/config';

/**
 * Method: POST
 * Protected: false
 * Desc: Register or Signin user
 */
export const authUser = (userData, isLogin, callback ) => (dispatch) => {
	let url = '/customers';

	if (isLogin) {
		url += '/login';
	}

	axios
		.post(baseURL + url, userData)
		.then((res) => {
			//Save to Local Storage
			const { accessToken } = res.data;
			localStorage.setItem('jwtToken', accessToken);
			//Set token to Auth header, new request will include the token
			setAuthToken(accessToken);
			//Decode token to get user Data
			const decodedUser = jwt_decode(accessToken);
			//Set Current user
      dispatch(setCurrentUser(decodedUser));
      //Closes the modal
      callback()
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data.error
			});
    });
};

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets the user information in the redux store
 */
export const setCurrentUser = (userData) => {
	return {
		type: SET_CURRENT_USER,
		payload: userData
	};
};

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Log out user and remove token from local storage
*/
export const logoutUser = () => (dispatch) => {
	//remove token from local storage
	localStorage.removeItem('jwtToken');
	//remove Auth header for future request
	setAuthToken(false);
	// Set current user to {} this will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets "login" or "register" to open the modal with the select form to login or register
*/
export const setAuthModal = (value) => (dispatch) => {
	dispatch({
		type: SET_AUTH_MODAL,
		payload: value
	});
};
