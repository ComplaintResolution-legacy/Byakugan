import React from 'react';
import Avatar from 'material-ui/Avatar';

export class DrawerHeader extends React.Component {
	styles = {
		header: {
			height: '110px',
			backgroundColor: 'rgb(0, 188, 212)',
			color: 'white',
			padding: '20px'
		},
		avatar: {
			display:'block',
			position: 'relative',
			top: '30%',
			transform: 'translateY(-50%)',
			fontSize: '20px'
		},
		title: {
			'paddingTop': '30px',
			'fontWeight': 500
		}
	};


	render() {
		return(
			<div style={this.styles.header}>
				<Avatar
					src="http://placehold.it/350x150"
					size={60}
					style={this.styles.avatar}
				/>
				<div style={this.styles.title}>
					{sessionStorage.getItem('email')}
				</div>
			</div>
		)
	}
}