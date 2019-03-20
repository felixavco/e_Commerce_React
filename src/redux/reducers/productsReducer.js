import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT,
	SEARCHING_PRODUCTS,
	GET_PRODUCT_REVIEWS,
  GET_DEPARMENTS,
  GET_CATEGORIES, 
	GET_PRODUCTS_IN_DEPARTMENT,
	GET_PRODUCTS_IN_CATEGORY,
	GET_CATEGORIES_IN_DEPARTMENT,
	SET_DEPT_ID, 
	SET_CAT_ID,
	GET_PROD_ATTR, 
	CLEAR_PRODUCT
} from '../actions/types';

const initialState = {
	allProducts: [],
	singleProduct: {},
	prod_attributes: [],
	totalProducts: 0,
	searchQuery: '',
	ProductReviews: [],
  deparments: [], 
	categories: {}, 
	deparment_id: 1,
	category_id: 1
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.payload.rows,
				totalProducts: action.payload.count
			};

		case GET_PRODUCTS_IN_DEPARTMENT:
			return {
				...state,
				allProducts: action.payload.rows,
				totalProducts: action.payload.count.count
			};

		case GET_PRODUCTS_IN_CATEGORY:
			return {
				...state,
				allProducts: action.payload.rows,
				totalProducts: action.payload.count
			};

		case SEARCHING_PRODUCTS:
			return {
				...state,
				searchQuery: action.payload
			};

		case GET_PRODUCT:
			return {
				...state,
				singleProduct: action.payload
			};

		case GET_PRODUCT_REVIEWS:
			return {
				...state,
				ProductReviews: action.payload
      };
      
    case GET_DEPARMENTS:
			return {
				...state,
				deparments: action.payload
      };
    
    case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload.rows
			};
			
    case GET_CATEGORIES_IN_DEPARTMENT:
			return {
				...state,
				categories: action.payload
			};
			
    case SET_DEPT_ID:
			return {
				...state,
				deparment_id: action.payload
			};
			
    case SET_CAT_ID:
			return {
				...state,
				category_id: action.payload
			};
			
    case GET_PROD_ATTR:
			return {
				...state,
				prod_attributes: action.payload
			};
			
    case CLEAR_PRODUCT:
			return {
				...state,
				singleProduct: action.payload, 
				prod_attributes: []
      };
      
		default:
			return state;
	}
};
