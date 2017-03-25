import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Send from 'material-ui/svg-icons/content/send';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {Complaint} from '../components/Complaint';
import {Comment} from '../components/Comment';
import Subheader from 'material-ui/Subheader';

import axios from '../axiosInstance';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {complaintStore} from '../stores/ComplaintStore';
import {rejectedComplaintsStore, resolvedComplaintsStore, waitingComplaintsStore, allComplaintsStore} from '../stores/ComplaintsStore';

import * as validators from '../validators';

@observer
export class ComplaintPage extends React.Component {

	@observable commentField = {
		error: ""
	}

	constructor(props) {
		super(props)
		this.id = this.props.params.complaintId
		complaintStore.complaint = null
		
	}


	loadComplaint() {
		complaintStore.getAComplaint(this.id)
	}

	reject() {
		if(allComplaintsStore.complaints_obj[complaintStore.complaint.id] !== undefined) {
			allComplaintsStore.complaints_obj[complaintStore.complaint.id].status = "rejected"
		}
		rejectedComplaintsStore.reload()
		waitingComplaintsStore.reload()
		complaintStore.complaint.reject()
	}

	resolve() {
		if(allComplaintsStore.complaints_obj[complaintStore.complaint.id] !== undefined) {
			allComplaintsStore.complaints_obj[complaintStore.complaint.id].status = "resolved"
		}
		resolvedComplaintsStore.reload()
		waitingComplaintsStore.reload()
		complaintStore.complaint.resolve()
	}

	handleCommentSubmit(e) {
		e.preventDefault()
		this.commentField.error = ''
		let commentText = e.target.elements.namedItem("comment_text").value
		this.validateComment(commentText)
		if(this.commentField.error === '') {
			complaintStore.complaint.comment(commentText)
			e.target.elements.namedItem("comment_text").value = "";
		}

	}

	validateComment(commentText) {
		this.commentField.error = validators.required(
			commentText
		);
	}

	getComments() {
		var c = []
		const {comments} = complaintStore.complaint
		for(var i=0; i<comments.length; i++) {
			if(comments[i].by === 'admin') {
				c.push(
					<Paper zDepth={1} style={this.style.complaint, this.style.adminComment} key={comments[i].id} class="adminComment">
						<Comment
							timestamp={comments[i].timestamp}
							author="Me"
							text={comments[i].text}
						/>
					</Paper>
				)
			}
			else {
				c.push(
					<Paper zDepth={1} style={this.style.complaint, this.style.userComment} key={comments[i].id} class="userComment">
						<Comment
							timestamp={comments[i].timestamp}
							author={comments[i].by}
							text={comments[i].text}
						/>
					</Paper>
				)
			}
		}

		return c;
	}

	getComplaint() {
		if(complaintStore.complaint !== null) {
			var complaint = complaintStore.complaint 
			return (
				<div>
					<Paper zDepth={1} style={this.style.complaint}>
						<Complaint
							text = {complaint.text}
							status = {complaint.status}
							timestamp = {complaint.timestamp}
						/>
					</Paper>

					<div style={this.style.pendingStatusBar}>
						<RaisedButton
							disabled = {complaint.status !== "waiting"}
							backgroundColor= {Colors.red400}
							style={{
								marginRight: '3px'
							}}
							label="Reject"
							labelColor="white"
							labelStyle={{
								textTransform:"none",
								fontWeight: 500
							}}

							onTouchTap={this.reject.bind(this)}
						/>
						<RaisedButton
							disabled = {complaint.status !== "waiting"}
							backgroundColor= {Colors.green400}
							label="Resolve"
							labelColor="white"
							labelStyle={{
								textTransform:"none",
								fontWeight: 500
							}}
							onTouchTap={this.resolve.bind(this)}

						/>
					</div>
					<Divider/>
					{this.getComments()}
				</div>
			)
		}

		else {
			this.loadComplaint()
			return <div style={{
				textAlign: "center",
				marginTop:	'50px'		
			}}>Loading ...</div>
		}
	}

	style = {
		container: {
			paddingTop: '5px',
		},

		topBar: {
			display: 'flex',
			fontSize: '14px',
			padding: '5px'
		},
		complaint: {
			margin: '20px 10px 20px 10px',
			padding: '10px',
			borderRadius: '5px'
		},
		pendingStatusBar: {
			textAlign: 'right',
			margin: '10px 10px 20px 10px'
		},
		adminComment: {
			width: '70%',
			minWidth: '300px',
			margin:'25px 31px 25px',
			marginLeft: 'auto'
		},
		userComment: {
			width: '70%',
			minWidth: '300px',
			margin:'25px 0px 25px 20px',
			marginRight: 'auto'
		}
	}

	render() {
		return (
			<div style={this.style.container}>
				<Subheader>
					<div style={this.style.topBar}>
						<Link to='/home/complaints'>
							<FlatButton 
								label="All Complaints"
								backgroundColor="#eee"
								secondary={true} 
								labelStyle={{
									textTransform: "none"
								}}
							/>
						</Link>
						<div>
							&nbsp;&nbsp;> <i>this Complaint</i>
						</div>
					</div>
				</Subheader>
			
				{this.getComplaint()}
				<div style={{
					marginBottom: '70px'
				}}/>
				<div style={{
					width:'100%',
					position:'fixed',
					bottom:'0px',
					left:'0px',
					margin:'0px',
					padding:'0px'
				}}>
					<form onSubmit={this.handleCommentSubmit.bind(this)}>
						<div style={{
							backgroundColor: '#fff',
							boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',	
							margin:'0px auto 0px auto',
							padding: '5px',
							display: 'flex'
						}} class='commentField'>
								<TextField
									floatingLabelText="Enter your comment here ..."
									name ="comment_text"
									fullWidth={true}
									errorText={this.commentField.error}
									style={{
										paddingLeft: '10px',
										paddingRight: '5px',
										marginBottom: '12px'
									}}
								/>
								<FloatingActionButton
									mini={true}
									type="submit"
									style={{
										margin:'auto 15px auto 25px'
									}}
								>
									<Send/>
								</FloatingActionButton>
						</div>
					</form>
				</div>
			</div>
		)		
	}
}