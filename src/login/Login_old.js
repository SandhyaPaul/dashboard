import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { login } from '../redux/app-actions';

import './login.css';

class Login extends React.PureComponent {
	state = {
		userId: '',
		password: ''
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.loggedIn === true) {
			this.props.history.push('/app');
		}
	}

	updateValues = evt => {
		const types = {
			text: 'userId',
			password: 'password'
		};
		let toUpdate = types[evt.currentTarget.type]; //if text, then username, if type password,the psw
		this.setState({ [toUpdate]: evt.currentTarget.value });
	};

	doLogin = () => {
		let { userId, password } = this.state;
		this.props.login(userId, password);
	};

	render() {
		return (
			<div className="login-container">
				<div className="login-form">
					<div className="header-label">Login</div>
					<div className="boxed-form">
						<label>Username</label>
						<input name="UserId" onChange={this.updateValues} />
					</div>
					<div className="boxed-form">
						<label>Password</label>
						<input name="Password" type="password" onChange={this.updateValues} />
					</div>
					<div className="flex-display-normal">
						<button className="submit-btn" onClick={this.doLogin}>
							Login
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export { Login as TestLogin };

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ login }, dispatch);
};

const mapStateToProps = state => {
	return {
		loggedIn: state.app.loggedIn
	};
};

export { mapDispatchToProps, mapStateToProps };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
