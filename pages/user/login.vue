<template>
	<view class="login minHeight100 content_app bg_img paddingTop20" :style="'background-image: url('+logo_bg+');'">
		<view class="loginContent">

			<view class="loginTop">
				<image class="loginImg" :src="logo" mode=""></image>
			</view>
			<!--  #ifdef MP-WEIXIN  -->
			 
			<!-- <view class=" textColorff fontSize19 wx_style"  > -->
			<button v-if="nickName !=''" class="textColorff fontSize19 wx_style" open-type="chooseAvatar"
				@chooseavatar="getAuthInfo">
				<template>
					<view class="disRowAroundStart">
						<image :src="wxAuth" class="wx_login_style"></image>
						<view class="yijian textColorff">微信账号快捷登录</view>
					</view>
				</template>
			</button>
			<view v-if="nickName ==''" class="textColorff fontSize19 wx_style positionRelat">
				<input type="nickname" id="nickname-input" class="weui-input" @change="getNickname" />
				<view class="disRowAroundStart">
					<image :src="wxAuth" class="wx_login_style"></image>
					<view class="yijian textColorff">获取微信昵称</view>
				</view>

			</view>
			 
			<!-- </view> -->
			<!-- #endif -->
			<view class="loginAccount textColorff fontSize19">

				<text class="color_3 " @click="navToPhone">输入手机号码登录/注册 </text>
			</view>
			<!-- <view class="loginAccount textColorff fontSize19">
				<text class="textColor marTop20 textLine" @click="registerTo">没有账号？去注册 </text>
			</view> -->


		</view>
		<!-- <input type="nickname" class="weui-input" placeholder=""/> -->
		<uni-popup :maskClick="false" :isMaskClick="false" class="updatePopup" background-color="red" ref="popup"
			type="bottom">
			<view class="uni-popup-style">
				<view class="fontSize13 fontWeight marginBottom40">
					心灵照相机用户注册协议
				</view>
				<view class="xie_yi">
					{{xieYs}}
				</view>
				<view class="xie_yi_1 disRowAroundStart marTop20">
					点击同意即表示您已阅读和同意

					<view class="textColor" @click="navToprofile">
						心灵照相机用户注册协议
					</view>
				</view>
				<view class="rowAround">
					<u-button shape="circle" class="textColor19 BoxShadow mrr" @click="noNumber">不同意</u-button>
					<view class="w_40"> </view>
					<u-button shape="circle" class="BoxShadow oks mrl" open-type="getPhoneNumber" type="success"
						@getphonenumber="getPhoneNumbers">同意</u-button>
				</view>

			</view>
		</uni-popup>
	</view>

</template>

<script>
	import {
		xieY
	} from "@/utils/Profile.js"
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import codeTime from '@/components/timeTag/codeTime'

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
				nickNameLogin: true,
				xieYs: "",
				selectvalNumber: "",
				authCode: "",
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
				wxAuth: this.$imageUrl.urls.wxAuth,
				examWidght: "",
				flag: "",
				id: "",
				name: "",
				reportVersion: "",
				FROMTO: "",
				nickName:""
			};
		},
		onShow() {
			this.xieYs = xieY;

		},
		methods: {
			getNickname() {
				let _this=this
				uni.createSelectorQuery().in(_this) // 注意这里要加上 in(this)
					.select("#nickname-input")
					.fields({
						properties: ["value"],
					})
					.exec((res) => {
						_this.nickName = res?. [0]?.value
					uni.setStorageSync('uerInfonickName',  res?. [0]?.value) 
						 
					 
						 
					})
						 
			},
			getUserProfilegetUserProfile(e) {


				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res => {
						console.log("---1-->", res.userInfo);
					},
					fail: err => {
						console.log(err)
					}
				})

			},
			noNumber() {
				this.$refs['popup'].close();
			},
			navToPhone(messarr) {
				uni.navigateTo({
					url: "/pages/user/phoneLogin"
				})
			},
			navToprofile() {
				uni.navigateTo({
					url: "/scaleTestResults/profile/index"
				})
			},
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

			getUserProfile() {
				var that = this

				// uni.getUserInfo({
				// 	provider: 'weixin',
				// 	success: (res) => {

				// 		console.log("获取用户信息>", res);
				// 		console.log("用户头像", res.userInfo.avatarUrl)
				// 		console.log("用户头像nickName", res.userInfo)
				// 		that.petName = res.userInfo.nickName;
				// 		wx.showToast({
				// 			title: '获取中...',
				// 			duration: 2000,
				// 			icon: 'loading',
				// 			mask: true,
				// 		})
				uni.login({
					provider: 'weixin',
					success: res => {
						if (res.code) {
							that.code = res.code;
							console.log("-----code------>", res);


							that.$refs['popup'].open();

						} else {
							console.log('登录失败:' + res.errMsg)
						}
					}
				})
				// 	}
				// })

			},
			wxloginUser() {


				let _this = this;

				console.log("-----上传的数据------>", _this.petName);
				let para = {
					code: _this.code,
					petName: _this.petName,
					modelPhone: _this.phone
				}
				let par = _this.$CryptoJS.AesEncrypt(JSON.stringify(para))
				_this.$request.post({
						url: codeOpenid,
						data: {
							data: par
						}
					})
					.then(
						res => {
							uni.setStorageSync('setUerInfo', res.data)
							_this.setUserInfo(res.data)
							_this.$refs['popup'].close();

							if (_this.examWidght == "examWidght") {
								uni.navigateTo({
									url: "/examWidght/examWidght/index?flag=" + _this.flag + "&id=" + _this.id +
										"&name=" + _this
										.name + "&reportVersion=" + _this.reportVersion + "&examWidght=examWidght"
								})
							} else if (_this.FROMTO == "cognitiveTasksPage") {
								uni.navigateTo({
									url: "/cognitiveTasksPage/" + _this.examWidght
								})
							} else if (_this.FROMTO == "cognitiveTasksTestResult") {
								uni.navigateTo({
									url: "/cognitiveTasksTestResult/" + _this.examWidght
								})
							} else {
								uni.switchTab({
									url: '/pages/tab/scaleTest/index',
									animationType: "fade-in",
								})
							}


						},
						res => {

							console.log("登录返回123", res)

						})

			},
			getAuthInfo(e) {


				const {
					avatarUrl
				} = e.detail
				console.log("登录返回e.detail", e.detail)
				uni.setStorageSync("userInfoavatarUrl", avatarUrl)
				this.getUserProfile();

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
						title: "请输入账号"
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
			if (options.examWidght) {
				this.examWidght = options.examWidght;

				if (options.flag) {
					this.flag = options.flag;
				}
				if (options.id) {
					this.id = options.id;
				}
				if (options.name) {
					this.name = options.name;
				}
				if (options.reportVersion) {
					this.reportVersion = options.reportVersion;
				}
				if (options.FROMTO) {
					this.FROMTO = options.FROMTO
				}

			}
		}
	};
</script>

<style scope>
	.positionRelat {
		position: relative;
	}

	.color_3 {
		color: #a2a2a2;
	}

	.wx_style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background: rgba(83, 183, 56);
		border-radius: 25px;
		padding: 14rpx 0;
	}

	.uni-popup-style {
		padding: 50rpx 40rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
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

	.weui-input {
		font-size: 12px;
		color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		height: 54px;
	}

	.weui-input::-webkit-placeholder {
		color: #fff;
	}

	.loginTop {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		margin-bottom: 120px
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

	.yijian {
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


	.wx_login_style {
		width: 64rpx;
		height: 64rpx;


	}

	.minHeight100 {
		position: relative;
	}

	.positionY {
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}
</style>
