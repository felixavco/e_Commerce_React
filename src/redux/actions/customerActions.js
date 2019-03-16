import axios from 'axios';
import { GET_ERRORS, GET_PROFILE } from './types';
import { baseURL } from '../../config/config';

export const getProfile = () => dispatch => {
  const token = localStorage.jwtToken; 
  const url = baseURL + "/customer";
  axios.get(url, { headers : { 'user-key': token }})
    .then(res => {
      dispatch({
        type: GET_PROFILE, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "Profile Error"
      })
    })

}
