export default {
	userInfo(states) {
		  
		// return   states.userInfo || uni.getStorageSync('cameraUserInfo');
		return    uni.getStorageSync('setUerInfo' ) || states.userInfo  ;
	},
	authCodeData(states) {
	 	return  states.authCodeData;
	 },
	 getGridList(states) {
	  	return  states.gridList;
	  },

};
