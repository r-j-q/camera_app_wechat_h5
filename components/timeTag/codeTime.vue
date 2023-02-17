<template>
	<view>
		<view class="three-content-style">
			<view class="all-content-sttyle disRowAroundcenter">
				<image style="width: 20px;height: 20px;" :src="yzm_login" alt="">
					 
				<input class="my-uni-input" @input="replaceInput"  maxlength="6" style=" padding-left: 10px;" v-model="mydata.checkNum"
					placeholder="请输入验证码" placeholder-style="font-size:32rpx;color: #8a8a8a;"/>
			</view>
			<view v-if="!codeTime" class="get-content-style" @tap="getCheckNum()">
				<text> 验证码 </text>
			</view>
			<view v-else class="get-content-style"  >
				<text>{{ codeTime+'s'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { 
		authCode
	} from '@/api/index.js'
	import { mapActions } from "vuex"
	export default {
		props: ['phone','areacode'],
		data() {
			return {
				codeTime: 0,
				code: this.$imageUrl.urls.code,
				yzm_login: this.$imageUrl.urls.yzm_login,
				 mydata: {
					checkNum: ""
				}
			}
		},
		methods: {
			...mapActions({
				setAuthCodeData: "setAuthCodeData"
			}),
			replaceInput() {
				this.$emit('myblur', [this.mydata.checkNum])
			},
			getcodes(){
				var that = this;
				that.$request.get({
				    url:  `${authCode}?phone=${that.phone}`, 
				    success: res => { 
				        console.log('success',res);
				        	that.setAuthCodeData(res.data)
				    },
				    fail: res => {
				        console.log('failure',res);
				        
				    },
				    complete: res=> { 
				        console.log('complete', res);
				    }
				});
			},
			getCheckNum() {
				  if(this.phone == ""){
					  uni.showToast({
					  	icon:"none",
						title:"请输入手机号"
					  })
					  return 
				  }
				this.getcodes()
				// console.log("这是手机号", this.areacode);
				if (this.codeTime > 0) {
					uni.showToast({
						title: 'Getting',
						icon: "none"
					});
					return;
				} else {
					this.codeTime = 60
					let timer = setInterval(() => {
						this.codeTime--;
						if (this.codeTime < 1) {
							clearInterval(timer);
							this.codeTime = 0
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style scope>
	.all-content-sttyle {

		display: flex;
		flex-wrap: nowrap;
	}

	.left-content-style {
		margin-right: 40px;
	}

	.three-content-style {
		background-color: white;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}

	.btn-content-style {
		background-color: #3FB4C9!important;
		font-size: 28rpx;
		width: 160rpx;

		color: white;
		font-weight: 600;
	}

	.get-content-style {
		background-color:#3FB4C9!important;
		height: 70rpx;
		line-height: 70rpx;
		color: white;
		border-radius: 10rpx;
		padding: 0 20rpx;
	}
	.my-uni-input::placeholder {
		    color: #8a8a8a!important;
			font-size: 28rpx;
		}
</style>
