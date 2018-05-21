import axios from 'axios';

import { urls } from '../constants';

export const LOGIN = 'LOGIN';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';

export function login(userId, password) {
	return {
		type: LOGIN,
		payload: axios.post(urls.apiBaseUrl + 'login', {
			email: userId,
			password: password
		})
	};
}

export function validateToken(token, username) {
	return {
		type: VALIDATE_TOKEN,
		meta: { token, username },
		payload: axios.get(`${urls.validateToken}?token=${token}`)
	};
}
