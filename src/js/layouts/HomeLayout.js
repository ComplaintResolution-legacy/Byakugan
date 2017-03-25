import React from 'react';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import SettingsIcon from 'material-ui/svg-icons/action/build';
import {Link} from 'react-router';
import {DrawerHeader} from '../components/DrawerHeader';

import axios from '../axiosInstance';

import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Home from 'material-ui/svg-icons/action/home';

import {allComplaintsStore, rejectedComplaintsStore, resolvedComplaintsStore, waitingComplaintsStore} from '../stores/ComplaintsStore';
import {complaintStore} from '../stores/ComplaintStore'

export class HomeLayout extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

	}


	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});

	logout() {

		axios.post(
			'/logout',
			{}
		).then(function(response) {
		})

		window.sessionStorage.removeItem('email');
		this.handleClose();
		this.props.history.replace("/login");
	}

	reload() {
		allComplaintsStore.reload()
		rejectedComplaintsStore.reload()
		resolvedComplaintsStore.reload()
		waitingComplaintsStore.reload()
		complaintStore.reload()

	}

	render() {
		
		return (
			<div>
				<AppBar
					title="Complaint Resolution"
					onLeftIconButtonTouchTap={this.handleToggle}
					style={{
						position: 'fixed',
						top: 0,
						left: 0
					}}
					titleStyle={{
						fontSize: '18px'
					}}
					zDepth = {0}
					class = 'appBar'
					iconElementRight={
						<div class='rightNav'>
							<Link to="/home/complaints">
								<IconButton>
									<Home color='#fff'/> abcd
								</IconButton>
							</Link>
							<IconButton onTouchTap={this.reload.bind(this)}>
								<Refresh color='#fff'/>
							</IconButton>
						</div>
					}
				/>
				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
				>
					<DrawerHeader />
					<Link to="/home/change_password" style = {{
						textDecoration: "none"
					}}>
						<MenuItem
							primaryText="Change Password" 
							leftIcon={<SettingsIcon />} 
							onTouchTap={this.handleClose}
						/>
					</Link>
					<Divider />
					<MenuItem 
						primaryText="Logout"
						leftIcon={<LogoutIcon />}
						onTouchTap={this.logout.bind(this)} 
					/>
				</Drawer>

				<div class="container">

					{ this.props.children }
				</div>
			</div>
		);
	}
}