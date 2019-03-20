import { 
  GET_TOTAL_AMOUNT, 
  ADD_PROD_IN_CART, 
  CLEAR_CART
} from '../actions/types'

const initialState = {
  totalAmount: 0,
  qtyAllProd: 0, 
  productsInCart: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_TOTAL_AMOUNT:
      return {
        ...state, 
        totalAmount: action.payload
      }

    case ADD_PROD_IN_CART:
      let total = 0;
      action.payload.forEach(item => total += item.quantity);
      return {
        ...state, 
        qtyAllProd: total,
        productsInCart: action.payload
      }

    case CLEAR_CART:
      return {
        ...state, 
        qtyAllProd: 0,
        totalAmount: 0,
        productsInCart: action.payload
      }
      
    default:
      return state
  }

}