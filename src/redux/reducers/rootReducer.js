import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productsReducer from './productsReducer';


export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  products: productsReducer
})