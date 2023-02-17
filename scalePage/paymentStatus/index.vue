<template>
	<view class="m_h">
		<img  class="m_t_i" :src="imgPay[typeIndex]" alt="" srcset="">
		<view class="m_t">
			 
			<u-button type="success" size="large" @click="jumpTo" class="content_app11 textColorff weight fontSize30"
				shape="circle">{{payList[typeIndex]}}</u-button>
		</view>

	</view>
</template>

<script>
	var _this;
	import {
		getScaleInfo,
		getResult,
		queryPromotionBySubjectId,
		native,
		queryOrder,
		h5Pay

	} from "@/api/index.js";
	export default {
		data() {
			return {
				typeIndex: 0,
				payList: ["支付查询中", "支付成功", "支付失败"],
				imgPay:[
					 this.$imageUrl.urls.pay2,
					  this.$imageUrl.urls.pay1,
					  this.$imageUrl.urls.pay0
					  
				],
				urls: "",
				timer: null,
				resultId: "",
				orderNo: ""
			}
		},
		onLoad(options) {
			_this = this;
			var urlRequest = _this.$route.query;
			_this.resultId = urlRequest.resultId
			_this.orderNo = urlRequest.orderNo
			_this.timer = setInterval(() => {

				_this.getQueryOrder()
			}, 1000)
		},
		onHide() {
			clearInterval(_this.timer);
		},
		methods: {

			jumpTo() {
				if (_this.typeIndex == 1) {
					uni.navigateTo({
						url: "/scaleTestResults/testResults/index?resultId=" + _this.resultId
					});
				} else {
					uni.navigateTo({
						url: "/scalePage/testRecord/index"
					});
				}



			},
			// 订单状态
			getQueryOrder() {
				_this.$request
					.get({
						url: queryOrder + '/' + _this.orderNo,
						// loadingTip: "支付查询中...",
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
									_this.typeIndex = 1
									clearInterval(_this.timer);
									uni.showToast({
										title: "支付成功"
									})

								} else if (queryOrderNo.trade_state == "CLOSED") {
									_this.typeIndex = 2
									// console.log("订单支付回调成功===========CLOSED》", _this.trade_state_closed );
								} else {
									_this.typeIndex = 2
									clearInterval(_this.timer);

									// console.log("订单支付回调成功CLOSED===========》", _this.trade_state_closed);
								}
							} else {
								_this.typeIndex = 2

								uni.showToast({
									title: "支付失败"
								})
							}
						})
			},
		}
	}
</script>

<style scoped>
	.m_h{
		padding-top: 100px;
	}
	.m_t_i{
		display: flex;
		width: 160rpx;
		height: 160rpx;
	 
		margin: 0 auto; 
	}
	.m_t {
		width: 90%;

		margin: 0 auto;
		margin-top: 100px;
	}
</style>
