import React from 'react';


import {waitingComplaintsStore} from '../stores/ComplaintsStore';
import * as Colors from 'material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Complaint} from '../components/Complaint';

import {Link} from 'react-router';
import {observer} from 'mobx-react'

@observer
export class WaitingComplaints extends React.Component {

	componentDidMount() {
		window.onscroll = function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		        waitingComplaintsStore.getMoreComplaints();
		    }
		}
	}

	loadStatus() {
		if(waitingComplaintsStore.moreComplaints) {
			return "Loading ..."
		} else {
			return "No More Complaints of this type :)"
		}
	}


	loadComplaints() {
		waitingComplaintsStore.getMoreComplaints();		
	}

	render() {
		if(waitingComplaintsStore.complaints.length === 0) {
			this.loadComplaints()
			return null
		} else {
			var c = []
			const {complaints} = waitingComplaintsStore 
			for(var i=0; i<complaints.length; i++) {
				c.push(
					<Link 
						to={"/home/complaints/" + complaints[i].id}
						key={complaints[i].id}
						style = {{
							textDecoration: 'none'
						}}
					>
						<ListItem innerDivStyle={{ padding:'10px' }}>
							<Complaint
								id={complaints[i].id}
								text={complaints[i].text}
								timestamp={complaints[i].timestamp}
								status={complaints[i].status}
							/>
						</ListItem>
						<Divider />
					</Link>
				)
			}

			return (
				<div>
					{c}
					<Divider />
					<div style={{
						textAlign: "center",
						fontSize: '14px',
						color: Colors.grey700
					}}>
						{this.loadStatus()}
					</div>
				</div>
			);
		}
	}

	componentWillUnmount() {
		window.onscroll = function(ev){}
	}
}