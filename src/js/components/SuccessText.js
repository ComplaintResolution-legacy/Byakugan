import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

export class SuccessText extends React.Component {

	style = {
		color: Colors.green900,
		textAlign: "center",
		padding: '10px',
		backgroundColor: Colors.lightGreen100,
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