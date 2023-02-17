<template>
	<div class="login minHeight100 content_app bg_img" :style="'background-image: url('+logo_bg+');'">
		<view class="loginContent">
			<view class="loginTop">
				<image class="loginImg" :src="logo" mode="aspectFill"></image>
			</view>

			<comp-input @myblurSelectval="myblurSelectval" :array="array" :selectedType="false" :firstName="user_name"
				:selectval="selectval" :password='false' @myblur="handleUserPhone" placer="请输入手机号">
			</comp-input>

			<codeTime :areacode="selectvalNumber" @myblur="handleCode" :phone="phone" />
			<comp-input :password='false' :firstName="xm_login" @myblur="handleUserName" placer="请输入用户名">
			</comp-input>

			<rigester-list id="1" :firstName="xb_login" :inputValue="gender" @myblur="isLeave" placer="选择性别" />
			<rigester-list id="2" :firstName="birth_login" :inputValue="birthday" @myblur="handleDate" placer="选择日期" />
			 
			<comp-input :password='false' :selectedType="false" :firstName="zy__login" @myblur="handleReProfession"
				placer="请输入职业" />
			<comp-input :password='true' :firstName="password_login" @myblur="handleRePassword" placer="请输入密码" />
			</comp-input>

			<view class="loginAccount textColorff fontSize15 paddingTop20" @click="nativeToPage">
				<text class="textColor9e mrr">已有账号？去登录</text>

			</view>
			<view class="loginButtom content_app11 disRowcCenter wai-style-text">
				<u-button @click="handleOnLogins" :disabled="disabled" size="large"
					class="content_app11 textColorff weight wai-style-100 fontSize19"  shape="circle">注册</u-button>
			</view>


			<u-picker :show="show" @cancel="show = false" :columns="columns" @confirm="confirm"></u-picker>
			<u-datetime-picker ref="datetimePicker" @cancel="pick = false" @confirm="getDate"
				:show="pick"  mode="date" :formatter="formatter"></u-datetime-picker>
		</view>

	</div>

</template>

