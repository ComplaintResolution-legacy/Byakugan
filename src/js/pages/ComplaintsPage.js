import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import {Complaint} from '../components/Complaint';

import {AllComplaints} from '../components/AllComplaints';
import {RejectedComplaints} from '../components/RejectedComplaints'
import {ResolvedComplaints} from '../components/ResolvedComplaints'
import {WaitingComplaints} from '../components/WaitingComplaints'

import axios from '../axiosInstance';

import {observable} from 'mobx';
import {observer} from 'mobx-react'; 

import {allComplaintsStore} from '../stores/ComplaintsStore';


@observer
export class ComplaintsPage extends React.Component {


	constructor(props) {
		super(props)
		this.state = {
			tab: "waiting"
		}
	}


	onTabChange(value) {
		this.setState({
			tab: value
		})
	}

	getComplaintsOfTab() {
		if(this.state.tab === 'waiting') {
			return <WaitingComplaints />
		} else if (this.state.tab === 'resolved') {
			return <ResolvedComplaints />
		} else if( this.state.tab === 'rejected') {
			return <RejectedComplaints />
		} else if (this.state.tab === 'all') {
			return <AllComplaints />
		}
	}

	render() {
		return (
			<div>
				<List style={{
					paddingTop: 0
				}}>
					<Tabs onChange={this.onTabChange.bind(this)} value={this.state.tab}>
						<Tab label="Waiting" value="waiting">
							{/*<WaitingComplaints />
							{this.getWaitingComplaints()}*/}
						</Tab>
						<Tab label="All" value="all">
							{/*<AllComplaints />*/}
						</Tab>
						<Tab label="Resolved" value="resolved">
							{/*<ResolvedComplaints />
							{this.getResolvedComplaints()}*/}
						</Tab>
						<Tab label="Rejected" value="rejected">
						</Tab>
					</Tabs>
					{this.getComplaintsOfTab()}
				</List>
			</div>
		)		
	}

	componentWillUnmount() {
		window.onscroll = function(ev){}
	}

}