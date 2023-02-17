<template>
	<view class="begin_test_content minHeight100">
		<view class="begin_test_content_title">
			{{beginTestContent.name}}
		</view>
		<view class="begin_test_content_h rowAround">
			<view class="disRowcCenter">
				<image :src="bao1" mode="" class="w_h_15"></image>
				<view class="fontSize14 color9 fontWeight">
					{{beginTestContent.testNum}}人测试过
				</view>
			</view>
			<view class="disRowcCenter">
				<image :src="bao2" mode="" class="w_h_15"></image>
				<view class="fontSize14 color9 fontWeight">
					{{beginTestContent.titleNum || 0 }}道精选题目
				</view>
			</view>
			<view class="disRowcCenter" v-if="beginTestContent.reportVersion==2">
				<image :src="bao3" mode="" class="w_h_15"></image>
				<view class="fontSize14 color9 fontWeight">
					专业报告
				</view>
			</view>
		</view>
		<view class="test_style">
			<image :src="urlsTest" class="test_style_"></image>
		</view>

		<view class="paddingAll color9 fontSize16">
			{{beginTestContent.description}}
		</view>
		<view class="btn_center paddingTop20">
			<!-- <u-button @click="navToBeginTestAnswer(beginTestContent)" type="success" :disabled="disabled" size="large"
				class="content_app11 textColorff weight fontSize30" shape="circle" text="开始测试" ></u-button> -->
			<u-button @click="navToBeginTestAnswer" text="开始测试" shape="circle"
				color="linear-gradient(to right,rgb(87 172 187), rgb(87 172 187))" />
		</view>
	</view>
</template>

<script>
	import textGrf from "@/components/textFile/textGrf"
	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes; 
	var _this;
	export default {
		name: "index",
		components: {
			textGrf

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				bao1: this.$imageUrl.urls.bao1,
				bao2: this.$imageUrl.urls.bao2,
				bao3: this.$imageUrl.urls.bao3,
				urlsTest: this.$imageUrl.urls.toBeginTesting[0].urlsTest,
				beginTestContent: {
					name: "",
					description: "",
					id: "",
					testNum: "66"
				}
			};
		},
		onLoad(options) {
			_this = this;
			if (options.params) {
				_this.beginTestContent = JSON.parse(decodeURIComponent(options.params));
				// uni.setNavigationBarTitle({
				// 	title: _this.beginTestContent.name
				// });
				console.log("开始测试页面参数", _this.beginTestContent);
			}

		},
		onShow() {

			uni.$on('updateData', function(data) {
				_this.beginTestContent = JSON.parse(decodeURIComponent(data)); 
			})

		},
		onShareAppMessage(options) {
			var that = this;
			let params = encodeURIComponent(JSON.stringify(that.beginTestContent));

			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/scalePage/beginTest/index?params=' + params, // 默认是当前页面，必须是以‘/'开头的完整路径
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
		methods: {
			navToBeginTestAnswer() {
				let item = this.beginTestContent;
				console.log('---user-----', item.name);
				if (this.$store.state.userInfo.user.id != "") {
					let datas = JSON.stringify(item)
					uni.setStorageSync('beginTextData', datas)
					uni.navigateTo({
						url: "/examWidght/examWidght/index?flag=" + item.flag + "&id=" + item.id + "&name=" + item
							.name + "&reportVersion=" + item.reportVersion
					})
				} else {
					getApp().jumpToTestRecordLogin()
				}
			}

		},
	};
</script>
<style scoped>
	.begin_test_content_title {
		font-size: 18px;
		font-weight: bold;
		padding: 20px 0;
		text-align: center;
	}

	.begin_test_content_h {
		width: 80%;
		margin: 0 auto;
		height: 100rpx;

	}

	.test_style {
		width: 750rpx;
		/* #ifdef MP-WEIXIN */
		height: 600rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 600rpx;
		/* #endif */
		z-index: -1;
	}

	.test_style_ {
		width: 100%;
		height: 100%;
	}

	.begin_test_content {
		height: 70%;
		width: 750rpx;
	}

	.btn_center {
		width: 700rpx;
		margin: 0 auto
	}

	.w_h_15 {
		width: 15px;
		height: 15px;
		display: block;
		margin-right: 10rpx;
	}
</style>
