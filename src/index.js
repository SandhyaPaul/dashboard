import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './redux';
import Routes from './Routes';
import './styles.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware()));

export { store };

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Routes />
		</HashRouter>
	</Provider>,
	document.getElementById('root') || document.createElement('div') //For testcases
);
registerServiceWorker();
