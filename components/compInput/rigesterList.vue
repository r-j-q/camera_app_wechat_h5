<template>
	<view class="firstNameRow content_app2f" @click="showSheet(id)">
		<view class="firstName" :class="xing ?'firstNameX':''">
			<image :src="firstName" class="firstB"></image>
		</view>
		<view class="uni-form-item uni-column height-style-list">
			 <view class="height-style-list-text mrl" v-if="inputValue == ''">
			 	{{placer}}
			 </view>
			 <view class="height-style-list-texts mrl" v-else>
			 	  {{inputValue}}
			 </view>
			 
		</view>
	</view>

</template>

<script>
	export default {
		props: { 
			id:{
				type: String
			},
			xing: {
				type: Boolean
			},
			placer: {
				type: String
			},
			firstName: {
				type: String
			},
			inputValue: {
				type: String || Number
			},
			 
		}, 
		data() {
			return {
				changeValue: "",
				index: 0,
			};
		},


		methods: {
			showSheet(str) {
				this.$emit('myblur',str)
			},
			 
		}
	}
</script>

<style>
	.firstNameRow {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40upx;
		border-radius: 12upx;
        font-size: 34rpx;
	}

	.height-style-list {
		height: 100rpx;
		line-height: 100rpx;
	}
.height-style-list-text{
	color: #9E9E9E;
}
.height-style-list-texts{
	color: #333;
}
	.my-uni-input {
		margin: 10rpx auto;
		width: 500rpx;
		height: 90upx;
		border: none;
		outline: none;
		padding-left: 20rpx;
		font-size: 38rpx;
		font-weight: bold;
		color: #333;
		-webkit-background-color: #fff;
		background-color: #fff;
		caret-color: #cdcdcd;
	}

	/deep/ .my-uni-input:focus {
		-webkit-box-shadow: 0 0 0 1000px whiteinset;
		background-color: #fff;
		outline: none !important;
	}

	.firstName {
		width: 32upx;
		height: 36upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.firstNameX {
		width: 16upx;
		height: 16upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.firstB {
		width: 100%;
		height: 100%
	}

	.uniInput {
		background-color: #2F243A;
		border: none;
		color: #fff;
		font-size: 38rpx;
	}
</style>
