import { CASES_FETCH } from './cases-actions';

const initialState = {
	caselist: []
};

export { initialState };

export default function cases(state = initialState, action = {}) {
	switch (action.type) {
		case CASES_FETCH + '_FULFILLED':
			return { ...state, caselist: action.payload.data.cases };
		case CASES_FETCH + '_REJECTED':
			return { ...state, caselist: [] };
		default:
			return state;
	}
}
