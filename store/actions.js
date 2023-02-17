import * as type from "./mutations_types.js";

export default {
	setUserInfo: ({
		commit,
		state
	}, param) => {
		
		commit(type.USER_INFO, param);
	},
	setAuthCodeData: ({
		commit,
		state
	}, param) => {
		commit(type.AUTH_CODE, param);
	},
	setGridList: ({
		commit,
		state
	}, param) => {
		commit(type.GRID_LIST, param);
	},
	 

};
