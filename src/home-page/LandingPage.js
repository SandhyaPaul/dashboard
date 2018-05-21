import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Card from './Card';
import './landing-page.css';
import { getAllCases } from '../redux/cases-actions';
import headerLogo from '../assets/Logo.png';

const getInitials = (fname, lname) => {
	if (!fname && !lname) return '';
	/*return name
		.split(' ')
		.map(a => (a[0] || '').toUpperCase())
		.join('');*/
	return fname.charAt(0) + lname.charAt(0);
};

const showAlert = () => {
	alert('Done');
};

class LandingPage extends React.PureComponent {
	static defaultProps = {
		cases: []
	};

	componentWillMount() {
		if (this.props.loggedIn === false) {
			this.props.history.push('/');
		} else {
			this.props.getAllCases();
		}
	}

	logout = () => {
		console.log('Log out');
		this.props.history.push('/');
	};

	render() {
		return (
			<div className="landing-container">
				<div className="landing-header">
					<img src={headerLogo} height="75%" width="10%" alt="company header logo" />
					{/*<div className="user-div">
						<span>{"Welcome" + this.props.firstName + this.props.lastName}</span>
						<div className="user-image">{getInitials(this.props.firstName, this.props.lastName)}</div>
					</div>*/}
					<div className="dropdown logout-container">
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
							{this.props.firstName + ' ' + this.props.lastName}
						</button>
						<div className="user-image">{getInitials(this.props.firstName, this.props.lastName)}</div>
						<ul className="dropdown-menu pull-right">
							<li>
								<a onClick={this.logout}>Sign out</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="landing-body">
					<div className="nav-container">
						<span className="home-page-tabs">
							<div className="tab-button active" onClick={showAlert}>
								Dashboard
							</div>
							<div className="tab-button">Admin</div>
						</span>
					</div>
					<div className="dashboard-container">Coming Soon....</div>
				</div>
				{/*<div className="landing-actions" />*/}
				{/*<div className="landing-body">{this.props.cases.map(item => <Card key={item.id} {...item} />)}</div>*/}
			</div>
		);
	}
}

export { LandingPage as TestLandingPage };

const mapStateToProps = state => {
	return {
		loggedIn: state.app.loggedIn,
		firstName: state.app.firstName,
		lastName: state.app.lastName,
		cases: state.cases.caselist
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getAllCases }, dispatch);
};

export { mapStateToProps, mapDispatchToProps };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
