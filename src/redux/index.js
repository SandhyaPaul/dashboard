import { combineReducers } from 'redux';
import app from './app-reducer';
import cases from './cases-reducer';

const rootReducer = combineReducers({
	app,
	cases
});

export default rootReducer;
