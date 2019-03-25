import { 
  GET_TOTAL_AMOUNT, 
  ADD_PROD_IN_CART, 
  CLEAR_CART, 
  GET_SHIPPING_OPTIONS, 
  GET_TAXES, 
  GET_ORDERS, 
  PLACE_ORDER, 
  SET_TOTAL_TO_PAY
} from '../actions/types'

const initialState = {
  totalAmount: "0", //Total amount $ 
  qtyAllProd: 0,  //Quantity of products in Cart (bag)
  productsInCart: [], 
  shippingOptions: [], 
  taxes: [],
  orders: [], 
  placed_order: 0,
  totalToPay: 0
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

    case GET_SHIPPING_OPTIONS:
      return {
        ...state, 
        shippingOptions: action.payload
      }

    case GET_TAXES:
      return {
        ...state, 
        taxes: action.payload
      }
      
    case GET_ORDERS:
      return {
        ...state, 
        orders: action.payload
      }

    case PLACE_ORDER:
      return {
        ...state, 
        placed_order: action.payload
      }

    case SET_TOTAL_TO_PAY:
      return {
        ...state, 
        totalToPay: action.payload
      }
      
    default:
      return state
  }

}