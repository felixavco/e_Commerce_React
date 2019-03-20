import axios from 'axios';
import {
	GET_ERRORS,
	SET_DEPT_ID,
	GET_ALL_PRODUCTS,
	SEARCHING_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCT_REVIEWS,
  GET_DEPARMENTS, 
  GET_CATEGORIES,  
	GET_PRODUCTS_IN_DEPARTMENT, 
	GET_CATEGORIES_IN_DEPARTMENT, 
	GET_PRODUCTS_IN_CATEGORY,
	SET_CAT_ID, 
	GET_PROD_ATTR,
	CLEAR_PRODUCT

} from './types';
import { baseURL } from '../../config/config';

/**
 * Method: GET
 * Protected: False
 * Desc: Returns Array of products depending on the limit (items per page)
 */
export const getProducts = ({ page, limit, descLen }) => (dispatch) => {
	let url = `${baseURL}/products/?page=${page}&limit=${limit}&description_length=${descLen}`;

	axios
		.get(url)
		.then((res) => {
			dispatch({
				type: GET_ALL_PRODUCTS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'an error occurred while fetching products'
			});
		});
};

/**
 * Method: GET
 * Protected: False
 * Desc: Returns array of products in a Department 
 */
export const getProductsInDept = (deptId, { page, limit, descLen }) => dispatch => {
  axios
    .get(`${baseURL}/products/inDepartment/${deptId}/?page=${page}&limit=${limit}&description_length=${descLen}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS_IN_DEPARTMENT, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "error: Fechching Products in Department"
      })
    })
}

/**
 * Method: GET
 * Protected: False
 * Desc: Returns array of products in a category
 */
export const getProductsinCat = (CatId, { page, limit, descLen }) => dispatch => {
  axios
    .get(`${baseURL}/products/inCategory/${CatId}/?page=${page}&limit=${limit}&description_length=${descLen}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS_IN_CATEGORY, 
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS, 
        payload: "error: Fechching Products in Department"
      })
    })
}

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets the search query in the state (store)
 */
export const searchingProduct = (search) => (dispatch) => {
	dispatch({
		type: SEARCHING_PRODUCTS,
		payload: search
	});
};

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets the Department ID in the store to be used on Deparment component
 */
export const setDeptId = (deptId) => (dispatch) => {
	dispatch({
		type: SET_DEPT_ID,
		payload: deptId
	});
};

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Sets the Category ID in the store to be used on Category component
 */
export const setCatId = (catId) => (dispatch) => {
	dispatch({
		type: SET_CAT_ID,
		payload: catId
	});
};

/**
 * Method: GET
 * Protected: False
 * Desc: Returns a single product base on Product ID 
 */
export const getSingleProduct = (id) => (dispatch) => {
	axios
		.get(`${baseURL}/products/${id}`)
		.then((res) => {
			dispatch({
				type: GET_PRODUCT,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Product Not fround'
			});
		});
};

/**
 * Method: GET
 * Protected: False
 * Desc: Returns a an array of attributes of a product 
 */
export const getProdAttr = (id) => (dispatch) => {
	axios
		.get(baseURL + "/attributes/inProduct/" + id)
		.then(res => {
			dispatch({
				type: GET_PROD_ATTR,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS, 
				payload: "Error getting Attributes"
			})
		})
}

/**
 * Method: N/A
 * Protected: N/A
 * Desc: Clears the single product in the store (state)
 */
export const clearSingleProduct = () => (dispatch) => {
	dispatch({
		type: CLEAR_PRODUCT,
		payload: {}
	});
};

/**
 * Method: GET
 * Protected: False
 * Desc: returns an array with the reviews of a Product
 */
export const getProductReviews = (id) => (dispatch) => {
	axios
		.get(`${baseURL}/products/${id}/reviews`)
		.then((res) => {
			dispatch({
				type: GET_PRODUCT_REVIEWS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error loading Reviews'
			});
		});
};

/**
 * Method: GET
 * Protected: False
 * Desc: Returns an array with the available deparments
 */
export const getDeparments = () => (dispatch) => {
	axios
		.get(baseURL + '/departments')
    .then((res) => {
			dispatch({
				type: GET_DEPARMENTS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: 'Error Loading Deparments'
			});
		});
};

/**
 * Method: GET
 * Protected: False
 * Desc: Returns an array with the available categories
 */
 export const getCategories = () => dispatch => {
   axios
    .get(baseURL + "/categories")
    .then(res => {
      dispatch({
        type: GET_CATEGORIES, 
        payload: res.data
      })
    })
    .catch(err => { 
      dispatch({
        type: GET_ERRORS, 
        payload: "Error loading categories"
      })
    })
 }

 /**
 * Method: GET
 * Protected: False
 * Desc: Returns an array with the category in a selected department based on department ID
 */
export const getCategoriesInDept = (deptId) => dispatch => {
  axios
   .get(baseURL + "/categories/inDepartment/" + deptId)
   .then(res => {
     dispatch({
       type: GET_CATEGORIES_IN_DEPARTMENT, 
       payload: res.data
     })
   })
   .catch(err => { 
     dispatch({
       type: GET_ERRORS, 
       payload: "Error loading categories"
     })
   })
}


