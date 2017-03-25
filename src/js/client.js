import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Redirect, Router, Route, IndexRoute, hashHistory} from 'react-router';

import {LoginLayout} from './layouts/LoginLayout';
import {HomeLayout} from './layouts/HomeLayout';
import {RootLayout} from './layouts/RootLayout';

import {LoginPage} from './pages/LoginPage';
import {ForgotPasswordPage} from './pages/ForgotPasswordPage';
import {ComplaintsPage} from './pages/ComplaintsPage';
import {ComplaintPage} from './pages/ComplaintPage';
import {ChangePasswordPage} from './pages/ChangePasswordPage';

const app = document.getElementById('app');

injectTapEventPlugin();

function requireAuth(nextState, replace) {
	if(window.sessionStorage.getItem('email') === null) {
		replace({
		    pathname: '/login',
		})
	}
}

function notLoggedIn(nextState, replace) {
	if(window.sessionStorage.getItem('email') !== null) {
		replace({
		    pathname: '/home/complaints',
		})
	}
}

function landing(nextState, replace) {
	replace({
	    pathname: '/login',
	})	
}


ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={RootLayout}>
			<IndexRoute onEnter={landing} />
			<Route path="home" component={HomeLayout}>
				<Route path="complaints" component={ComplaintsPage} onEnter={requireAuth}/>
				<Route name="complaint" path="complaints/:complaintId" component={ComplaintPage} onEnter={requireAuth}/>
				<Route path="change_password" component={ChangePasswordPage} onEnter={requireAuth}/>
			</Route>
			<Route path="login" component={LoginLayout}>
				<IndexRoute component={LoginPage} onEnter={notLoggedIn}/>
				<Route path="forgot_password" component={ForgotPasswordPage} onEnter={notLoggedIn}/>
			</Route>
		</Route>
	</Router>,
	app
);
