import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

export class ErrorText extends React.Component {

	style = {
		color: Colors.redA700,
		textAlign: "center",
		padding: '10px',
		backgroundColor: Colors.red100,
		borderRadius: '5px'
	}

	render() {
		if(this.props.text === "") {
			return null
		}
		 
		return(
			<div style={this.style}>
				{this.props.text}
			</div>
		)
	}
}