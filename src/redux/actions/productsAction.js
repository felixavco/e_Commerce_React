import axios from 'axios';
import { 
  GET_ERRORS, 
  GET_ALL_PRODUCTS, 
  SEARCHING_PRODUCTS, 
  GET_PRODUCT, 
  GET_PRODUCT_REVIEWS
} from './types';
import { baseURL } from '../../config/config';

export const getProducts = ({page, limit, descLen, search = false, query = ""}) => (dispatch) => {
  let url = `${baseURL}/products/?page=${page}&limit=${limit}&description_length=${descLen}`;

  if(search) {
    url = `${baseURL}/products/search/?query_string=${query}&page=${page}&limit=${limit}&description_length=${descLen}`;
  }

  axios.get(url)
    .then(res => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "an error occurred while fetching products"
      })
    })
};

//Search Products
export const searchingProduct = (search) => (dispatch) => {
  dispatch({
    type: SEARCHING_PRODUCTS,
    payload: search
  })
}

//Load Single Product 
export const getSingleProduct = id => dispatch => {
  axios.get(`${baseURL}/products/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "Product Not fround"
      })
    })

}

export const getProductReviews = id => dispatch => {
  axios.get(`${baseURL}/products/${id}/reviews`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT_REVIEWS, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "Error loading Reviews"
      })
    })
}