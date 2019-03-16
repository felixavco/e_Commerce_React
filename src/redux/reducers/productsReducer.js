import { 
  GET_ALL_PRODUCTS, 
  GET_PRODUCT, 
  SEARCHING_PRODUCTS, 
  GET_PRODUCT_REVIEWS
} from '../actions/types'

const initialState = {
  allProducts: {},
  singleProduct: {},
  totalProducts: 0, 
  searchQuery: "",
  ProductReviews: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.rows,
        totalProducts: action.payload.count
      }

    case SEARCHING_PRODUCTS:
      return {
        ...state,
        searchQuery: action.payload,
      }
    
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload
      }
    
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        ProductReviews: action.payload
      }
  
    default:
      return state
  }
}