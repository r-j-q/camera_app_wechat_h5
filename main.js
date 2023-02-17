import Vue from 'vue'
import App from './App'   
import request from './common/request.js'
import {photoUrl,textContent} from './common/config.js'
import store from "./store/index.js";  
const CryptoJS = require('./utils/aes_util.js');
const imageUrl = require('./utils/imageUrl.js');
// const textContent = require('./utils/staticText.js');
const md5 = require('./utils/md5.js');
import htmlToPdf from './utils/pdf.js'
import util from './utils/util.js'
 
Vue.use(htmlToPdf)	 
import uView from 'uview-ui'
Vue.use(uView)
Vue.prototype.$noMultipleClicks = util.noMultipleClicks;
Vue.prototype.$preloader = util.preloader;
//防止重复点击  <view class="pay" @click.stop="$noMultipleClicks(goPay, item)" >支付</view>
 // goPay(item) {
 //       console.log(item)
 //        //balabala
 //    }  
	   
// 如此配置即可
// uni.$u.config.unit = 'rpx' 

  uni.$u.setConfig({
  	// 修改$u.config对象的属性
  	config: {
  		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
  		unit: 'rpx'
  	},
  	// 修改$u.props对象的属性
  	props: {
  	 
  	},
	})
Vue.use(request);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$photoUrl = photoUrl
Vue.prototype.$CryptoJS = CryptoJS
Vue.prototype.$imageUrl = imageUrl
Vue.prototype.$aiUrl = imageUrl
 
 
// Vue.prototype.$createPdf = htmlToPdf
 
Vue.prototype.$textContent = textContent
 
Vue.prototype.$md5 = md5
// request interception
request.interceptor.request = (config => {

	var token = store?.getters?.userInfo?.token
	if (token) {
		config.header.Authorization = `Bearer ${token}`
	}
	if (config.toastError === undefined) {
		config.toastError = true
	}
	return config;
})


request.interceptor.response = ((res, config) => {
	if (res.code === 0) {
		res.success = true;
		config.businessSuccess = true;
	}
	return res;
})

/**
 *    
 *  CODE_OK = 0
    CODE_NOTLOGIN = 1001
    CODE_NOTVIP = 2001
    CODE_ERROR = 1
    CODE_TOKENERROR = 2
 *   
 */
request.interceptor.fail = ((res, config) => {

	let ret = JSON.parse(res);
	let msg = ''
	 
	console.log("----main res--->",typeof ret);
	if(ret.code == "2001"){
		uni.showToast({
			icon:'error',
			title:ret.msg
		})
		return
	}
	 
	if (ret?.code == 401) { 
		uni.clearStorageSync()
		uni.showToast({
			icon: "none",
			title: "please sign in"
		})
		msg = ret.msg
		ret = ret.data
		uni.navigateTo({
			url: '/pages/user/login'
		})
	} else {
		msg = res.msg
	}
	if (config.toastError) {
		uni.showToast({
			title: msg,
			duration: 2000,
			icon: 'none'
		})
	}
 
	return ret;
})

Vue.prototype.$request = request

 

const app = new Vue({
	store, 
	...App
})
app.$mount()
 

	 