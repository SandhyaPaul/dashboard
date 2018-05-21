import * as actionExports from '../app-actions';
import { urls } from 'constants.js';
import md5 from 'md5';

it('returns a login action', () => {
	const loginActionCreator = actionExports.login('test', 'test');
	expect(loginActionCreator.type).toEqual(actionExports.LOGIN);
	expect(loginActionCreator.payload.length).toEqual(2);
	expect(loginActionCreator.payload[0]).toEqual(urls.login);
	expect(loginActionCreator.payload[1]).toEqual({ userId: 'test', password: md5('test') });
});

it('returns a login action', () => {
	const loginActionCreator = actionExports.validateToken('test', 'test');
	expect(loginActionCreator.type).toEqual(actionExports.VALIDATE_TOKEN);
	expect(loginActionCreator.payload.length).toEqual(1);
	expect(loginActionCreator.payload[0]).toEqual(`${urls.validateToken}?token=test`);
});
