<template>
	<view class="">
	<view class="rowBetweenTop featured_test_list" @click="navgetToBeginTest(item)" v-if="index<3"  v-for="(item,index) in featuredList" :key="index">
		 <view class="featured_test_left mrr">
		 	 <image :src="one0Jpg[index%5]"  ></image>
		 </view> 
		 <view class="featured_test_right">
		 	<textGrf :text="item.name" colors="#000"/>
		 	<view class="paddingTopbottom20 mt10">
		 		<textGrf :text="item.description" colors="#999999" fontSizes="26rpx"/>
		 	</view>
			<view class="rowBetween featured_test_right_bottom">
				 <view class="disRowAroundcenter">
				 	<image class="featured_test_right_img" :src="rd_icon0"></image>
					<textGrf v-if="item.price !=0" :text="`¥${item.price}`" colors="#f9ae3d" fontSizes="26rpx" style="margin:0 10px"/>
					<textGrf v-else text="免费" colors="#f9ae3d" fontSizes="26rpx" style="margin:0 10px"/>
				 	<textGrf :text="`${item.testNum}人测试过`" colors="#999999" fontSizes="26rpx"/>
				 </view>
					 <view class="featured_test_right_buttoms ">
					 	立即测试
					 </view>
			</view>
		 </view>
	</view>
	</view>
</template>

<script>
	import textGrf from "@/components/textFile/textGrf"
	export default {
		props:['featuredList','one0Jpg'],
		components: { 
			textGrf 
		 },
	    data() {
	        return {  
				rd_icon0:this.$imageUrl.urls.rd_icon0
	          }
	    },
		methods:{
			navgetToBeginTest(item){ 
				let params = encodeURIComponent(JSON.stringify(item));
				 uni.navigateTo({
					// url: getApp().getUrl("/scalePage/beginTest/index?params=" + params)
					url: "/scalePage/beginTest/index?params=" + params
				})
				 
			} 
		}
		 
	}
</script>

<style scoped>
	 .featured_test_list{
		 padding: 16rpx 0;
	 }
	 .featured_test_left{
		 width: 240rpx;
		 height: 200rpx;
		 border-radius: 20rpx;
		 overflow: hidden;
	 }
	 .featured_test_left image{
	 		 width: 100%;
	 		 height: 100%;
	 }
	 .featured_test_right{
		 flex: 1;
	 }
	 .featured_test_right_img{
		 width: 18rpx;
		 height: 22rpx;
	 }
	 .featured_test_right_buttoms{
		 padding: 20rpx 40rpx;
		 background-color: #D4F3F8 ;
		 border-radius: 24rpx;
		 color: #3FB4C9 ;
		 font-size: 24rpx;
	 }
</style>