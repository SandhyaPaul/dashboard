import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//Mock storage
function mockStorages() {
	let store = {};
	return {
		getItem: function(key) {
			return store[key] || null;
		},
		setItem: function(key, value) {
			store[key] = value.toString();
		},
		removeItem: function(key) {
			delete store[key];
		},
		clear: function() {
			store = {};
		}
	};
}

let localStorageMock = mockStorages();
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

let sessionStorageMock = mockStorages();
Object.defineProperty(window, 'sessionStorage', {
	value: sessionStorageMock
});

//Mock out axios
const axios = require('axios');
const axiosMock = (...args) => {
	const toReturn = Array.from(args);
	toReturn.__axiosMock = true;
	return toReturn;
};
axios.post = jest.fn(axiosMock);
axios.get = jest.fn(axiosMock);
axios.put = jest.fn(axiosMock);
axios.delete = jest.fn(axiosMock);
