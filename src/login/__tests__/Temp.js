import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TestTemp, mapDispatchToProps, mapStateToProps } from '../Temp';

describe('DOM rendering', () => {
	it('renders LandingPage without breaking', () => {
		shallow(<TestTemp history={[]} />);
	});

	it('DOM snapshot of LandingPage', () => {
		const wrapper = shallow(<TestTemp history={[]} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});

describe('Behavior checks', () => {
	it('redux actions', () => {
		let actions = mapDispatchToProps();
		expect(Object.keys(actions)).toEqual(['validateToken']);
		expect(actions.validateToken).toBeInstanceOf(Function);
	});
	it('gives the right props from state', () => {
		const expectedProps = {
			loggedIn: true
		};
		expect(mapStateToProps({ app: { loggedIn: true } })).toEqual(expectedProps);
	});
	it('goes to login page if nothing found in the storage', () => {
		const history = [];
		const wrapper = shallow(<TestTemp history={history} />);
		expect(history).toEqual(['/login']);
	});
	it('goes to login page if validateToken returned isLoggedIn as false', () => {
		const history = [];
		const validateFn = jest.fn();
		sessionStorage.setItem('my-access-token', 'weird token');
		sessionStorage.setItem('my-username', 'darthvader');
		const wrapper = shallow(<TestTemp history={history} validateToken={validateFn} />);
		expect(validateFn.mock.calls.length).toEqual(1);
		expect(validateFn.mock.calls[0]).toEqual(['weird token', 'darthvader']);
		wrapper.setProps({ loggedIn: false });
		expect(history).toEqual(['/login']);
	});
	it('goes to login page if validateToken returned isLoggedIn as true', () => {
		const history = [];
		const validateFn = jest.fn();
		sessionStorage.setItem('my-access-token', 'weird token');
		sessionStorage.setItem('my-username', 'darthvader');
		const wrapper = shallow(<TestTemp history={history} validateToken={validateFn} />);
		expect(validateFn.mock.calls.length).toEqual(1);
		expect(validateFn.mock.calls[0]).toEqual(['weird token', 'darthvader']);
		wrapper.setProps({ loggedIn: true });
		expect(history).toEqual(['/app']);
	});
});
