import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TestCard } from '../Card';

describe('DOM rendering', () => {
	it('renders Card', () => {
		shallow(<TestCard />);
	});

	it('DOM snapshot of Card', () => {
		const wrapper = shallow(<TestCard />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
