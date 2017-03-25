import React from 'react';


import {resolvedComplaintsStore} from '../stores/ComplaintsStore';

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Complaint} from '../components/Complaint';
import * as Colors from 'material-ui/styles/colors';
import {Link} from 'react-router';
import {observer} from 'mobx-react'

@observer
export class ResolvedComplaints extends React.Component {

	componentDidMount() {
		window.onscroll = function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		        resolvedComplaintsStore.getMoreComplaints();
		    }
		}
	}

	loadStatus() {
		if(resolvedComplaintsStore.moreComplaints) {
			return "Loading ..."
		} else {
			return "No More Complaints of this type :)"
		}
	}


	loadComplaints() {
		resolvedComplaintsStore.getMoreComplaints();		
	}

	render() {
		if(resolvedComplaintsStore.complaints.length === 0) {
			this.loadComplaints()
			return null
		} else {
			var c = []
			const {complaints} = resolvedComplaintsStore 
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