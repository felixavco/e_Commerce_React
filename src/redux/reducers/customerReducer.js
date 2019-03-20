import { GET_PROFILE, GET_REGIONS } from '../actions/types';

const initialState = {
	profile: {},
	regions: []
};

export default (state = initialState, action) => {
	switch (action.type) {

		case GET_PROFILE:
			return {
				...state,
				profile: action.payload
			};

		case GET_REGIONS:
			return {
				...state,
				regions: action.payload
			};

		default:
			return state;
	}
};
