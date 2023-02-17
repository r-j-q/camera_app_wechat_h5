<template>
	<view class="firstNameRow content_app2f">
		<view class="firstName" :class="xing ?'firstNameX':''">
			<image :src="firstName" class="firstB"></image>
		</view>
		<view class="uni-form-item uni-column">
			<input autocomplete="off" :password="password" class="my-uni-input"
				placeholder-style="font-size:32rpx;color: #8a8a8a;" @input="replaceInput" v-model="changeValue"
				:placeholder="placer" />
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			array: {
				type: Array
			},
			selectval: {
				type: String
			},
			selectedType: {
				type: Boolean,
				default: false
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
			password: {
				type: Boolean
			},
			disabled: {
				type: Boolean,
				default: false
			} 
		},
		// computed: {
		//     changeValue: function () {
		//     return this.inputValue  || 
		//   }
		// },
		data() {
			return {
				changeValue: "",
				index: 0,
			};
		},


		methods: {
			sheeltShowLog() {
				this.$emit('myblur')
			},
			replaceInput() {
				this.$emit('myblur', [this.changeValue])
			}
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

	}

	.my-uni-input {
		margin: 10rpx auto;
		width: 500rpx;
		height: 90upx;
		border: none;
		outline: none;
		padding-left: 20rpx;
		font-size: 38rpx; 
		color: #8a8a8a;
		-webkit-background-color: #fff;
		background-color: #fff;
		caret-color: #8a8a8a;
	}

	/deep/ .my-uni-input:focus {
		-webkit-box-shadow: 0 0 0 1000px whiteinset;
		background-color: #fff;
		outline: none !important;
	}

	.firstName {
		width: 50upx;
		height: 50upx;
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
	.all-content-sttyle input::placeholder {
		font-size: 24rpx;
		    color: #8a8a8a!important;
		}
	.uniInput {
		background-color: #2F243A;
		border: none;
		color: #fff;
		font-size: 38rpx;
	}
</style>
