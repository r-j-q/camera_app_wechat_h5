<template>
	<view class="">


		<view class="rowBetweenTop featured_test_list" v-for="(item,i) in featuredList" :key="i"   @click="navgetToBeginTest(item)">
			 
			<view class="featured_test_right">
				<textGrf :text="item.name" colors="#000" />
				<view class="mt10">
					<textGrf :text="item.description" colors="#999999" fontSizes="26rpx" />
				</view>
				<u-gap height="10"></u-gap>
				<view class="rowBetween featured_test_right_bottom">
					<view style="width:100%"  >
						<view  style="width:100%" >
							 <view class="disRowAround" style="width: 100%;">
							 	<view  class="rowAround color_" > 
							 	  <view  v-if="item.price!=0"  class="fontSize12 mr10"> ¥</view>
								  <view  v-if="item.price!=0"  class="fontSize19 fontWeight color_"> {{item.price}}</view>
							 	  <view v-else class="fontSize13 fontWeight color_"> 免费</view>
							 	</view>
							 	<view class="fontSize13 mrl30 " style="padding-right: 20upx;">
							 		 {{item.testNum}}人测试过
							 	</view>
								
							 </view>
							 
						</view>
					</view>


				</view>
			</view>
			<view class="featured_test_left mrr">
				<image :src="one0JpgList[i%5]"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import textGrf from "@/components/textFile/textGrf"
	import {
		mineTest,
		getCategoryList,
		getScaleInfo,
		getResult,
		queryPromotionBySubjectId,
		native,
		queryOrder,
		getQueryOrderByResultIdAndUserId
	} from "@/api/index.js";
	import {
		mapGetters
	} from "vuex";
	// import {urlphoto} from "@/common/config.js"
	export default {
		props: ['featuredList'],
		components: {
			textGrf

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
				timer: ""
			}
		},
		onHide() {
			clearInterval(this.timer);

		},
		methods: {
			navgetToBeginTest(item){
				let params = encodeURIComponent(JSON.stringify(item));
				 uni.navigateTo({
					url: "/scalePage/beginTest/index?params=" + params
				})
				 
			} 
			 
		},

	}
</script>

<style scoped>
	 
	.mrl30{
		margin-left: 100rpx;
		color: #999;
	}
	.customStyle {
		color: #3FB4C9 !important;
		border: 1px solid #3FB4C9 !important;
		width: 200rpx;
		height: 80rpx;
	}

	.featured_test_list {
		padding: 16rpx 0;
	}

	.featured_test_left {
		width: 180rpx;
		height: 180rpx;
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
	}
</style>
