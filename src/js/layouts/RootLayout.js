import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';

import {observer} from 'mobx-react';

@observer
export class RootLayout extends React.Component {


	constructor(props) {
	  super(props);
	  this.state = {
	  	visible:'hidden'
	  };
	}

	render() {
		
		return (
			<MuiThemeProvider>
				<div>
					<Paper 
						zDepth={2}
						style={{
							position:'fixed',
							top:'70px',
							left:'50%',
							transform: 'translate(-50%, 0)',
							zIndex: 999,
							padding:'5px 5px 1px 5px',
							borderRadius: '50%',
							visibility:this.state.visible
						}}
					>
						<CircularProgress
							size={25}
							color="#f12b24"
						/>
					</Paper>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}
}