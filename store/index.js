import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
// #ifdef    H5
import createPersistedState from "vuex-persistedstate"

// #endif
Vue.use(Vuex);
const state = {
	authCodeData: null,
	userInfo: {
		user: {
			institutionNo: "PUB001",
			id: "",
			gid: ""
		},
		gridList: []
	},

};

export default new Vuex.Store({
	// #ifdef  H5
	plugins: [createPersistedState()],
	// #endif
	strict: false,
	state,
	getters,
	actions,
	mutations
	 
});
