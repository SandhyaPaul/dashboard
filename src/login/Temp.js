import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { validateToken } from '../redux/app-actions';

class Temp extends React.PureComponent {
	componentWillMount() {
		const token = sessionStorage.getItem('my-access-token');
		const username = sessionStorage.getItem('my-username');
		if (token && username) {
			this.props.validateToken(token, username);
		} else {
			this.props.history.push('/login');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loggedIn === true) {
			this.props.history.push('/app');
		} else {
			this.props.history.push('/login');
		}
	}

	render() {
		return '';
	}
}

export { Temp as TestTemp };

const mapStateToProps = state => {
	return {
		loggedIn: state.app.loggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ validateToken }, dispatch);
};

export { mapStateToProps, mapDispatchToProps };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Temp));
