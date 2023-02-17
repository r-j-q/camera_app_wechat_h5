<template>
	<view class="bgColorAll  content_index">


		<!-- #ifndef MP-WEIXIN -->
		<u-sticky style="background-color: #fff; padding: 23px 0;top:0px">

			<u-row>
				<u-col span="1">
					<image @click="goBack" style="width: 20px;height: 20px;" :src="arrow_left_bold" mode=""></image>
				</u-col>
				<u-col span="11">
					<view class="">
						<u-search searchIconSize="20px" height="80rpx" :show-action="true" action-text="搜索"
							:animation="true" placeholder="请输入量表或认知任务名称" @blur="search" @custom="search" v-model="searchKey">
						</u-search>

					</view>
				</u-col>

			</u-row>

		</u-sticky>
		<!--#endif -->


		<!-- #ifdef MP-WEIXIN-->

		<u-sticky style="background-color: #fff; padding-bottom: 23px;">

			<u-row>
				<u-col span="12">
					<view class="bacF">
						<u-search searchIconSize="20px" height="80rpx" :show-action="true" action-text="搜索"
							:animation="true" placeholder="请输入量表或认知任务名称" @blur="search" @custom="search" v-model="searchKey">
						</u-search>
					</view>
				</u-col>


			</u-row>

		</u-sticky>
		<!--#endif -->
		<view class="paddingAll">
			<view class="" v-if="categoryNameList.length>0">
				<featuredTestListOver :featuredList="categoryNameList" />
				<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
					:nomore-text="nomoreText" fontSize="14px" iconSize="14px" />
			</view>
			<NoData v-else />
		</view>
	</view>
</template>

<script>
	// #ifdef  H5
	 import  {url} from "@/common/config.js"
	import mumuGetlocation from '@/uni_modules/mumu-getlocation/components/mumu-getlocation/mumu-getlocation.vue'
	// #endif
	import featuredTestListOver from "@/scalePage/components/featuredTestListOver"
	import NoData from "@/components/noData/index.vue"

	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		mineTest,
		getCategoryList,
		h5Pay

	} from "@/api/index.js";
	var _this;
	export default {
		name: "index",
		components: {
			featuredTestListOver,
			NoData,
			// #ifdef  H5
			mumuGetlocation
			// #endif

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
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
			_this = this;
            _this.getSubjectListByName()
		},
		onShow() {
			// uni.showTabBar()
			 

			 
		},
		onReachBottom() {
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
			 
			search() {
				_this.pageNum = 1
				_this.pageSize = 10
				_this.categoryNameList = []
				_this.getSubjectListByName()
				console.log(_this.searchKey);
			},
			goBack() {
				uni.navigateBack()
			},

			getSubjectListByName() {

				_this.$request
					.get({
						url: `${mineTest}/${_this.userInfo?.user?.phone}/${_this.$textContent.institutionNo}`,
						loadingTip: "加载中...",
						data: {
							searchKey: _this.searchKey,
							pageNum: _this.pageNum,
							pageSize: _this.pageSize
						},
					})
					.then(
						(res) => {
							if (res.code == 200) {
								console.log("----获取测试记录--->", res)
								_this.categoryNameList.push(...res.data.userRecordEntityList);

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
		padding: 40rpx 10px;
		background-color: #fff
	}

	.mrLeft {
		width: 40rpx;
	}
</style>
