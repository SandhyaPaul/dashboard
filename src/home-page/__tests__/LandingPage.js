import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TestLandingPage, mapStateToProps, mapDispatchToProps } from '../LandingPage';

const noop = () => {};

describe('DOM rendering', () => {
	it('renders LandingPage without breaking', () => {
		shallow(<TestLandingPage getAllCases={noop} />);
	});

	it('DOM snapshot of LandingPage', () => {
		const wrapper = shallow(<TestLandingPage getAllCases={noop} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it('DOM snapshot passing all the values', () => {
		const wrapper = shallow(
			<TestLandingPage
				getAllCases={noop}
				username="Aftab Khan "
				loggedIn={true}
				history={[]}
				cases={[{ test: this, id: 1 }]}
			/>
		);
	});
});

describe('Behavior checks', () => {
	it('gives the right props from state', () => {
		const expectedProps = {
			loggedIn: true,
			username: 'Test',
			cases: []
		};
		expect(mapStateToProps({ app: { loggedIn: true, username: 'Test' }, cases: { caselist: [] } })).toEqual(
			expectedProps
		);
	});

	it('returns the right functions bound to dispatch', () => {
		const actions = mapDispatchToProps();
		expect(Object.keys(actions)).toEqual(['getAllCases']);
		expect(actions.getAllCases).toBeInstanceOf(Function);
	});

	it('Redirects to login page, if not loggedIn', () => {
		const historyMock = [];
		const wrapper = shallow(
			<TestLandingPage getAllCases={noop} username="Aftab Khan" loggedIn={false} history={historyMock} />
		);
		expect(historyMock.length).toEqual(1);
		expect(historyMock[0]).toEqual('/');
	});
});
