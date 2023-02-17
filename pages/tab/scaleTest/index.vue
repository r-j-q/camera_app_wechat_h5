<template>
	<view class="bgColorAll  content_index">
		<!-- #ifdef MP-WEIXIN -->
		<add-tip :tip="tip" :duration="duration" />
		<!-- #endif -->
		<u-sticky style="background-color: #fff;padding:23px;top:0px">
			<!-- #ifdef MP-WEIXIN -->
			<searchHeaderH @navTo="navTo" :placeholderT="placeholderT" />
			<!-- #endif -->
			<!-- #ifdef H5  -->
			<searchHeaderH5 :placeholderT="placeholderT" />
			<!-- #endif  -->
		</u-sticky>

		<Swiper :swiperList="swiperList"  />
		<Grid :QueryCategoryNameList="QueryCategoryNameList" :gridList="gridList" :categoryName="categoryName" />


		<view class="height_all"></view>
		<view class=" paddingLeftRight20">
			<view class="content_header marginBottom20">
				<textGrf text="精选测试" colors="#000" />
			</view>
			<featuredTestList :featuredList="featuredList" :one0Jpg="one0Jpg" />
			<view class="height_all"></view>
			<view class="content_header">
				<LeftFeaturedTestList :featuredList="featuredList" :one0Jpg="one0Jpg" />
			</view>

		</view>
		<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText"
			fontSize="14px" iconSize="14px" />
	</view>
</template>

