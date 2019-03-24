import { SET_CURRENT_USER, SET_AUTH_MODAL } from '../actions/types';
import isEmpty from '../../utils/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {}, 
	modal_state: "" //Defines if the Auth modal shows the Login or Register form
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};

		case SET_AUTH_MODAL:
			return {
				...state,
				modal_state: action.payload
			};

		default:
			return state;
	}
};
