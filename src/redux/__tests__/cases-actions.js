import * as actionExports from '../cases-actions';
import { urls } from 'constants.js';

it('returns a getAllCases action', () => {
	const loginActionCreator = actionExports.getAllCases();
	expect(loginActionCreator.type).toEqual(actionExports.CASES_FETCH);
	expect(loginActionCreator.payload.length).toEqual(1);
	expect(loginActionCreator.payload[0]).toEqual(urls.getAllCases);
});
