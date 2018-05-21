import { LOGIN, VALIDATE_TOKEN } from './app-actions';
import axios from 'axios';

const initialState = {
	error: false,
	loggedIn: false,
	firstName: '',
	lastName: ''
};

export { initialState };

export default function todos(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN + '_FULFILLED':
			const { first_name, last_name } = action.payload.data.result;
			if (action.payload.status === 200) {
				return { loggedIn: true, firstName: first_name, lastName: last_name, error: false };
			} else {
				return { loggedIn: false, error: true };
			}
		case LOGIN + '_REJECTED':
			return initialState;

		default:
			return state;
	}
}