<script>
	import {
		firstName,
		firstName1
	} from "@/static/images/lxg/base64.js";
	import {
		saveUser
	} from '@/api/index.js'
	import compInput from '@/components/compInput'
	import rigesterList from '@/components/compInput/rigesterList'

	import codeTime from '@/components/timeTag/codeTime'
	import {
		mapGetters
	} from "vuex"
	export default {
		components: {
			compInput,
			rigesterList,
			codeTime,
		},
		computed: {
			...mapGetters({
				authCodeData: "authCodeData"
			})
		},
		data() {
			return {
				pick: false,
				show: false,
				columns: [
					['男', '女']
				],
				getCodeLists: [],
				array: [],
				selectvalNumber: "001",
				selectval: "", 
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
				rePassword: "",
				disabled: false,
				email: "",
				phone: "",
				authCode: "",
				name: "",
				profession: "",
				password: "",
				birthday: "",
				gender: "",
				itemList: ['男', '女'],
				logo: this.$imageUrl.urls.logo_01,
				user_name: this.$imageUrl.urls.phoneNumLogin, 
				possword: this.$imageUrl.urls.password, 
				yzm_login: this.$imageUrl.urls.yzm_login, 
				xm_login: this.$imageUrl.urls.xm_login, 
				xb_login: this.$imageUrl.urls.xb_login, 
				birth_login: this.$imageUrl.urls.birth_login, 
				zy__login: this.$imageUrl.urls.zy__login, 
				password_login: this.$imageUrl.urls.password_login, 
				logo_bg: this.$imageUrl.urls.login_bg, 
				};
		},
		onShow() {
			console.log("authCodeData", this.authCodeData)
		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		methods: {
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			handleUserPhone(messarr) {
				this.phone = messarr[0]
			},
			handleCode(messarr) {
				this.authCode = messarr[0]
			},
			handleUserName(messarr) {
				this.name = messarr[0]
			},
			handleReProfession(messarr) {
				this.profession = messarr[0]
			},
			handleRePassword(messarr) {
				this.password = messarr[0]
			},
			handleDate() {
				this.pick = true  
				 
			},
			getDate(e) {

				const timeFormat = uni.$u.timeFormat
				let dt = timeFormat(e.value, 'yyyy-mm-dd');
				this.birthday = dt
				this.pick = false 
				// this.birthday
				// console.log(timeFormat(e.value, 'yyyy-mm-dd'))
				// console.log(timeFormat(e.value, 'yyyy-mm-dd hh:MM'))
				// console.log(timeFormat(e.value, 'yyyy-mm')) 
				// this.birthday = timeFormat(e.value, 'yyyy-mm-dd')  

			},
			 
			myblurSelectval(messarr) {
				this.selectval = this.array[messarr]
				this.selectvalNumber = this.getCodeLists[messarr].value

			},
			showCloseFunction() {
				_this.show = false;
			},
			isLeave(v) {
				console.log(v)
				let _this = this;
				_this.show = true;
				// uni.showActionSheet({
				// 	itemList: _this.itemList,
				// 	success: function(res) {
				// 		_this.gender = _this.itemList[res.tapIndex] 
				// 	},
				// 	fail: function(res) {
				// 		console.log(res.errMsg);
				// 	}
				// });
			},
			confirm(e) {
				this.gender = e.value[0]
				console.log('confirm', e.value[0])
				this.show = false
			},


			nativeToPage() {
				uni.navigateTo({
					url: "/pages/user/login"
				})
			},
			handleOnLogins() {
				if (this.password != this.rePassword) {
					uni.showToast({
						icon: "none",
						title: "Check password"
					})
					return
				}
				if (this.username == "") {
					uni.showToast({
						icon: "none",
						title: "wrong user name"
					})
					return
				}

				var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				var ok = emailRegExp.test(this.email);

				if (ok) {

				} else {
					// 输入的格式不符合要求
					uni.showToast({
						icon: "none",
						title: "Error email"
					})
					return
				}

				// let pa = {}
				//     let par = {}
				//     console.log(this.data.phone)
				//     console.log(this.data.authCode)
				//     console.log(this.data.name)
				//     console.log(this.data.gender)
				//     console.log(this.data.date)
				//     console.log(this.data.profession)
				//     console.log(this.data.password)
				//     pa['authCode'] = this.data.authCode
				//     pa['verification'] = this.data.vCode
				//     par['birthday'] = this.data.date 
				//     par['gender'] = 0
				//     par['id'] = ""
				//     par['password'] = md5.md5(this.data.password)
				//     par['petName'] = this.data.name
				//     par['phone'] = this.data.phone
				//     par['profession'] = this.data.profession
				//     pa['data'] = par
				//     console.log(pa)

				let params = {
					authCode: this.authCode,
					verification: this.authCodeData,
					data: {
						birthday: this.birthday,
						gender: this.gender,
						password: this.$md5.md5(this.password),
						petName: this.name,
						phone: this.phone,
						profession: this.profession,
						id: "",
					},
                }
               this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				this.$request
					.post({
						url: saveUser,
						data: {data:params}
					})
					.then(
						res => {
						uni.navigateTo({
								url: "/pages/user/login"
							})

						},
						res => {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					);


			}
		},
	};
</script>

<style scope> 
	.bg_img {
		background-size: 100% 100%;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}

	.loginContent {
		padding: 20px;
		padding-top:100rpx;
	}

	.loginTop {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 60upx;
	}


	.loginButtom {
		height: 100rpx;
		margin-top: 40px;
		font-size: 36upx;
		border-radius: 50rpx;
		background-color: #3FB4C9 !important;
	}

	.loginButtom button {
		border-radius: 100upx;
	}

	.loginImg {
		width: 80%;
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
 ::v-deep .u-button--info{
    color: #323233;
    background-color:#3FB4C9 ;
    border-color: #ebedf0;}
	.loginAccount {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.wai-style-100 {
		width: 100%;
		text-align: center;
		border-radius: 50rpx;
		background-color: #3FB4C9 !important;
		background: #3FB4C9 !important;
	}
	.wai-style-text button{
		background-color: #3FB4C9 !important;
		background: #3FB4C9 !important;
		color: #fff !important;
	}
	 
</style>
