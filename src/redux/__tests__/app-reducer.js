import reducer, { initialState } from '../app-reducer';
import { LOGIN, VALIDATE_TOKEN } from '../app-actions';

it('returns initial state if invoked with nothing', () => {
	expect(reducer()).toEqual(initialState);
});

it('returns initial state for login_rejected action', () => {
	expect(reducer({}, { type: `${LOGIN}_REJECTED` })).toEqual(initialState);
	expect(sessionStorage.getItem('my-access-token')).toEqual(null);
	expect(sessionStorage.getItem('my-username')).toEqual(null);
});

it('returns completely new state for login_successful action', () => {
	const newState = {
		loggedIn: true,
		userToken: 'test',
		username: 'devil'
	};
	const action = {
		type: `${LOGIN}_FULFILLED`,
		payload: {
			data: {
				token: 'test',
				username: 'devil'
			}
		}
	};
	expect(reducer({}, action)).toEqual(newState);
	expect(sessionStorage.getItem('my-access-token')).toEqual('test');
	expect(sessionStorage.getItem('my-username')).toEqual('devil');
});

it('returns initial state for validateToken_rejected action', () => {
	expect(reducer({}, { type: `${VALIDATE_TOKEN}_REJECTED` })).toEqual(initialState);
	expect(sessionStorage.getItem('my-access-token')).toEqual(null);
	expect(sessionStorage.getItem('my-username')).toEqual(null);
});

it('returns completely new state for validateToken_successful with isValid=true action', () => {
	const newState = {
		loggedIn: true,
		userToken: 'test',
		username: 'devil'
	};
	const action = {
		type: `${VALIDATE_TOKEN}_FULFILLED`,
		meta: {
			token: 'test',
			username: 'devil'
		},
		payload: {
			data: { isValid: true }
		}
	};
	expect(reducer({}, action)).toEqual(newState);
	expect(sessionStorage.getItem('my-access-token')).toEqual('test');
	expect(sessionStorage.getItem('my-username')).toEqual('devil');
});
it('returns completely new state for validateToken_successful with isValid=false action', () => {
	const action = {
		type: `${VALIDATE_TOKEN}_FULFILLED`,
		payload: {
			data: { isValid: false }
		}
	};
	expect(reducer({}, action)).toEqual(initialState);
	expect(sessionStorage.getItem('my-access-token')).toEqual(null);
	expect(sessionStorage.getItem('my-username')).toEqual(null);
});
