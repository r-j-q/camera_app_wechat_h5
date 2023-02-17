<template>
	<view class="begin_test_content minHeight100">
		<view class="begin_test_content_h disRowcCenter">
			<textGrf :text="`${beginTestContent.testNum}人测试过`" colors="#999999" fontSizes="32rpx" />
		</view>
		<image :src="urlsTest" class="test_style"></image>
		<view class="paddingAll color9 fontSize16">
			{{beginTestContent.description}}
		</view>
		<view class="btn_center paddingTop20">
			<u-button @click="navToBeginTestAnswer(beginTestContent)" text="开始测试" color="linear-gradient(to right,rgb(87 172 187), rgb(87 172 187))" />
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
	// import {
	// 	mineTest,
	// 	getCategoryList
	// } from "@/api/index.js";
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
				uni.setNavigationBarTitle({
					title: _this.beginTestContent.name
				});
				console.log("开始测试页面参数",_this.beginTestContent);
			}

		},
		onShow() {



		},
		onReachBottom() {},
		methods: {
			// uni.navigateTo({
			// 	url:"/examWidght/examWidght/index"
			// })
		},
	};
</script>
<style scoped>
	.begin_test_content_h {
		height: 100rpx;

	}

	.test_style {
		width: 100%;
		/* #ifdef MP-WEIXIN */
		height: 50%;
		/* #endif */
		/* #ifdef H5 */
		height: 700rpx;
		/* #endif */
		z-index: -1;
	}

	.begin_test_content {
		height: 70%;
		width: 750rpx;
	}

	.btn_center {
		width: 300rpx;
		margin: 0 auto
	}
</style>
