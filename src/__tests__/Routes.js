import React from 'react';
import { shallow } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import Routes from '../Routes';

it('renders button without breaking', () => {
	shallow(<Routes />);
});

it('DOM snapshot of Routes', () => {
	const wrapper = shallow(<Routes />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
