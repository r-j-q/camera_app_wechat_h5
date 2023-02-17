<template>
	<view class="">


		<view class="rowBetweenTop featured_test_list" v-for="(item,i) in featuredList" :key="i" @click="navTo(item)">
			<view class="featured_test_left mrr">
				<image :src="one0JpgList[i%5]"></image>
			</view>
			<view class="featured_test_right">
				<textGrf :text="item.name" colors="#000" />
				<view class="mt10">
					<textGrf :text="item.testDate" colors="#999999" fontSizes="26rpx" />
				</view>
				<view class="rowBetween featured_test_right_bottom ">
					<view class="paytype_" v-if='item.pay==0'>
						免费
					</view>
					<view class="paytype" v-if='item.pay==1'>
						未支付
					</view>
					<view class="paytype_" v-if='item.pay==2'>
						已支付
					</view>

					<u-tag @click="navTo(item)" text="报告详情" borderColor="#3FB4C9" color="#3FB4C9" size="mini" plain
						shape="circle">
					</u-tag>



				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef  H5
	import {
		url
	} from "@/common/config.js"
	import mumuGetlocation from '@/uni_modules/mumu-getlocation/components/mumu-getlocation/mumu-getlocation.vue'
	// #endif
	import textGrf from "@/components/textFile/textGrf"
	import {
		mineTest,
		getCategoryList,
		getScaleInfo,
		getResult,
		queryPromotionBySubjectId,
		native,
		queryOrder,
		getQueryOrderByResultIdAndUserId,
		h5Pay
	} from "@/api/index.js";
	import {
		mapGetters
	} from "vuex";
	// import {urlphoto} from "@/common/config.js"
	export default {
		props: ['featuredList'],
		components: {
			textGrf,
			// #ifdef  H5
			mumuGetlocation
			// #endif

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				// urlphoto:urlphoto,
				one0JpgList: [
					this.$imageUrl.urls.one0Jpg0,
					this.$imageUrl.urls.one0Jpg1,
					this.$imageUrl.urls.one0Jpg2,
					this.$imageUrl.urls.one0Jpg3,
					this.$imageUrl.urls.one0Jpg4,
					this.$imageUrl.urls.one0Jpg5,
				],
				one0Jpg0: this.$imageUrl.urls.one0Jpg0,
				rd_icon0: this.$imageUrl.urls.rd_icon0,

				price: "",
				resultId: "",
				timer: "",
				orderNo: ""
			}
		},
		onHide() {
			clearInterval(this.timer);

		},
		methods: {
			getH5Pay(params) {
				let _this = this;
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
								`${res.data.codeUrl}&redirect_url=${url}:8999/scalePage/paymentStatus/index?resultId=${_this.resultId}&orderNo=${_this.orderNo}`;
							window.open(pay);

						})
			},
		async	navTo(item) {
				let _this = this; 
				uni.removeStorageSync('beginTextData')
			    if(item.type==0){
					_this.resultId = item.id;
					_this.getPayType(item.subjectOrCognitiveId, item.id)
				}else{
					console.log("=11111name========>",item.name)
					// 未旧数据 人脸表情识别任务
					if(
					item.name== "形状知觉测试(自上而下)"
					||item.name==  "瑞文智力测试" 
					|| item.name=="工作记忆能力测试(字母记忆)"
					 
					){
					 
					 uni.navigateTo({
					 	url:"/cognitiveTasksTestResult/testResultNew?id="+item.id+"&messageShare=0"
					 }) 
						 
					}else{
						console.log("=11111========>",item.id)
					 await	getApp().getVersionId(item.id);
					 	uni.navigateTo({
					 		url: "/cognitiveTasksTestResult/testResult?id=" + item.id +"&messageShare=0&flag="+getApp().globalData.flag
					 	}) 
					}
					 
				}
				

			},
			// 支付模块
			getPayType(subjectOrCognitiveId, id) {
				let _this = this;
				_this.$request
					.get({
						url: getQueryOrderByResultIdAndUserId + '/' + subjectOrCognitiveId + '/' + _this.userInfo?.user
							?.id + '/' + id,
						loadingTip: "加载中...",
						data: {}
					})
					.then(
						(res) => {
							console.log("=获取支付金额接口数据====》", res)
							if (res.code == "200") {
								if (res.data == null) {

									_this.getQueryPromotionBySubjectId(subjectOrCognitiveId)
								} else {
									uni.navigateTo({
										url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId
									});
								}
							}

						})
			},
			// 订单状态
			getQueryOrder(orderNo) {
				let _this = this;
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
									clearInterval(_this.timer);
									uni.navigateTo({
										url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId
									});
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
				let _this = this;
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

						// uni.navigateTo({
						// 	url: "/scalePage/testRecord/index"
						// })
						// uni.showToast({
						// 	icon: "none",
						// 	title: "支付失败"
						// })
						// console.log("==支付失败就跳转到测试记录=====>",JSON.parse(err))
					}
				})
			},
			getNative(params) {
				let _this = this;
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
							_this.orderNo = res.data.orderNo
							console.log("==1=====》", res.data.orderNo)
							// #ifdef MP-WEIXIN

							let pay = JSON.parse(res.data.codeUrl);
							_this.payWchat(pay.provider, pay.timeStamp, pay.nonceStr, pay.package, pay.signType, pay
								.paySign, res.data.orderNo)
							// #endif

						})
			},
			// 获取支付金额
			getQueryPromotionBySubjectId(id) {
				let _this = this;
				let urls = queryPromotionBySubjectId + "/" + id;
				_this.$request
					.get({
						url: urls,
						loadingTip: "加载中...",
						data: {}
					})
					.then(
						(res) => {
							console.log("=获取支付金额接口数据====》", res)
							_this.price = res.data.price
							if (res.data.price == 0) {
								 
								uni.navigateTo({
									url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId
								});

							} else {
								let params = {
									productId: id,
									userId: _this.userInfo?.user?.id,
									resultId: _this.resultId,
									description: res.data.name,
									total: res.data.price,
									openId: _this.userInfo?.openId?.openId,
								};
								// #ifdef H5 
								let ips = "125.70.61.175"
								params.payerClientIp = sessionStorage.getItem('ip') || ips;
								params.sceneType = uni.getSystemInfoSync().platform == 'android' ? "Android" : "iOS";

								_this.getH5Pay(params)

								// #endif
								_this.getNative(params)
							}

						})
			},
		},

	}
</script>

<style scoped>
	.customStyle {
		color: #3FB4C9 !important;
		border: 1px solid #3FB4C9 !important;
		width: 200rpx;
		height: 80rpx;
	}

	.paytype {
		color: rgb(249, 174, 61);
		font-size: 12px
	}

	.paytype_ {
		color: #3FB4C9;
		font-size: 12px
	}

	.featured_test_list {
		padding: 16rpx 0;
	}

	.featured_test_left {
		width: 216rpx;
		height: 216rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.featured_test_left image {
		width: 100%;
		height: 100%;
	}

	.featured_test_right {
		flex: 1;
	}

	.featured_test_right_img {
		width: 18rpx;
		height: 22rpx;
	}

	.featured_test_right_buttoms {
		padding: 20rpx 40rpx;
		background-color: #D4F3F8;
		border-radius: 24rpx;
		color: #3FB4C9;
		font-size: 24rpx;
	}

	.featured_test_right_bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
