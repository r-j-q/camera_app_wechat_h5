<template>
	<view class="login minHeight100 content_app bg_img paddingTop20" :style="'background-image: url('+logo_bg+');'">
		<view class="loginContent">
			<view class="loginTop">
				<image class="loginImg" :src="logo" mode=""></image>
			</view> 
			<view class="margin_button_top_40">
				<comp-input :password='false' :firstName="user_name" @myblur="onhandleUsername" placer="请输入手机号">
				</comp-input>
				<codeTime :areacode="selectvalNumber" @myblur="handleCode" :phone="username" />
				<!-- <comp-input :password='true' :firstName="possword" @myblur="onhandleRePassword" placer="请输入密码">
				</comp-input> -->

				<view class="loginButtom" @click.stop="handleOnLogin">
					<u-button type="success" :disabled="disabled" size="large"
						class="content_app11 textColorff weight fontSize30" shape="circle">登 录</u-button>
				</view>
			</view>
			<!-- <view class="loginAccount textColorff fontSize19">
				<text class="textColor marTop20 textLine" @click="registerTo">没有账号？去注册 </text>
			</view> -->
			 
 
		</view>



		<uni-popup :maskClick="false" :isMaskClick="false" class="updatePopup" background-color="red" ref="popup"
			type="bottom">
			<view class="uni-popup-style">
				<button class="content_app_f8 textColor" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumbers">手机号授权</button>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	// import { ref } from "vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import codeTime from '@/components/timeTag/codeTime'
	// const popup = ref(null);
	import {
		firstName,
		firstName1
	} from "@/static/images/lxg/base64.js";

	import {
		login,
		getPhone,
		codeOpenid
	} from '@/api/index.js'

	import compInput from '@/components/compInput'
	import {
		mapActions
	} from "vuex"
	export default {
		components: {
			uniPopup,
			compInput,
            codeTime
		},
		data() {
			return {
				selectvalNumber: "",
				authCode:"",
				show: false,
				dataKeys: {
					userId: 'myUserId',
					msgId: 'myMsgId',
					name: 'myName',
					message: 'myMessageName',
					img: 'myImg',
					avator: 'myAvator'
				},
				firstName: firstName,
				firstName1: firstName1,
				username: "",
				password: "",
				rePassword: "",
				age: "",
				phone: "",
				disabled: true,
				code: "",
				petName: "",
				logo: this.$imageUrl.urls.logo_01,
				logo_bg: this.$imageUrl.urls.logo_bg,
				user_name: this.$imageUrl.urls.phoneNumLogin,
				possword: this.$imageUrl.urls.password_login,
				wx_login: this.$imageUrl.urls.wx_login,
			};
		}, 

		methods: {
			 handleCode(messarr) {
			 	this.authCode = messarr[0]
			 },
			//获取手机号
			getPhoneNumbers(e) {
				let _this = this;
				console.log("==code8=======>", e);
				let errMsg = e.detail.errMsg;
				_this.$request.get({
						url: getPhone + "/" + e.detail.code,
						data: {

						}
					})
					.then(
						res => {
							_this.phone = res.data;
							console.log("登录返回信222222222", res.data)

							if (errMsg == 'getPhoneNumber:ok') {
								_this.wxloginUser()
								 
							} else {
								//跳转到通过短信验证码获取手机号页面
								// wx.navigateTo({
								//   url: '/',
								// })
							}
						},
						res => {
							let re = JSON.parse(CryptoJS.AesDecrypt(res))
							console.log("登录返回123", re)

						}
					);






				// encryptedData: e.detail.encryptedData,
				//          iv: e.detail.iv,
				//          sessionKey: that.data.session_key,
				//          uid: "",

				// //加密格式
				// let iv =e.detail.iv;
				// let encry = e.detail.encryptedData;
				// let token = wx.getStorageSync('token');
				// let phone = wx.getStorageSync('phone');

				//手机号和验证码验证略




			},
			 
			wxloginUser() {
				let _this = this;
					console.log("-----上传的数据------>",  _this.petName);
			let para ={
					code: _this.code,
					petName: _this.petName,
					modelPhone: _this.phone
				}
				let par = _this.$CryptoJS.AesEncrypt(JSON.stringify(para))
				_this.$request.post({
						url: codeOpenid,
						data: {
                          data:par
						}
					})
					.then(
						res => {
							_this.setUserInfo(res.data)
							_this.$refs['popup'].close();
							uni.switchTab({
								url: '/pages/tab/scaleTest/index',
								animationType: "fade-in",
							})
						   // uni.navigateBack()
                     console.log("登陆成功老师123", res)

						} ,
						res => {
							 
							console.log("登录返回123", res)
						
						}) 

			}, 

			...mapActions({
				setUserInfo: "setUserInfo"
			}),
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			onhandleUsername(messarr) {
				this.username = messarr[0]

			},
			onhandleRePassword(messarr) {
				this.password = messarr[0]

			},

			async handleOnLogin() {
				let _this = this


				let params = {
					phone: _this.username || "18364861538",
					// password: _this.$md5.md5(_this.password),
					authCode: _this.authCode,
					institutionNo: _this.$textContent.institutionNo,
					roleType: _this.$textContent.roleType,

				}
				console.log("==登录参数====", params)
				let par = _this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				if (_this.username == "") {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					})
					return
				}
				if (_this.authCode == "") {
					uni.showToast({
						icon: "none",
						title: "请输入验证码"
					})
					return
				}
				await _this.$request
					.post({
						url: login,
						data: {
							data: par
						}
					})
					.then(
						res => {
							
							// let parBase64Decode = _this.$CryptoJS.AesDecrypt(params)
							uni.setStorageSync('setUerInfo',res.data)
							console.log("登录返回信息===---------==>", res)
							_this.setUserInfo(res.data)
							uni.switchTab({
								url: '/pages/tab/scaleTest/index',
								animationType: "fade-in",
							})
						},
						res => {
							console.log("登录返回信2息222", res)
							// uni.showToast({
							// 	icon: "none",
							// 	title: res.data.msg
							// })
						}
					);


			},
			registerTo() {
				uni.navigateTo({
					url: "/pages/user/register"
				})
			},

		},
		onLoad(options) {
			// let pass=this.$md5()
		}
	};
</script>

<style scope>
	.uni-popup-style {
		padding: 100rpx 40rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.content_app_f8 {
		border: none;
	}

	.bg_img {

		background-size: 100% 100%;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}

	.loginContent {
		padding: 20px;
		padding-top: 200rpx;
	}

	.loginTop {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		margin-bottom: 20px
	}

	.loginButtom {
		margin-top: 40px;
		font-size: 36upx
	}

	.loginButtom button {
		border-radius: 100upx;
	}

	.loginImg {
		width: 70%;
		height: 140rpx;
	}

	.loginContent0 {
		font-size: 38upx;
		color: #423831;
		font-weight: 700;
		margin-bottom: 20upx
	}

	.loginContent1 {
		font-size: 30upx;
		color: #a2a2a2;
	}

	::v-deep .u-button--disabled {
		opacity: 1 !important;
	}
   .yijian{
	   color: #8a8a8a;
	   font-size: 12px;
   }
	.loginAccount {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.margin_button_top_40 {
		margin: 80rpx 0;
	}

	.textLine {
		text-decoration: underline;
	}

	.wx_login_style {
		width: 164rpx;
		height: 120rpx;

	}
	.minHeight100{
		position: relative;
	}
	.positionY{
		    position: absolute;
		    bottom: 100rpx;
		    left: 0;
		    right: 0;
	}
</style>
