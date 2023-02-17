<template>
	<view class="rowBetween header_content  bgColorAll">
		<view class="header_content_left fontSize19 fontWeight  ">
			量表测试
		</view>
		<view class="disRowAroundStart bgColor header_content_right">
		     <icon :type="value" size="26"/>
			 <view class="colorAEAEAE fontSize19 mrl">
			 	量表名称
			 </view> 
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:"search",
				keyword: "量表名称"
			};
		},
		// props: {
		// 	createdTime: {
		// 		type: Array,
		// 		default:[]
		// 	},
		// 	activeList: {
		// 		type: Object,
		// 		default:{}
		// 	},
		// },

		methods: {
			// handleUpTimeData(item){
			//  this.$emit("onUpTimeData",item)
			// }
		}
	}
</script>

<style scoped>
	.header_content{
		padding: 0rpx 20rpx 30rpx 20rpx;
		//#ifdef H5
		padding: 0rpx  ;
		//#endif
	}
	.header_content_left{
		width: 160rpx;
		
	}
	.header_content_right{
		flex: 1; 
		height: 88rpx;
		border-radius: 44rpx;
		padding-left: 30rpx;
			   
		 
	}
	   
</style>
