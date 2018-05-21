import axios from 'axios';

import { urls } from '../constants';

export const CASES_FETCH = 'CASES_FETCH';

export function getAllCases() {
	return {
		type: CASES_FETCH,
		payload: axios.get(urls.getAllCases)
	};
}
