import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import Resolved from 'material-ui/svg-icons/action/done';
import Waiting from 'material-ui/svg-icons/action/hourglass-empty';
import Rejected from 'material-ui/svg-icons/content/clear';

export class Complaint extends React.Component {

	style = {
		complaintText: {
			padding:'15px'
		},
		complaintHeader: {
			padding: '5px'
		},
		dateContent: {
			fontSize: '13px',
			textAlign: 'right'
		},
		statusBar:{
			padding: '5px',
			textAlign: 'right',
			fontSize:'13px'
		}
	}

	getStatus() {
		if(this.props.status === "rejected") {
			return (
				<div style={{
					color: Colors.red600
				}}>
					<Rejected color={Colors.red600} /> Rejected
				</div>
			)
		} else if (this.props.status === "resolved") {
			return (
				<div style={{
					color: Colors.lightGreen800
				}}>
					<Resolved color={Colors.lightGreen800}/> Resolved
				</div>
			)
		} else {
			return (
				<div style={{
					color: Colors.indigoA700
				}}>
					<Waiting color={Colors.indigoA700}/> Waiting
				</div>
			)
		}
	}

	render() {
		return(
			<div>
				<div style={this.style.complaintFooter}>
					<div style={this.style.dateContent}>
						On {this.props.timestamp}
					</div>
				</div>
				<div style={this.style.complaintText}>
					{this.props.text}
				</div>
				<div style={this.style.statusBar}>
					{this.getStatus()}
				</div>
			</div>
		)
	}
}