<template>
	<view class="content_style">
 	<u-sticky style="background-color: #fff;top:0px">
			<view class="content-fixed-style">
				<u-search searchIconSize="20px" height="80rpx" :show-action="true" action-text="搜索" :animation="true"
					placeholder="请输入量表名称" @blur.stop="input" @custom="input" v-model="scaleName">
				</u-search>
				  <v-tabs v-model="current" :tabs="tabs" @change="changeTab" height="80rpx" activeColor="#3FB4C9"
					lineColor="#3FB4C9"></v-tabs> 
			</view>
		</u-sticky>
			<CameraContent :categoryNameLists="categoryNameList"/>
		 
		<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
			:nomore-text="nomoreText" />
	</view>
</template>

<script>
	var _this;
	import CameraContent from "@/components/cameraContent/index"
	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		getCognizeCategoryList,
		getCognizeListByAuth
	} from "@/api/index.js";

	export default {
		name: "index",
		components: {
			CameraContent,
        },
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				scaleName: "",
				placeholder: "请输入搜索关键词",
				current: 0,
				tabs: ['全部测试', '心里综合', '人格气质及个性', '老年测评', '儿童及青少年测评'],
				loadingText: "加载中...",
				loadmoreText: "加载中",
				nomoreText: "----到底了----",
				categoryList: [],
				categoryNameList: [],
				status: "加载中",
				pageNum: 1,
				pageSize: 30,
				totleSize: 0,
				categoryEname: "全部任务",


			};
		},
		watch: {},
		onLoad() {
			_this = this;
			_this.userId = _this.userInfo.user.id;
			_this.gId = _this.userInfo.user.gid;
			_this.institutionNo =_this.$textContent.institutionNo;
			_this.getSubjectListByName()
			_this.getCategoryList()
			console.log("--认知任务------->")
		},
		onShareAppMessage(options) {
		
			var that = this;
			var shareObj = { 
				path: '/pages/tab/cognitiveTask/index', 
				imageUrl: '',  
				success: function(res) {
					 
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					if (res.errMsg == 'shareAppMessage:fail cancel') {
		
					} else if (res.errMsg == 'shareAppMessage:fail') {
		
					}
				}
			};
		
			 
		
			return shareObj;
		},
		onReachBottom() {
			// more/loading/noMore
			if (_this.categoryNameList.length >= _this.totleSize) return;
			_this.status = 'loading';
			_this.pageNum++;
			setTimeout(() => {
				_this.getSubjectListByName()
				if (_this.categoryNameList.length >= _this.totleSize) _this.status = 'nomore';
				else _this.status = 'loading';
			}, 1000)

			// 停止下拉刷新滚动
			uni.stopPullDownRefresh()
		},
		methods: {

			input(e) {
				_this.pageNum = 1;
				_this.categoryNameList = [];
				_this.getSubjectListByName()
				// _this.scaleName = ""
			},

			changeTab(index) {
				_this.categoryEname = _this.categoryList[index].ename;
				_this.categoryNameList = [];
				_this.pageNum = 1;
				_this.getSubjectListByName()
			},
			handleStockList(item, index) {
				var _this = this;
				_this.stockList[index].active = !_this.stockList[index].active;
			},
			nativeGetTo() {
				let _this = this
				uni.navigateTo({
					url: '/pages/user/login'
				})
				uni.showToast({
					icon: "none",
					title: "Please Sign In"
				})
			},
			jumpToDescribe(item) {
				if (this.userInfo == null) {
					this.nativeGetTo()
				} else {
					uni.navigateTo({
						url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(
							item)))
					})
				}


			},
			getSubjectListByName() {
				// console.log("_this.scaleName", _this.scaleName)
				let params = {
					pageNum: _this.pageNum,
					pageSize: _this.pageSize,
					categoryEname: _this.categoryEname == "全部任务" ? "CALL" : _this.categoryEname,
					uId: _this.userId,
					gId: _this.gId,
					institutionNo: _this.userInfo?.user.institutionNo,
					// mobile: true,
					scaleName: _this.scaleName
				}
				_this.$request
					.get({
						url: getCognizeListByAuth,
						loadingTip: "加载中...",
						data: {
							...params
						},
					})
					.then(
						(res) => {
							if (res.code == 200) {
								let {
									data
								} = res.data;
								data.forEach(e => {
									if(e.pageUrl=='ShapeIntuition' 
									||e.pageUrl =='ETBexperiment_new'
									||e.pageUrl =='continueAdditionTask'
									||e.pageUrl =='rememberAbilityTask'
									||e.pageUrl == 'CoginitiveTask'
									||e.pageUrl == 'DigitalMemoryTest'
									||e.pageUrl == 'riskPolicy'
 									||e.pageUrl  =="ruiWenTask"){
										_this.categoryNameList.push(e)
										
									}
									 
								}) 
								// 量表全后交换
								 // _this.totleSize = res.data.allNum;
								 // if (_this.categoryNameList.length >= res.data.allNum) {
								 // 	_this.status = 'nomore';
								 // } else {
								 // 	_this.status = 'loadmore';
								 // }
								_this.totleSize = _this.categoryNameList.length
								if (_this.categoryNameList.length >= _this.totleSize) {
									_this.status = 'nomore';
								} else {
									_this.status = 'loadmore';
								}
							} else if (res.code == 401) {


							} else {
								uni.showToast({
									title: "加载有误",
									icon: "none",
								})
							}
						})

			},

			async getCategoryList() {
				await _this.$request
					.get({
						url: `${getCognizeCategoryList}?institutionNo=${_this.userInfo?.user.institutionNo}&gId=${_this.gId}`,
						loadingTip: "加载中...",

					})
					.then(
						(res) => {
 
							let categoryListx = [];
							let categoryName = [];
							if (res.code == 200) {
								for (var i = 0; i < res.data.length; i++) {
									categoryListx.push(res.data[i])
									categoryName.push(res.data[i].name)
								}

								_this.tabs = categoryName;
								_this.categoryList = categoryListx;

							}
						})

			},

		},
	};
</script>
<style scoped>
	.content_style {
		padding: 20rpx;
	}

	::v-deep .uni-searchbar__box {
		height: 50px;
	}

	::v-deep .uni-searchbar__cancel {
		line-height: 50px;
	}

	.content_app_style_content {
		min-height: 100vh;
		overflow-y: scroll;
	}

	::v-deep .uni-swiper-dot.uni-swiper-dot-active {
		background-color: #fff;
		background: #fff;
	}

	.tab-list-style-view {
		color: #B2620A;
		width: 94%;
		margin: 0 auto;
		padding: 1upx;
	}

	.text-aligin-center {
		text-align: center;
	}


	.content-fixed-style {
		/* padding: 20rpx; */
		/* width: 750upx; */
		/* height: 200rpx; */
		/* position: fixed; */
		/* top: 0rpx; */
		/* #ifdef MP-WEIXIN */
		/* top: 0rpx; */
		/* #endif */
		background-color: #fff;
		z-index: 99;

	}

	::v-deep .u-line-1.u-loadmore__content__text {
		line-height: 15px;
	}

	.v-tabs {
		padding: 10px 0;
	}
	::v-deep .u-loadmore__content.u-more .u-line-1.u-loadmore__content__text {
	line-height: 17px!important;
		display: flex;
	}
</style>
