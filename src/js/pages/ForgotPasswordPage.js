import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as validators from '../validators';
import axios from '../axiosInstance';

import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {SuccessText} from '../components/SuccessText';
import {ErrorText} from '../components/ErrorText';

@observer
export class ForgotPasswordPage extends React.Component {

	@observable email = ""
	@observable errors = {
		emailError:"",
		tokenError:"",
		newPasswordError: "",
		repeatNewPasswordError: "",
	}

	@observable successText = ""

	constructor(props) {
		super(props);
	}

	validateEmail(email) {
		let error = validators.required(email)
		this.errors.emailError = error
	}

	validateToken(token) {
		let error = validators.required(token)
		this.errors.tokenError = error
	}

	validateNewPasswords(newPassword, repeatNewPassword) {
		let newPasswordError = validators.required(newPassword)
		if(newPasswordError === "") {
			let repeatNewPasswordError = validators.required(repeatNewPassword)
			if(repeatNewPasswordError === "") {
				repeatNewPasswordError = validators.equal(
					newPassword,
					"New Password",
					repeatNewPassword,
					"Repeat New Password"
				);
			}
			this.errors.repeatNewPasswordError = repeatNewPasswordError;
		}
		this.errors.newPasswordError = newPasswordError;

	}

	handleTokenSubmit(e) {
		this.successText = ""
		e.preventDefault()
		const {elements} = e.target
		let token = elements.token.value
		let newPassword = elements.new_password.value
		let repeatNewPassword = elements.repeat_new_password.value

		this.validateToken(token)
		this.validateNewPasswords(newPassword, repeatNewPassword)

		if(this.errors.tokenError === "" &&
			this.errors.newPasswordError === "" &&
			this.errors.repeatNewPasswordError === "") {
			var component = this;
			axios.post(
				'/forgot_password/p2',
				{
					email: this.email,
					token: token,
					new_password: newPassword,
					repeat_new_password: repeatNewPassword
				}
			).then(function (response){
				const {data} = response
				if(data.success === true) {
					component.successText = "The password has been successfully changed. You can now go back to login."
				} else {
					component.successText = ""
					component.errors.tokenError = data.error
				}
			})
		}
	}

	handleEmailSubmit(e) {
		e.preventDefault();
		let email = e.target.elements['email'].value
		this.validateEmail(email)

		var component = this

		if(this.errors.emailError === "") {
			axios.post(
				'/forgot_password/p1',
				{
					email: email
				}
			).then(function(response){
				if(response.data.success === true) {
					component.email = email
					component.successText = "An email has been sent to you with the recovery token"
				} else {
					component.errors.emailError = response.data.error
				}
			}).catch(function(error){
			});
		}
	}


	submitButtonStyle = {
		width: '34%',
		margin:'4px'
	};


	renderEmailPage() {
		return(
			<div>
				<form onSubmit={this.handleEmailSubmit.bind(this)}>
				<div>
					<TextField
						id="email"
						floatingLabelText="Email"
						fullWidth={true}
						name="email"
						errorText={this.errors.emailError}
					/>
				</div>
				<div style={{
					marginTop:'50px',
					textAlign:'center'
				}}>
					<RaisedButton
						type="submit"
						backgroundColor={Colors.lightBlue700}
						style={this.submitButtonStyle}
						label="Submit"
						labelColor="white"
						labelStyle={{
							textTransform:"none",
						}}
					/>
				</div>
				</form>
			</div>
		)
	}

	renderTokenPage() {
		return(
			<div>
				<SuccessText text={this.successText} />
				<form onSubmit={this.handleTokenSubmit.bind(this)}>
				<div>
					<TextField
						floatingLabelText="Email"
						fullWidth={true}
						value={this.email}
						disabled
					/>
					<TextField
						floatingLabelText="Token"
						fullWidth={true}
						name="token"
						errorText={this.errors.tokenError}
					/>
					<TextField
						floatingLabelText="New Password"
						fullWidth={true}
						name="new_password"
						type="password"
						errorText={this.errors.newPasswordError}
					/>
					<TextField
						floatingLabelText="Repeat New Password"
						fullWidth={true}
						name="repeat_new_password"
						type="password"
						errorText={this.errors.repeatNewPasswordError}
					/>
				</div>
				<div style={{
					marginTop:'5px',
					textAlign:'center'
				}}>
					<RaisedButton
						backgroundColor={Colors.lightBlue700}
						style={this.submitButtonStyle}
						label="Submit"
						labelColor="white"
						labelStyle={{
							textTransform:"none",
						}}
						type="submit"
					/>
				</div>
				</form>
			</div>
		)
	}

	render() {

		if(this.email !== "") {
			return this.renderTokenPage()
		}

		return this.renderEmailPage()
	}

}