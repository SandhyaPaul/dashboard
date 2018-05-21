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
			<div className="login-container-new">
				<div className="login-left-column">
					<img src="Dashboard.png" className="dashboard-image" />
					<div className="copyright-text">© Copyright 2018, News technolody rights reserved.</div>
				</div>
				<div className="login-right-column">
					<div className="login-container">
						<div className="login-form">
							{/*<div className="header-label">Login</div>*/}
							<label>Username</label>
							<div className="boxed-form">
								<input name="UserId" onChange={this.updateValues} />
							</div>
							<label>Password</label>
							<div className="boxed-form">
								<input name="Password" type="password" onChange={this.updateValues} />
							</div>
							{this.props.error ? <p className="login-error">Invalid credentials</p> : null}
							<div className="flex-display-normal">
								<button className="btn btn-block submit-btn" onClick={this.doLogin}>
									Sign In
								</button>
							</div>
						</div>
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
		loggedIn: state.app.loggedIn,
		error: state.app.error
	};
};

export { mapDispatchToProps, mapStateToProps };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
