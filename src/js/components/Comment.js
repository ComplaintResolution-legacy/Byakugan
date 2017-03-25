import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import Resolved from 'material-ui/svg-icons/action/done';
import Waiting from 'material-ui/svg-icons/action/hourglass-empty';
import Rejected from 'material-ui/svg-icons/content/clear';

export class Comment extends React.Component {

	style = {
		commentText: {
			padding:'15px'
		},
		commentHeader: {
			color: 'rgba(0, 0, 0, 0.541176)',
			display:'flex',
			padding: '10px',
			fontSize: '11px'
		},
		dateContent: {
			display:'block',
			marginLeft:'auto'
		},
		author: {
			display:'block',
			textAlign: 'left'
		}
	}

	render() {
		return(
			<div>
				<div style={this.style.commentHeader}>
					<div style={this.style.author}>
						{this.props.author}
					</div>
					<div style={this.style.dateContent}>
						On {this.props.timestamp}
					</div>
				</div>
				<div style={this.style.commentText}>
					{this.props.text}
				</div>
			</div>
		)
	}
}