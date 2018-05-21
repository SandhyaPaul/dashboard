import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Temp from './login/Temp';
import Login from './login/Login';
import LandingPage from './home-page/LandingPage';

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Temp} />
		<Route path="/login" component={Login} />
		<Route path="/app" component={LandingPage} />
	</Switch>
);

export default Routes;
