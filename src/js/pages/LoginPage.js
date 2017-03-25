import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

import axios from '../axiosInstance';

import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {ErrorText} from '../components/ErrorText';
import * as validators from '../validators';


@observer
export class LoginPage extends React.Component {

	loginButtonStyle = {
		width: '46%',
		margin:'4px'
	}

	forgotPasswordButtonStyle = {
		width: '47%',
		margin:'4px'
	};

	@observable errors = {
		"emailError": "",
		"passwordError": "",
		"loginError": ""
	}

	constructor(props) {
		super(props);
	}

	validateEmail(email) {
		let error = validators.required(email)
		this.errors.emailError = error
	}

	validatePassword(password) {
		let error = validators.required(password)
		this.errors.passwordError = error
	}

	loginSubmit(e) {
		e.preventDefault();
		let emailValue = e.target.elements.namedItem("email").value;
		let passwordValue = e.target.elements.namedItem("password").value;
		this.validateEmail(emailValue);
		this.validatePassword(passwordValue);

		if(this.errors.emailError === "" && this.errors.passwordError === "") {
			this.login(emailValue, passwordValue);
		}
	}

	login(email, password) {

		var component = this;
		axios.post(
			'/login',
			{
				email,
				password
			}
		).then(function(response){
			const {data} = response

			if(data.success === true) {
				window.sessionStorage.setItem('email', email)
				component.props.history.replace("/home/complaints");
			} else {
				component.errors.loginError = data.error;
			}
		}).catch(function(error){

		})
	}

	render() {
		return(
			<div>
				<form onSubmit={ this.loginSubmit.bind(this) }>
					<ErrorText text={this.errors.loginError} />
					<div>
						<TextField
							name="email"
							floatingLabelText="Email"
							fullWidth={true}
							errorText={this.errors.emailError}
						/>
						<TextField
							name="password"
							type="password"
							floatingLabelText="Password"
							fullWidth={true}
							errorText={this.errors.passwordError}
						/>
					</div>
					<div style={{
						marginTop:'30px'
					}}>
						<RaisedButton
							type="submit"
							backgroundColor= {Colors.red400}
							style={this.loginButtonStyle}
							label="Login"
							labelColor="white"
							labelStyle={{
								textTransform:"none",
								fontWeight: 600
							}}
						/>
						<Link to='/login/forgot_password'>
							<RaisedButton
								backgroundColor='#5c6bc0'
								style={this.forgotPasswordButtonStyle}
								label="Forgot Password"
								labelColor="white"
								labelStyle={{
									textTransform:"none"
								}}
							/>
						</Link>
					</div>
				</form>
			</div>
		)
	}
}