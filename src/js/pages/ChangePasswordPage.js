import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import {SuccessText} from '../components/SuccessText';
import * as validators from '../validators';

import axios from '../axiosInstance';

import {observable} from 'mobx';
import {observer} from 'mobx-react';



@observer
export class ChangePasswordPage extends React.Component {

	@observable errors = {
		oldPasswordError: "",
		newPasswordError: "",
		repeatNewPasswordError: "",
	}

	@observable success = "";

	style = {
		container: {
			padding: '10px'
		}
	}

	validateOldPassword(oldPassword) {
		let error = validators.required(oldPassword);
		this.errors.oldPasswordError = error;
	}

	validateNewPasswords(newPassword, repeatNewPassword) {
		let newPasswordError = validators.required(newPassword);
		this.errors.newPasswordError = newPasswordError;

		if(newPasswordError === "") {
			let repeatNewPasswordError = validators.required(repeatNewPassword);

			if(repeatNewPasswordError === "") {
				repeatNewPasswordError = validators.equal(
					newPassword,
					"New Password",
					repeatNewPassword,
					"Repeat New Password"
				)
			}

			this.errors.repeatNewPasswordError = repeatNewPasswordError

		}
	}



	changePasswordSubmit(e) {
		e.preventDefault();
		let oldPassword = e.target.elements.namedItem("old_password").value;
		let newPassword = e.target.elements.namedItem("new_password").value;
		let repeatNewPassword = e.target.elements.namedItem("repeat_new_password").value;
		this.success = "";

		this.validateOldPassword(oldPassword);
		this.validateNewPasswords(newPassword, repeatNewPassword);

		if(
			this.errors.oldPasswordError === "" &&
			this.errors.newPasswordError === "" &&
			this.errors.repeatNewPasswordError === "") {
			var component = this
			axios.post(
				'/change_password',
				{
					old_password: oldPassword,
					new_password: newPassword,
				}
			).then(function(response){
				const {data} = response;
				if(data.success) {
					component.success = "Your password has been successfully changed";
				} else {
					component.errors.oldPasswordError = data.error;
				}
			})
		}

	}

	render() {
		return (
			<div style={this.style.container}>
				<form onSubmit={this.changePasswordSubmit.bind(this)} >
					<div>
						<SuccessText text ={this.success}/>
						<TextField
							floatingLabelText="Old Password"
							fullWidth={true}
							name="old_password"
							type="password"
							errorText= {this.errors.oldPasswordError}
						/>
						<TextField
							floatingLabelText="New Password"
							fullWidth={true}
							name="new_password"
							type="password"
							errorText = {this.errors.newPasswordError}
						/>
						<TextField
							floatingLabelText="Repeat New Password"
							fullWidth={true}
							name="repeat_new_password"
							type="password"
							errorText = {this.errors.repeatNewPasswordError}
						/>
					</div>
					<div style={{
						marginTop:'50px',
						textAlign:'center'
					}}>
						<RaisedButton
							type="submit"
							backgroundColor={Colors.lightBlue700}
							label="Change Password"
							labelColor="white"
						/>
					</div>
				</form>
			</div>
		)		
	}
}