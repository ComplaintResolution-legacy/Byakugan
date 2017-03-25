import {observable} from 'mobx';
import {ComplaintClass} from './ComplaintStore'; 
import axios from '../axiosInstance';

class ComplaintsStore {
	@observable complaints = []
	@observable complaint = null
	@observable moreComplaints = true;
	statusType = null;

	constructor(statusType) {
		this.statusType = statusType
	}

	complaints_obj = {}

	fetching = false;
	limit = 10;
	offset = 0;

	getMoreComplaints() {
		if(this.fetching === false) {
			this.fetching = true
			if(this.moreComplaints) {
				var store = this
				axios.get(
					'/complaints/ofstatus/'+ this.statusType +'/'+ this.offset +'/' + this.limit
				).then(function(response){
					const {data} = response
					if(data.success === true) {
						if(data.complaints.length > 0) {

							for(var i=0; i<data.complaints.length; i++) {

								var c = new ComplaintClass(
									data.complaints[i].id,
									data.complaints[i].text,
									data.complaints[i].timestamp,
									data.complaints[i].status
								)

								store.complaints.push(c)

								store.complaints_obj[data.complaints[i].id] = c
								
							}

							store.fetching = false
							store.offset += store.limit
							if(data.complaints.length < store.limit) {
								store.moreComplaints = false
							}
						} else {
							store.moreComplaints = false
							store.fetching = false
						}
					}
				}).catch(function(error) {
					store.fetching = false;
				})
			}
		}
	}


	reload() {
		this.complaints = []
		this.complaint = null
		this.complaints_obj= {}
		this.moreComplaints = true
		this.offset = 0;
		this.fetching = false;
	}
}

var allComplaintsStore = new ComplaintsStore('all')
var resolvedComplaintsStore = new ComplaintsStore('resolved')
var rejectedComplaintsStore = new ComplaintsStore('rejected')
var waitingComplaintsStore = new ComplaintsStore('waiting')

export {allComplaintsStore, resolvedComplaintsStore, rejectedComplaintsStore, waitingComplaintsStore};
