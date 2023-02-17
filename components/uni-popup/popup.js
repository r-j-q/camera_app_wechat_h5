import message from './message.js';
const config = {
	top:'top',
	bottom:'bottom',
	center:'center',
	message:'top', 
	dialog:'center', 
	share:'bottom', 
	drawer:'bottom', 
	more:'center', 
	twocode:'center', 
	redpacket:"center",
}

export default {
	data(){
		return {
			config:config
		}
	},
	mixins: [message],
}
