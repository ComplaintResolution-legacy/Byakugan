import axios from '../axiosInstance';
import {observable} from 'mobx';

export class ComplaintClass {
	
	@observable text = null
	@observable id = null
	@observable timestamp = null
	@observable status = null

	@observable comments = []

	constructor(id, text, timestamp, status) {
		this.text = text;
		this.id = id;
		this.timestamp = timestamp;
		this.status = status;
	}

	resolve() {
		var complaint = this
		axios.post(
			'/complaints/' + this.id + '/status',
			{
				status: "resolved"
			}
		).then(function(response) {
			const {data} = response
			if(data.success) {
				complaint.status = "resolved"
			} 
		})
	}



	reject() {
		var complaint = this
		axios.post(
			'/complaints/' + this.id + '/status',
			{
				status: "rejected"
			}
		).then(function(response) {
			const {data} = response
			if(data.success) {
				complaint.status = "rejected"
			} 
		})
	}

	comment(text) {
		var complaint = this
		axios.post(
			'/complaints/' + this.id + '/comments',
			{
				text: text
			}
		).then(function(response){
			const {data} = response
			if(data.success === true) {
				complaint.comments.push({
					id : Date.now(),
					text: text,
					timestamp: 'now',
					by: 'admin'
				})
				window.scrollTo(0,document.body.scrollHeight);
			}
		})
	}
}


export class ComplaintStore {
	@observable complaint = null;


	getAComplaint(id) {
		var store = this
		axios.get(
			'/complaints/'+id,
		).then(function(response){
			const {data} = response
			var c;
			if(data.success === true) {

				c = new ComplaintClass(
					data.complaint.id,
					data.complaint.text,
					data.complaint.timestamp,
					data.complaint.status
				)

				c.comments = data.comments
				store.complaint = c;

			}
		})
	}

	reload() {
		this.complaint = null;
	}
}

var complaintStore = new ComplaintStore();
export {complaintStore};
