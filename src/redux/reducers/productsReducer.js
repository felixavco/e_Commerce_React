import { GET_ALL_PRODUCTS, GET_PRODUCT } from '../actions/types'

const initialState = {
  allProducts: {},
  singleProduct: {},
  totalProducts: 0
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.rows,
        totalProducts: action.payload.count
      }
    
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload
      }
  
    default:
      return state
  }
}