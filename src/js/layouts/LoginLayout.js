import React from 'react';

import {LoginLayoutHeader} from '../components/LoginLayoutHeader';
import {observer} from 'mobx-react';

export class LoginLayout extends React.Component {

	containerStyles = {
		padding:'10px',
		height: '100vh',
		maxWidth: '480px',
		margin:'auto'
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div style={this.containerStyles} class="loginbox">
				<LoginLayoutHeader/>
				{this.props.children}
			</div>
		);
	}
}