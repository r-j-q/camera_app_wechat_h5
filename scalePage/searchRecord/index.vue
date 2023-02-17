<template>
	<view class="bgColorAll  content_index">
		<!-- #ifdef MP-WEIXIN  -->
		<searchHeader :placeholderT="placeholderT" @getChangeVal="getChangeVal" />
		<!-- #endif -->
		<!-- #ifdef H5  -->
		<u-sticky style="background-color: #fff; padding-bottom: 23px;">

			<u-row>

				<u-col span="12">
					<view class="bacF">
						<u-search height="80rpx" :show-action="true" action-text="搜索" :animation="true"
							placeholder="请输入量表名称" @blur="getChangeVal" @custom="getChangeVal" v-model="searchKey">
						</u-search>
					</view>
				</u-col>

			</u-row>

		</u-sticky>
		<!-- #endif  -->
		<view class="paddingAll">
			<view class="" v-if="categoryNameList.length>0">
				<featuredTestListOverSearch :featuredList="categoryNameList" />
				<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
					:nomore-text="nomoreText" fontSize="14px" iconSize="14px" />
			</view>
			<NoData v-else />
		</view>
	</view>
</template>

<script>
	import featuredTestListOverSearch from "@/scalePage/components/featuredTestListOverSearch"
	import NoData from "@/components/noData/index.vue"
	import searchHeader from "@/components/searchHeader/index.vue"


	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		getSubjectListByName,
		getCategoryList,
		getSubjectListByAuths

	} from "@/api/index.js";
	var _this;
	export default {
		name: "searchRecord",
		components: {
			featuredTestListOverSearch,
			NoData,
			searchHeader

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				placeholderT: "搜索",
				arrow_left_bold: this.$imageUrl.urls.arrow_left_bold,
				search_no_data: this.$imageUrl.urls.search_no_data,
				keyword: "",
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
				searchKey: "",
				pageNum: 1,
				pageSize: 10,
				totleSize: 0,

			};
		},
		watch: {},
		onLoad() {

		},
		onShow() {
			// uni.showTabBar()
			_this = this;
             _this.categoryNameList=[]
			_this.getSearchSubjectListByName()
		},
		onReachBottom() {
			if (_this.categoryNameList.length >= _this.totleSize) return;
			_this.status = 'loading';
			_this.pageNum++;
			setTimeout(() => {
				_this.getSearchSubjectListByName()
				if (_this.categoryNameList.length >= _this.totleSize) _this.status = 'nomore';
				else _this.status = 'loading';
			}, 1000)

			// 停止下拉刷新滚动
			uni.stopPullDownRefresh()
		},
		methods: {
			// 搜索的参数
			getChangeVal(v) {
				_this.searchKey = v;
				_this.pageNum = 1
				_this.pageSize = 10
				_this.categoryNameList = []

				_this.getSearchSubjectListByName()
				console.log("搜索数据", v);
			},

			goBack() {
				uni.navigateBack()
			},

			getSearchSubjectListByName() {

				// categoryEname: ALL
				// scaleName: 孤独
				// pageNum: 1
				// pageSize: 10
				// institutionNo: 10000
				// uId: 
				_this.$request
					.get({
						url: `${getSubjectListByAuths}`,
						loadingTip: "加载中...",
						data: {
							categoryEname: "ALL",
							scaleName: _this.searchKey,
							pageNum: _this.pageNum,
							pageSize: _this.pageSize,
							institutionNo: _this.$textContent.institutionNo,
							uId: _this.userInfo?.user?.id,
						},
					})
					.then(
						(res) => {
							if (res.code == 200) {
								console.log("----搜索数据列表--->", res)
								_this.categoryNameList.push(...res.data.data);

								_this.totleSize = res.data.allNum
								if (_this.categoryNameList.length >= res.data.allNum) {
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
						url: `${getCategoryList}?institutionNo=${_this.$textContent.institutionNo}&gId=${_this.userInfo?.gId}`,
						loadingTip: "加载中...",

					})
					.then(
						(res) => {

							console.log("resresresresresres", res.data)
							// let re =   _this.$CryptoJS.AesDecrypt(res.data)
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
	.bacF {
		margin: 0 auto;
		width: 714rpx;
		padding: 40rpx 10px 10px 10px;
		background-color: #fff
	}

	.mrLeft {
		width: 40rpx;
	}
</style>
