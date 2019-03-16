import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import customerReducer from './customerReducer';
import productsReducer from './productsReducer';
import shoppingCartReducer from './shoppingCartReducer';


export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  products: productsReducer,
  customer: customerReducer,
  shoppingCart: shoppingCartReducer
})