import reducer, { initialState } from '../cases-reducer';
import { CASES_FETCH } from '../cases-actions';

it('returns initial state if invoked with nothing', () => {
	expect(reducer()).toEqual(initialState);
});

it('returns initial state for cases_fetch_rejected action', () => {
	expect(reducer({}, { type: `${CASES_FETCH}_REJECTED` })).toEqual(initialState);
});

it('returns completely new state for cases_fetch_rejected action', () => {
	const newState = {
		caselist: [{ this: 'is a test' }]
	};
	const action = {
		type: `${CASES_FETCH}_FULFILLED`,
		payload: {
			data: {
				cases: [{ this: 'is a test' }]
			}
		}
	};
	expect(reducer({}, action)).toEqual(newState);
});
