import * as type from "./mutations_types.js";
export default {
	[type.USER_INFO](state, userInfo) {
		
		state.userInfo = userInfo; 
		console.log("清除的数据",state)
		// uni.setStorageSync('cameraUserInfo',userInfo);
	},
	[type.AUTH_CODE](state, authCodeData) {
		state.authCodeData = authCodeData; 
	},
	[type.GRID_LIST](state, gridList) {
		state.gridList = gridList; 
	},
 
};