<script>
	import addTip from "@/components/struggler-uniapp-add-tip/struggler-uniapp-add-tip"
	import Swiper from "@/pages/tab/scaleTest/components/swiper"
	import Grid from "@/pages/tab/scaleTest/components/grid"
	import textGrf from "@/components/textFile/textGrf"
	import featuredTestList from "@/pages/tab/scaleTest/components/featuredTestList"
	import LeftFeaturedTestList from "@/pages/tab/scaleTest/components/leftFeaturedTestList"
	import searchHeaderH from "@/components/searchHeader/indexH.vue"
	import searchHeaderH5 from "./components/header.vue"


	import {
		mapGetters
	} from "vuex";
	// var app = getApp().globalData;
	var loginRes;
	import {
		getSubjectListByName,
		getCategoryList,
		getSubjectListByAuths 
	} from "@/api/index.js";
	var _this;
	export default {
		name: "index",
		components: {
			Swiper,
			Grid,
			textGrf,
			featuredTestList,
			LeftFeaturedTestList,
			searchHeaderH,
			searchHeaderH5,
			addTip

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				tip: "点击「添加小程序」，下次访问更便捷",
				duration: 1,
				placeholderT: "量表名称",
				swiperList: [this.$imageUrl.urls.banner_0, this.$imageUrl.urls.banner_1],
				one0Jpg: [
					this.$imageUrl.urls.one0Jpg0,
					this.$imageUrl.urls.one0Jpg1,
					this.$imageUrl.urls.one0Jpg2,
					this.$imageUrl.urls.one0Jpg3,
					this.$imageUrl.urls.one0Jpg4,
					this.$imageUrl.urls.one0Jpg5,
				],
				gridList: [
					this.$imageUrl.urls.grid0,
					this.$imageUrl.urls.grid1,
					this.$imageUrl.urls.grid2,
					this.$imageUrl.urls.grid3,
					this.$imageUrl.urls.grid4,
					this.$imageUrl.urls.grid5,
					this.$imageUrl.urls.grid6,
					this.$imageUrl.urls.grid7,

				],
				featuredList: [],
				value: "",
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
				pageSize: 10,
				totleSize: 0,
				categoryEname: "全部内容",
				categoryListx: [],
				categoryName: [],
				activeName: "ALL",
				searchKey: "",
				QueryCategoryNameList: [],


			};
		},
		 onShow() {
			 // #ifdef MP-WEIXIN
		 	getApp().mpUpdate();
			// #endif 
		 },
		 
		onLoad() {
			_this = this;
			 
			_this.getCategoryList()
			_this.getSubjectListByName()
		}, 
		onShareAppMessage() {},
		onReachBottom() {

			if (_this.featuredList.length >= _this.totleSize) return;
			_this.status = 'loading';
			_this.pageNum++;
			setTimeout(() => {
				_this.getSubjectListByName()
				if (_this.featuredList.length >= _this.totleSize) _this.status = "----到底了----";
				else _this.status = 'loading';
			}, 1000)

			// 停止下拉刷新滚动
			uni.stopPullDownRefresh()
		},
		methods: {
			 
			navTo() {
				uni.navigateTo({
					url: "/scalePage/searchRecord/index"
				})
			},
			// 失去焦点调用
			blur(e) {
				_this.pageNum = 1;
				_this.categoryNameList = [];
				_this.getSubjectListByName()
			},
			input(e) {
				_this.pageNum = 1;
			},
			clear(e) {
				_this.pageNum = 1;
				_this.categoryNameList = [];
				this.value = ""
				_this.getSubjectListByName()
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
				if (this.userInfo.user) {
					this.nativeGetTo()
				} else {
					uni.navigateTo({
						url: getApp().getUrl("/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(
							item)))
					})
				}


			},

			 
			getSubjectListByName() {

				_this.$request.get({
						url: getSubjectListByAuths,
						loadingTip: "加载中...",
						data: {
							scaleName: _this.searchKey,
							pageNum: _this.pageNum,
							pageSize: _this.pageSize,
							categoryEname: _this.activeName,
							institutionNo: _this.$textContent.institutionNo,
							uId: _this.userInfo?.user?.id,
						},
					})
					.then(
						(response) => {
							_this.featuredList.push(...response.data.data);
							_this.totleSize = response.data.allNum;
							if (_this.featuredList.length >= response.data.allNum) {
								_this.status = 'nomore';
							} else {
								_this.status = 'loadmore';
							}
							// console.log("===1211=======>", this.featuredList)
						})



			},
			getSubjectListByNames() {

				_this.$request
					.get({
						url: getSubjectListByName,
						loadingTip: "加载中...",
						data: {
							scaleName: _this.value,
							pageNum: _this.pageNum,
							pageSize: _this.pageSize,
							categoryEname: _this.categoryEname,
							institutionNo: _this.$textContent.institutionNo,
							uId: _this.userInfo?.userId,
						},
					})
					.then(
						(res) => {
							if (res.code == 200) {
								let data = res.data.data;
								data.forEach(e => {
									_this.categoryNameList.push(e)
								})
								_this.totleSize = res.data.allNum
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
				console.log("userInfo", _this.userInfo?.user)
				await _this.$request
					.get({
						url: `${getCategoryList}?institutionNo=${_this.$textContent.institutionNo}&gId=${_this.userInfo?.user.gid}`,
						loadingTip: "加载中...",

					})
					.then(
						(res) => {


							// let re =   _this.$CryptoJS.AesDecrypt(res.data)

							if (res.code == 200) {

								for (var i = 0; i < res.data.length; i++) {
									if (
										res.data[i].name == "心理综合" ||
										res.data[i].name == "人格气质及个性" ||
										res.data[i].name == "老年测评" ||
										res.data[i].name == "社会关系" ||
										res.data[i].name == "情绪" ||
										res.data[i].name == "成瘾" ||
										res.data[i].name == "精神障碍"
									) {
										if (res.data[i].name == "人格气质及个性") {
											res.data[i].name = "气质个性"
										}
										_this.categoryName.push(res.data[i])
										delete res.data[i]
									} else {
										_this.categoryListx.push(res.data[i])
									}


								}


								let newsList = [..._this.categoryName, ..._this.categoryListx];

								newsList.unshift(...newsList.splice(newsList.findIndex(i => i.ename === "ALL"), 1))
								_this.QueryCategoryNameList = newsList;

								_this.categoryName.push({
									id: "888",
									name: "更多",
									ename: "ALL",
									sequence: "888",
									type: "888"
								})
								console.log("===categoryName=====>", _this.categoryName)
								console.log("===categoryListx=====>", _this.categoryListx)
							}
						})

			},

		},
	};
</script>
<style scoped lang="scss">
	$themeColor:#34b5e2;

	.content_index_fix {
		background-color: #fff;
		top: 0;
		padding: 23px 0;
	}

	.uni-add-tips-box {
		position: fixed;
		top: 80rpx;
		right: 0;
		z-index: 99999;
		opacity: 0.8;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: column;
		width: 600upx;

		animation: opacity 1s linear infinite;
	}
</style>
