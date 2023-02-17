<template>
	<view class="mine_content" :style="'height:'+heightAll+'px'">
		<view class="mine_content_images displayRowCol"
			:style="'background-image: url('+pro_bg+');background-size: cover;background-repeat: no-repeat;'">
			<view class="">
				<!--  #ifdef H5  -->
				<u-avatar size="160" @click="handleLogin" :src="uAvatarSrc" shape="circle"
					style="background: #f5f5f5!important;"></u-avatar>
				<u-gap height="30"></u-gap>
				<!-- 	<view class="colorFBC457 fontWeight fontSize30">
					<center>{{petName}} </center>
				</view> -->
				<!-- #endif -->
				<!--  #ifdef MP-WEIXIN  -->
               
				<img v-if="avatarUrl" :src="avatarUrl" mode="" class="avatarUrl_style"></img>
				<u-avatar v-else size="160" @click="getAuthInfo" :src="avatarUrl" shape="circle"></u-avatar>
				<u-gap height="30"></u-gap>
				<!-- <view class="colorFBC457 fontWeight fontSize30">
					<center>{{petName}} </center>
				</view> -->
				<!-- #endif -->


			</view>
		</view>

 
		<view @click="jumpToTestRecord"
			class="disRowAround mine_content_list paddingAll bgColorAll borderReduils10 margAll">
			<view class="rowBetweenTop">
				<image :src="cs_jl_pic" mode=""></image>
				<view class="mrl">
					<u--text text="测试记录" size="30"></u--text>
					<u-gap height="30" bgColor="#fff"></u-gap>
					<u--text type="info" size="24" :text="`${totleSize}个`"></u--text>
				</view>
			</view>
			<view class="">
				<u-button shape="circle" text="测试记录"></u-button>
			</view>
		</view>
		<view class="margAll">
			<uni-list>
				<uni-list-item :title="titleLogin" link @click="onLoginOut($event,1)"></uni-list-item>
			</uni-list>


		</view>

		<u-modal :closeOnClickOverlay="closeOnClickOverlay" confirmText="确定" cancelText="取消" :show="showModal"
			@close="onLoginOut" @confirm="confirm">
			<view class="slot-content">
				您确定退出吗？
			</view>
		</u-modal>


	</view>

</template>

