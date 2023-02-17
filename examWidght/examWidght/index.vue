<template>
	<view>
		<u-sticky>
			<LineProgress :currentIndex="currentIndex" :total="total" />
		</u-sticky>

		<swiper :current="currentIndex" style="height: 98vh;">
			<swiper-item style="overflow-y: scroll;" v-for="(item, indexa) in QuestionListAll" :key="indexa" m
				catchtouchmove='catchTouchMove'>
				<scroll-view scroll-x @scrolltolower="">
					<exam-widght :total="total" :currentIndex="currentIndex" :QuestionList="QuestionList"
						@goPrevAnswer="goPrevAnswer" @goNextAnswer="goNextAnswer" @onItemAnswer="onItemAnswer"
						@subMitList="subMitList" @onListItemAnswer="onListItemAnswer" />
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	// #ifdef  H5
	import {
		url
	} from "@/common/config.js"
	import mumuGetlocation from '@/uni_modules/mumu-getlocation/components/mumu-getlocation/mumu-getlocation.vue'
	// #endif

	import examWidght from '@/examWidght/components/Li-ExamWidght/Li-ExamWidght.vue';
	import LineProgress from '@/examWidght/components/lineProgress';
	// https://ext.dcloud.net.cn/plugin?id=706
	import {
		mapGetters
	} from "vuex";
	import {
		getScaleInfo,
		getResult,
		queryPromotionBySubjectId,
		native,
		queryOrder,
		h5Pay

	} from "@/api/index.js";
	var _this;
	export default {
		components: {
			examWidght,
			LineProgress,
			// #ifdef  H5
			mumuGetlocation
			// #endif
		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				// 全部题目
				scale_infos: [{
					questionType: "",
					answer: ""
				}],
				// 当前索引
				scale_index: 0,
				//题目总数
				scale_all: 0,
				// 答案数据
				scale_result: [],
				//备选答案数组
				scale_checkItems: [],
				scale_percent: 0,
				checkedCities: [],
				lastText: "上一题", //上一题
				nextText: "下一题", //下一题
				finishText: "完成",
				radio: "",
				scale_result_all: [], //答题总数




				listIndex: 0,
				showIndexText: false,
				numBoxShow: false,
				questionType: 0,

				flag: "",
				price: "",
				resultId: "",
				timer: "",


				QuestionListAll: [],
				QuestionList: {
					answer: ""
				},
				currentIndex: 0,
				total: 0,
				orderNo: "",
				reportVersion: "",
				handleNumber: 1,
				name: ""
			}
		},
		destroyed() {
			_this.handleNumber = 1;
		},
		onLoad(options) {
			_this = this;
			console.log("options2", options)

			if (options.flag) {
				_this.flag = options.flag;
				_this.id = options.id;
				_this.name = options.name;
				_this.reportVersion = options.reportVersion;
				uni.setNavigationBarTitle({
					title: options.name
				});
				if (_this.userInfo?.user?.id != "") {

					_this.getScaleInfoAnswerList(options.flag)
				} else {
					getApp().jumpToLoginParams(_this.flag, _this.id, _this.name, _this.reportVersion)
				}


			}

		},
		onShareAppMessage(options) {
			var that = this;

			var shareObj = {
				path: "/examWidght/examWidght/index?flag=" + that.flag + "&id=" + that.id + "&name=" + that
					.name + "&reportVersion=" + that.reportVersion, // 默认是当前页面，必须是以‘/'开头的完整路径
				imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: function(res) {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						// 转发失败，其中 detail message 为详细失败信息
					}
				}
			};

			return shareObj;
		},
		onHide() {
			clearInterval(this.timer);
			// https://blog.csdn.net/weixin_42738504/article/details/125521004
		},
		methods: {
			catchTouchMove: function(res) {
				return false
			},

			goPrevAnswer() {
				if (_this.currentIndex < 1) {
					uni.showToast({
						icon: "none",
						title: "已经是第一题"
					})
					return

				}

				let newIndex = _this.currentIndex - 1
				_this.currentIndex = newIndex;
				let QuestionListNew = Object.assign({}, _this.QuestionListAll[newIndex]);
				_this.QuestionList = QuestionListNew
			},
			goNextAnswer() {
				let newIndexs = _this.currentIndex + 1
				if (newIndexs > _this.QuestionListAll.length - 1) {
					_this.currentIndex = newIndexs - 1;
					uni.showToast({
						icon: "none",
						title: "已经是最后一题"
					})
					return
				}
				if (_this.QuestionListAll[_this.currentIndex].fldAnswer == "") {
					uni.showToast({
						icon: "none",
						title: "请先答题"
					})
					return
				}
				_this.currentIndex = newIndexs;
				let QuestionListNew = Object.assign({}, _this.QuestionListAll[newIndexs]);
				_this.QuestionList = QuestionListNew

			},
			onItemAnswer(item) {

				_this.QuestionListAll[_this.currentIndex].checkItems = item.fldOptionText;
				_this.QuestionListAll[_this.currentIndex].fldAnswer = item.fldOptionText;
				let QuestionListNew = Object.assign({}, _this.QuestionListAll[_this.currentIndex]);
				_this.QuestionList = QuestionListNew

			},

			onListItemAnswer(item) {

				if (_this.currentIndex >= _this.total - 1) {
					_this.QuestionListAll[_this.currentIndex].checkItems = item.fldOptionText;
					_this.QuestionListAll[_this.currentIndex].fldAnswer = item.fldOptionText;
					let QuestionListNew = Object.assign({}, _this.QuestionListAll[_this.currentIndex]);
					_this.QuestionList = QuestionListNew;
					// if (_this.handleNumber == 1) {
					// 	_this.subMitList();
					// }


					return;
				} else {

					_this.currentIndex = _this.currentIndex + 1;

					_this.QuestionListAll[_this.currentIndex - 1].checkItems = item.fldOptionText;
					_this.QuestionListAll[_this.currentIndex - 1].fldAnswer = item.fldOptionText;
					let QuestionListNew = Object.assign({}, _this.QuestionListAll[_this.currentIndex]);

					_this.QuestionList = QuestionListNew;




				}



			},


			// 订单状态
			getQueryOrder(orderNo) {
				_this.$request
					.get({
						url: queryOrder + '/' + orderNo,
						loadingTip: "加载中...",
						data: {}
					})
					.then(
						(res) => {

							let queryOrderNo = JSON.parse(
								res.data.body
							);
							if (res.code == "200") {

								if (
									queryOrderNo.trade_state == "SUCCESS"
								) {

									uni.navigateTo({
										url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId+"&messageShare=1"
									});

									clearInterval(_this.timer);
									uni.showToast({
										title: "支付成功"
									})

								} else if (queryOrderNo.trade_state == "CLOSED") {
									// console.log("订单支付回调成功===========CLOSED》", _this.trade_state_closed );
								} else {

									clearInterval(_this.timer);

									// console.log("订单支付回调成功CLOSED===========》", _this.trade_state_closed);
								}
							} else {
								uni.showToast({
									title: "支付失败"
								})
							}
						})
			},
			payWchat(provider, timeStamp, nonceStr, packages, signType, paySign, orderNo) {
				uni.requestPayment({
					provider,
					timeStamp,
					nonceStr,
					package: packages,
					signType,
					paySign,

					success: function(res) {
						_this.timer = setInterval(() => {
							_this.getQueryOrder(orderNo)
						}, 1000)

					},
					fail: function(err) {

						uni.navigateTo({
							url: "/scalePage/testRecord/index"
						})
						uni.showToast({
							icon: "none",
							title: "支付失败"
						})
					}
				})
			},
			getH5Pay(params) {

				let pra = _this.$CryptoJS.AesEncrypt(JSON.stringify(params))

				_this.$request
					.post({
						url: `${h5Pay}`,
						loadingTip: "加载中...",
						data: {
							data: pra
						}
					})
					.then(
						(res) => {

							let pay =
								`${res.data.codeUrl}&redirect_url=${url}/h5/index.html#/scalePage/paymentStatus/index?resultId=${_this.resultId}&orderNo=${_this.orderNo}`;
							// window.open(pay);
							_this.navigationF(pay)
							// /#/scaleTestResults/testResults/index

						})
			},
			navigationF(url) {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

				if (isAndroid) {
					//android终端
					window.open(url);
				} else if (isiOS) {
					//ios终端
					window.location.href = url;
				} else {
					window.location.href = url;
				}
			},
			getNative(params) {
				let pra = _this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				_this.$request
					.post({
						url: `${native}`,
						loadingTip: "加载中...",
						data: {
							data: pra
						}
					})
					.then(
						(res) => {
							_this.orderNo = res.data.orderNo;
							// #ifdef MP-WEIXIN

							let pay = JSON.parse(res.data.codeUrl);
							_this.payWchat(pay.provider, pay.timeStamp, pay.nonceStr, pay.package, pay.signType, pay
								.paySign, res.data.orderNo)
							// #endif

						})
			},
			// 获取支付金额
			async getQueryPromotionBySubjectId(id) {
				let urls = queryPromotionBySubjectId + "/" + id;
				await _this.$request
					.get({
						url: urls,
						loadingTip: "加载中...",
						data: {}
					})
					.then(
						(res) => {
							 

							_this.price = res.data.price;
							if (res.data.price == 0) {
								console.log("=获取支付金额接口数据==1==》", res)
								uni.navigateTo({
									url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId+"&messageShare=1"
								});

							} else {
								console.log("=获取支付金额接口数据=2===》", res)
								let params = {
									productId: id,
									userId: _this.userInfo?.user?.id,
									resultId: _this.resultId,
									description: res.data.name,
									total: res.data.price,
									openId: _this.userInfo?.openId?.openId,
								};
								_this.getNative(params)
								// #ifdef H5 
								let ips = "125.70.61.175"
								params.payerClientIp = sessionStorage.getItem('ip') || ips;
								params.sceneType = uni.getSystemInfoSync().platform == 'android' ? "Android" : "iOS";

								_this.getH5Pay(params)

								// #endif

							}


						})
			},
			getScaleInfoAnswerList(flag) {
				_this.$request
					.get({
						url: `${getScaleInfo}/${flag}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {
							if (res.code == 200 && res.data.length > 0) {
								_this.scale_infos = res.data;
								_this.scale_all = _this.scale_infos.length;
								_this.scale_checkItems =
									_this.scale_infos[_this.scale_index].checkItems.split("；");
								_this.scale_percent = parseInt(
									(_this.scale_index + 1) / _this.scale_all
								);
								_this.scale_percent = ((_this.scale_index + 1) * 100) / _this.scale_all;
								let listAll = [];
								_this.scale_infos.forEach((item, index) => {
									item.questionID = item.id;
									// item.fldName = item.answer;
									item.fldAnswer = "";
									let QuestionOptionList = []
									if (item.checkItems) {
										let arrList = item.checkItems.split("；");
										arrList.forEach((items, i) => {
											QuestionOptionList.push({
												fldOptionText: items,
												fldOptionIndex: i + 1
											})
										})
										item.QuestionOptionList = QuestionOptionList
									}

								})
								_this.total = _this.scale_infos.length
								_this.QuestionListAll = _this.scale_infos;
								_this.QuestionList = _this.scale_infos[_this.currentIndex];


							}

						})

			},



			subMitList(flag) {
				// _this.handleNumber = 2
				// if (_this.handleNumber == 1) {
				// 	_this.subMitList();
				// }
				let subMitListData = _this.QuestionListAll;
				if (_this.QuestionListAll[_this.currentIndex].fldAnswer == "") {
					uni.showToast({
						icon: "none",
						title: "请先答题"
					})
					return
				}

				subMitListData.forEach((item) => {
					delete item.QuestionOptionList;
					delete item.fldAnswer;
					delete item.questionID;
				})

				let params = {

					testPlanId: "",
					scale_result: subMitListData,
					userId: _this.userInfo?.user?.id

				}
				console.log("提交的参数", params)
				let par = _this.$CryptoJS.AesEncrypt(JSON.stringify(params));

				uni.showLoading({
					title: '测试结果生成中'
				});
				_this.$request
					.post({
						url: `${getResult}/${_this.flag}`,
						loadingTip: "加载中...",
						data: {
							data: par
						}


					})
					.then(
						(res) => {
							_this.resultId = res.data;
							uni.hideLoading()
							// 答题结束获取支付
							_this.getQueryPromotionBySubjectId(_this.id)



						})
			},
			//获取用户本地ip的方法
			getUserIP(onNewIP) {
				let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window
					.webkitRTCPeerConnection;
				let pc = new MyPeerConnection({
					iceServers: []
				});
				let noop = () => {};
				let localIPs = {};
				let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
				let iterateIP = (ip) => {
					if (!localIPs[ip]) onNewIP(ip);
					localIPs[ip] = true;
				};
				pc.createDataChannel('');
				pc.createOffer().then((sdp) => {
					sdp.sdp.split('\n').forEach(function(line) {
						if (line.indexOf('candidate') < 0) return;
						line.match(ipRegex).forEach(iterateIP);
					});
					pc.setLocalDescription(sdp, noop, noop);
				}).catch((reason) => {});
				pc.onicecandidate = (ice) => {
					if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate
						.match(ipRegex))
						return;
					ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
				};
			}





		}
	}
</script>
<style scoped>
	/deep/ uni-swiper {
		min-height: 80VH;
	}
</style>
