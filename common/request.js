import {
	baseUrl
} from "./config.js"
const CryptoJS = require('../utils/aes_util.js');
class Request {

	config = {
		baseUrl: baseUrl,
		business: 'data',
	}

	static posUrl(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	static getUrl(config) {
		let url = config.url || ''
		let abs = Request.posUrl(url);
		if (!abs) {
			let f = config.slashAbsoluteUrl
			if (f) {
				abs = /^\/([\w.]+\/?)\S*/.test(url)
			}
		}
		return abs ? url : (config.baseUrl + url)
	}


	static getContentType(config) {
		var type = config.contentType || 'json'
		var charset = config.encoding || 'UTF-8'
		if (type === 'json') {
			return 'application/json;charset=' + charset
		} else if (type === 'form') {
			return 'application/x-www-form-urlencoded;charset=' + charset
		} else if (type === 'file') {
			return 'multipart/form-data;charset=' + charset
		} else if (type === 'text') {
			return 'text/plain;charset=' + charset
		} else if (type === 'html') {
			return 'text/html;charset=' + charset
		} else {
			throw new Error('unsupported content type : ' + type)
		}
	}
	interceptor = {

		request: undefined,
		response: undefined,
		fail: undefined,
		complete: undefined // since 1.2.0
	}

	setConfig(config) {
		this.config = Object.assign(this.config, config)
	}
	request(options = {}) {
		var that = this;

		if (options.data === undefined) {
			options.data = {}
		}
		if (options.header === undefined) {
			options.header = {}
		}

		let _options = Object.assign({}, this.config, options)
		_options = Object.assign(options, _options)

		_options.url = Request.getUrl(_options)
		if (!_options.header['Content-Type']) {
			_options.header['Content-Type'] = Request.getContentType(_options)
		}
		let _config = _options
		if (that.interceptor.request && typeof that.interceptor.request === 'function') {
			_config = that.interceptor.request(_options)
		}
		let task = undefined
		let promise = new Promise((resolve, reject) => {

			let extras = {}

			that._prepare(that, _config, extras)
 
			if (_config.contentType === 'file') {
				task = uni.uploadFile({
					..._config,
					success: res => {
						that._success(that, _config, res, resolve, reject)
					},
					fail: res => {
						that._fail(that, _config, res, resolve, reject)
					},
					complete: (res) => {
						that._complete(that, _config, res, extras)
					}
				})
				if (_config.progress && typeof _config.progress === 'function') {
					task.onProgressUpdate(_res => {
						_config.progress(_res, task)
					})
				}
			} else {
				 
				task = uni.request({
					..._config,
					success: res => {
						that._success(that, _config, res, resolve, reject)
					},
					fail: res => {
						console.log("----2222--->公用方法_config放回数据", res )
						that._fail(that, _config, res, resolve, reject)
					},
					complete: (res) => {
						that._complete(that, _config, res, extras)
					}
				})
			}
		})
		if (_config.success || _config.fail || _config.complete) {
			return task;
		}
		return promise;
	}
	get(options = {}) {
		options.method = 'GET'
		return this.request(options)
	}


	post(options = {}) {
		options.method = 'POST'
		return this.request(options)
	}

	put(options = {}) {
		options.method = 'PUT'
		return this.request(options)
	}

	delete(options = {}) {
		options.method = 'DELETE'
		return this.request(options)
	}

	upload(options = {}) {
		options.method = 'POST'
		options.contentType = 'file'
		return this.request(options)
	}


	_success = function(that, _config, res, resolve, reject) {
		 
			 if(res.data.code == "401"){
				that._fail(that, _config, res, resolve, reject);
				 return
			 }
			  
		let re = JSON.parse(CryptoJS.AesDecrypt(res?.data))
	 
		// console.log("登录返回信息2123", re)
		
		if (re.code == "200" || re.code == 200) {
				  console.log("解密--------->",re)
		  // var result = re
			// 			console.log("---12result---->公用方法放回数据", result)
			// 		var parseFileJson = _config.contentType === 'file' && typeof result === 'string' && (_config
			// 			.dataType ===
			// 			undefined || _config.dataType === 'json')
			// 		if (parseFileJson) {

			// 			result = re.data;
			// 		}
			// 		var skip = _config.skipInterceptorResponse

			// 		if (that.interceptor.response && typeof that.interceptor.response === 'function' && !skip) {
			// 			result = that.interceptor.response(result, _config)
			// 			if (_config.businessSuccess) {
			// 				var _data = _config.business ? result[_config.business] : result;

			// 				_config.success ? _config.success(_data) : resolve(_data)
			// 				return;
			// 			}
			// 		} else {

				 
			// 			_config.success ? _config.success(result) : resolve(result)
			// 			return;
			// 		}
			return	_config.success ? _config.success(re) : resolve(re)
		 
		}
		console.log("---12---->公用方法放回数据", res)
		 	 
		that._fail(that, _config, res, resolve, reject)
	}

	_fail = function(that, _config, re, resolve, reject) {
	 
		let res =CryptoJS.AesDecrypt(re?.data)   
		   	console.log("----数据失败返回信息", res)
		// console.log("----parBase64Decode--->", parBase64Decode);
		if (res.errMsg === 'request:fail') {
			return
		}
		var result = res
		if (that.interceptor.fail && typeof that.interceptor.fail === 'function') {
			result = that.interceptor.fail(res, _config)
		}
		_config.fail ? _config.fail(result) : reject(result)
	}

	_prepare = function(that, _config, obj = {}) {
		if (that.interceptor.prepare && typeof that.interceptor.prepare === 'function') {
			that.interceptor.prepare(_config, obj)
			return
		}
		obj.startTime = Date.now()
		if (_config.loadingTip) {
			uni.showLoading({
				title: _config.loadingTip
			})
		}
		if (_config.contentType === 'file') {
			if (_config.formData === undefined || _config.formData === null) {
				_config.formData = _config.data
				delete _config.data
			}
			delete _config.header['Content-Type']
			delete _config.header['Referer']
			_config.method = 'POST'
		}

	}


	_complete = function(that, _config, res, obj = {}) {
		if (that.interceptor.complete && typeof that.interceptor.complete === 'function') {
			that.interceptor.complete(_config, obj, res)
			return
		}
		obj.endTime = Date.now()

		if (_config.loadingTip) {
			let diff = obj.endTime - obj.startTime;
			let duration = _config.loadingDuration || 500
			if (diff < duration) {
				diff = duration - diff
			} else {
				diff = 0
			}

			setTimeout(function() {
				uni.hideLoading()
			}, diff)
		}
		if (_config.complete) {
			_config.complete(res)
		}
	}
}
var request = new Request()

request.setConfig({
	baseUrl: baseUrl,
	debug: true
})
export default request
//云支付 https://blog.csdn.net/qq_32340877/article/details/125461425