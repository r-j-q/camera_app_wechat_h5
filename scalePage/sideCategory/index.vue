<template>
	<view>


		<!-- #ifdef MP-WEIXIN  -->
		<searchHeader :placeholderT="placeholderT" @getChangeVal="getChangeVal" />
		<!-- #endif -->
		<!-- #ifdef H5  -->
		 <u-sticky style="background-color: #fff; padding-bottom: 23px;">
		 
		 	<u-row>
		 		 
		 		<u-col span="12">
		 			<view class="bacF">
		 			<u-search height="80rpx" :show-action="true" action-text="搜索" :animation="true"  placeholder="请输入量表名称" @blur="getChangeVal"  @custom="getChangeVal" v-model="searchKey"></u-search>
		 			</view>
		 		</u-col> 
		 
		 	</u-row>
		 
		 </u-sticky>
		<!-- #endif  -->
		<u-gap height="50"></u-gap>

		<side-category class="category" v-model="currentIndex" :currentIndex="currentIndex"
			:customNumStyle="{ color: 'red' }" :list="getGridList" active-color="#4CD964" actiive-height="100%"
			actiive-width="2%" @change="change">
			<view class="height_">

				<view class="pa" v-if="categoryNameList.length>0">
					<scroll-view scroll-y="true" scroll-x="true" class="scroll-Y height_"
						@scrolltolower="handleScrolltolower">
						<featuredTestListOverCategory :featuredList="categoryNameList" />
						<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
							:nomore-text="nomoreText" fontSize="14px" iconSize="14px" />
					</scroll-view>
					 
				</view>
				<NoData v-else />



			</view>
		</side-category>

	</view>
</template>

<script>
	import searchHeader from "@/components/searchHeader/index.vue"
	import sideCategory from '@/components/mochen-side-category/mochen-side-category.vue';
	import featuredTestListOverCategory from "@/scalePage/components/featuredTestListOverCategory";
	import NoData from "@/components/noData/index.vue"
	import {
		mapGetters
	} from "vuex";
	var app = getApp().globalData;
	var loginRes;
	import {
		mineTest,
		getSubjectListByAuths
	} from "@/api/index.js";
	var _this;
	export default {
		name: "index",
		components: {
			searchHeader,
			sideCategory,
			featuredTestListOverCategory,
			NoData
		},
		computed: {
			...mapGetters(["userInfo", "getGridList"]),
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
				loadingText: "加载中...",
				loadmoreText: "",
				nomoreText: "----到底了----",
				categoryList: [],
				categoryNameList: [],
				status: "加载中",
				searchKey: "",
				pageNum: 1,
				pageSize: 10,
				totleSize: 0,
				urlsTest: this.$imageUrl.urls.toBeginTesting[0].urlsTest,
				list: [{
						name: '分类一'
					},
					{
						name: '分类一'
					}
				],
				currentIndex: 0,
				categoryEname: "ALL"
			};
		},
		onLoad(options) {
			_this = this;
			_this.currentIndex = options.indx;
			_this.categoryEname = options.ename;
			_this.getTitle()
			console.log("==2222========>", options.indx)
           _this.getSearchSubjectListByName()
		},
		onShow() {
			_this = this;
			 
			console.log("侧边栏列表", _this.getGridList)
		},
		// 	onReachBottom() {
		// 		console.log("==当前数据条数========>",_this.categoryNameList.length)
		// 		console.log("==当前数据条数总条数========>",_this.totleSize)
		// 		if (_this.categoryNameList.length >= _this.totleSize) return;
		// 		_this.status = 'loading';
		// 		_this.pageNum++;
		// 		setTimeout(() => {
		// 			_this.getSearchSubjectListByName()
		// 			if (_this.categoryNameList.length >= _this.totleSize) _this.status = 'nomore';
		// 			else _this.status = 'loading';
		// 		}, 1000)

		// 		uni.stopPullDownRefresh()
		// 	},

		methods: {
			getTitle(){
				uni.setNavigationBarTitle({
					title: _this.getGridList[_this.currentIndex].name
				});
			},
			handleScrolltolower() {
				console.log("==当前数据条数========>", _this.categoryNameList.length)
				console.log("==当前数据条数总条数========>", _this.totleSize)
				if (_this.categoryNameList.length >= _this.totleSize) return;
				_this.status = 'loading';
				_this.pageNum++;
				setTimeout(() => {
					_this.getSearchSubjectListByName()
					if (_this.categoryNameList.length >= _this.totleSize) _this.status = 'nomore';
					else _this.status = 'loading';
				}, 1000)

				uni.stopPullDownRefresh()
				console.log("-------->")
			},

			change(currentIndex, v) {
				_this.currentIndex =currentIndex;
				 
				_this.pageNum = 1
				_this.pageSize = 10
				_this.categoryNameList = []
				_this.categoryEname = v.ename;
				_this.getSearchSubjectListByName();
				_this.getTitle();
				console.log(currentIndex)
				console.log(v)
			},

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

				_this.$request
					.get({
						url: `${getSubjectListByAuths}`,
						loadingTip: "加载中...",
						data: {
							categoryEname: _this.categoryEname,
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
								// console.log("----搜索数据列表--->", res)
								_this.categoryNameList.push(...res.data.data);

								_this.totleSize = res.data.allNum
								if (_this.categoryNameList.length >= res.data.allNum) {
									console.log("----搜索数据列表-2222-->", res)
									_this.status = 'nomore';
								} else {
									console.log("----搜索数据列表333333333-------->", res)
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


	.height_ {
		height: 100vh;
		overflow: hidden;
		overflow-y: scroll;
	}
.pa{
	padding: 10px 0 10px 10px;
}
	/* page{
			height: 100vh;
			overflow: hidden; 
			 overflow-y: scroll;
			background-color: #F5F6FA;
		} */
</style>
