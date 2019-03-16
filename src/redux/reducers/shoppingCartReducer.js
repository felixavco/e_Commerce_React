import { 
  GET_TOTAL_AMOUNT, 
  GET_PROD_IN_CART
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

    case GET_PROD_IN_CART:
      let total = 0;
      action.payload.forEach(item => total += item.quantity);
      return {
        ...state, 
        qtyAllProd: total,
        productsInCart: action.payload
      }
      
    default:
      return state
  }

}