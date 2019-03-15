import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import { baseURL } from '../../config/config';

//Register new user or Login Existing user
export const authUser = (userData, history, isLogin = false) => (dispatch) => {

  let url = "/customers"

  if(isLogin) {
    url += "/login" ;
  }

  axios.post(baseURL + url, userData)
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
      //Redirect user to homepage
      history.push('/');
      
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      });
	  });
};

//Set logged user
export const setCurrentUser = (userData) => {
	return {
		type: SET_CURRENT_USER,
		payload: userData
	};
};

//Logout user
export const logoutUser = () => (dispatch) => {
	//remove token from local storage
	localStorage.removeItem('jwtToken');
	//remove Auth header for future request
	setAuthToken(false);
	// Set current user to {} this will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
