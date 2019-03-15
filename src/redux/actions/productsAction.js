import axios from 'axios';
import { GET_ERRORS, GET_ALL_PRODUCTS } from './types';
import { baseURL } from '../../config/config';

export const getProducts = ({page, limit, descLen}) => (dispatch) => {
  axios
    .get(`${baseURL}/products/?page=${page}&limit=${limit}&description_length=${descLen}`)
    .then(res => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "ERROR"
      })
    })
};