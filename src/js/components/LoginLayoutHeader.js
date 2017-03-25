import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


export class LoginLayoutHeader extends React.Component {
	styles = {
		boxSizing: 'border-box',
		margin: '10px',
		fontSize: '20px',
		textAlign: 'center',
		height: '35vh',
		paddingTop: '7vh'
	};

	render() {
		return(
			<div style={this.styles}>
				<div>
					<img src="img/logo.png"/>
				</div>
				<div>
					Complaint Resolution
				</div>
			</div>
		)
	}
}