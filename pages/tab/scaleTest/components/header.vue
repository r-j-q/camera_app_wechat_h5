<template>
	<view class="rowBetween header_content paddingLeftRight20"  @click="navTo">
		<view class="header_content_left fontSize19 fontWeight"  >
			量表测试
		</view>
		<u-icon name="photo" color="#2979ff" size="28"></u-icon>
		<view    class="disRowAroundStart bgColor header_content_right">
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
			navTo(){
				uni.navigateTo({
					url:"/scalePage/searchRecord/index"
				})
			},
		}
	}
</script>

<style scoped>
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
