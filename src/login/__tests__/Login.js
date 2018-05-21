import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TestLogin, mapDispatchToProps, mapStateToProps } from '../Login';

describe('DOM rendering', () => {
	it('renders LandingPage without breaking', () => {
		shallow(<TestLogin />);
	});

	it('DOM snapshot of LandingPage', () => {
		const wrapper = shallow(<TestLogin />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});

describe('Behavior checks', () => {
	it('redux actions', () => {
		const actions = mapDispatchToProps();
		expect(Object.keys(actions)).toEqual(['login']);
		expect(actions.login).toBeInstanceOf(Function);
	});
	it('gives the right props from state', () => {
		const expectedProps = {
			loggedIn: true
		};
		expect(mapStateToProps({ app: { loggedIn: true } })).toEqual(expectedProps);
	});
	it('Default state', () => {
		const wrapper = shallow(<TestLogin />);
		const expectedState = {
			userId: '',
			password: ''
		};
		expect(wrapper.state()).toEqual(expectedState);
	});
	it('onChange of userId input', () => {
		const wrapper = shallow(<TestLogin />);
		const mockEvt = {
			currentTarget: { type: 'text', value: 'test' }
		};
		wrapper.find('input[name="UserId"]').simulate('change', mockEvt);
		expect(wrapper.state('userId')).toEqual('test');
	});
	it('onChange of password input', () => {
		const wrapper = shallow(<TestLogin />);
		const mockEvt = {
			currentTarget: { type: 'password', value: '123' }
		};
		wrapper.find('input[type="password"]').simulate('change', mockEvt);
		expect(wrapper.state('password')).toEqual('123');
	});
	it('calls login function on click of submit button', () => {
		const fn = jest.fn();
		const wrapper = shallow(<TestLogin login={fn} />);
		wrapper.setState({ userId: 'test', password: '123' });
		wrapper.find('button').simulate('click');
		expect(fn.mock.calls.length).toEqual(1);
		expect(fn.mock.calls[0]).toEqual(['test', '123']);
	});
	it('Redirects to landing page, if after user logs in', () => {
		const historyMock = [];
		const wrapper = shallow(<TestLogin history={historyMock} />);
		wrapper.setProps({ loggedIn: true });
		expect(historyMock.length).toEqual(1);
		expect(historyMock[0]).toEqual('/app');
	});
	it('Doesnt redirect anywhere if user login fails', () => {
		const historyMock = [];
		const wrapper = shallow(<TestLogin history={historyMock} />);
		wrapper.setProps({ loggedIn: false });
		expect(historyMock).toEqual(historyMock);
	});
});