<script>
	import {
		xieY
	} from "@/utils/Profile.js"
	var _this;
	import {
		mineTest,
		getPhone,
		codeOpenid
	} from "@/api/index.js"
	import {
		mapActions,
		mapGetters
	} from "vuex"
	export default {
		name: 'index',

		components: {},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				titleLogin: "退出登录",
				xieYs: "",
				closeOnClickOverlay: true,
				showModal: false,
				cs_jl_pic: this.$imageUrl.urls.cs_jl_pic,
				pro_bg: this.$imageUrl.urls.pro_bg,
				heightAll: '100vh',
				uAvatarSrc: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				screenHeight: "100%",
				totleSize: 0,
				avatarUrl: "",
				avatarUrlH5: "https://img01.yzcdn.cn/vant/cat.jpeg",
				settingmine: "",
				loginOut: "",
				// minebg: require("../../../static/images/camera/minebg.png"),
				petName: "",
				isLogin: false

			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			_this.xieYs = xieY

			uni.getSystemInfo({
				success(res) {
					_this.heightAll = res.windowHeight

				}
			})

			if (_this.$store.state.userInfo.user.id != "") {

				// console.log("_this.9999999", _this.avatarUrl)
				_this.getSubjectListByName();
				// _this.petName = _this.userInfo?.user?.petName || ""
				_this.titleLogin = "退出登录";

				_this.avatarUrl =  uni.getStorageSync("userInfoavatarUrl")
				console.log("ssssssssssssssssss", _this.avatarUrl)
			} else {

				_this.avatarUrl = uni.removeStorageSync("userInfoavatarUrl") || "";
				// console.log("_this.avatarUrl", _this.avatarUrl)
				_this.totleSize = 0;
				_this.titleLogin = "登录"
			}

		},
		onTabItemTap(e) {
			console.log("点击了", e);
			// _this.isLogin=false;
			_this.avatarUrl = uni.getStorageSync("userInfoavatarUrl")
			console.log("ssssssssssssssssss", _this.avatarUrl)
		},
		methods: {
			...mapActions({
				setUserInfo: "setUserInfo"
			}),
			 
			loginMP(){
				 
				 let that = this;
						uni.login({
							provider:'weixin',
							success:function(loginRes) {
							// 获取用户信息
							    uni.getUserInfo({
								    provider:'weixin',
									success:function(infoRes){
								   	    that.yonghuwx = infoRes.userInfo
								    	console.log(that.yonghuwx)
									}
								});
							}
						}); 
				 
			},
			navToprofile() {
				uni.navigateTo({
					url: "/scaleTestResults/profile/index"
				})
			},
			noNumber() {
				this.$refs['popup'].close();
			},
			getAuthInfo() {
				getApp().jumpToTestRecordLogin()
			},
			confirm() {
				// _this.isLogin=true;
				_this.setUserInfo({
					user: {
						institutionNo: this.$textContent.institutionNo,
						id: "",
						gid: ""
					},
					gridList: []
				})

				uni.removeStorageSync('userInfoavatarUrl')
				uni.removeStorageSync('setUerInfo')
				uni.removeStorageSync('beginTextData')
				_this.showModal = false;
				_this.onLoginOut()
				// window.location.reload();
				console.log("-获取清除后userInfo的数据-->", _this.$store.state.userInfo.user.id)
			},
			cancel() {},
			onLoginOut() {
				// if ( _this.$store.state.userInfo.user.id != "" && !_this.isLogin) {
				if (_this.$store.state.userInfo.user.id != "") {
					_this.showModal = !_this.showModal
				} else {

					getApp().jumpToTestRecordLogin()
				}


			},

			jumpToTestRecord() {
				// if (_this.$store.state.userInfo.user.id  != "" && !_this.isLogin) {
				if (_this.$store.state.userInfo.user.id != "") {
					uni.navigateTo({
						url: "/scalePage/testRecord/index"
					})
				} else {
					getApp().jumpToTestRecordLogin()

				}

			},
			getSubjectListByName() {
				console.log('--_this.getUserInfo--------->', _this.userInfo);
				_this.$request
					.get({
						url: `${mineTest}/${_this.userInfo?.user?.phone}/${_this.$textContent.institutionNo}`,
						loadingTip: "加载中...",
						data: {
							searchKey: "",
							pageNum: 1,
							pageSize: 10
						},
					})
					.then(
						(res) => {
							if (res.code == 200) {
 
								_this.totleSize = res.data.allNum

							}
						})

			},

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
			handleLogin() {
				if (this.userInfo?.user?.phone) {

				} else {
					uni.navigateTo({
						url: "/pages/user/phoneLogin"
					})
				}

			}

			// loginOuts() {
			// 	uni.showModal({
			// 		content: "你确定要退出吗？",
			// 		success: (res) => {
			// 			if (res.confirm) {

			// 				uni.removeStorageSync('cameraUserInfo');
			// 				uni.navigateTo({
			// 					url: '/pages/user/login'
			// 				});
			// 			}
			// 		}
			// 	})

			// },


			// jumpToDescribe(num, time) {
			// 	if (this.getUserInfo == null) {
			// 		console.log("KKKKKKKKKKKKKK")
			// 		uni.navigateTo({
			// 			url: '/pages/user/login'
			// 		})
			// 		return
			// 	}
			// 	let params = {
			// 		id: num,
			// 		title: ""
			// 	}
			// 	uni.navigateTo({
			// 		url: "/pages/describe/index?item=" + encodeURIComponent(JSON.stringify(params))
			// 	})
			// },



		}
	}
</script>

<style scoped>
	.mine_content {
		width: 100%;
		background-color: #f8f6f9;
	}

	.opendataimg {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		border-radius: 50%;

	}

	.uni-popup-style {
		padding: 50rpx 40rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.mine_content_images {
		height: 424rpx;
		width: 100%;
		/* background-image: url("@/static/images/camera/minebg.png") */
	}

	.mine_content_list {}

	.mine_content_list image {
		width: 60px;
		height: 60px;
	}

	.avatarUrl_style {
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
	}

	.uni-list-item {
		height: 124rpx;
	}
</style>
