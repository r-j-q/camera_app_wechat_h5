<script>
	import {
		mapGetters
	} from "vuex"
	import {
		codeOpenid,
		getPhone,
		getRecordById
	} from "@/api/index.js"
	import request from './common/request.js'
	const CryptoJS = require('./utils/aes_util.js');
	import {
		baseUrl,
		VERSION_201
	} from '@/common/config.js'
	export default {
		globalData: {
			isTrue: null,
			flag: null
		},
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['userInfo']),
		},



		methods: {
			goBackTask() {
				uni.switchTab({
					url: "/pages/tab/cognitiveTask/index"
				})
			},
			async getVersionId(id) {
				await request
					.get({
						url: `${getRecordById}?id=${id}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {
							if (res.code == 2001) {
								uni.showToast({
									title: res.msg
								})
								return;
							}
							if (res && res.code == 200) {
								console.log("量表返回结果AppVue==", res)
								let versionNo = JSON.parse(res.data?.userRecordEntity?.testResult).versionNo

								if (versionNo == VERSION_201) {
									this.globalData.isTrue = true;
								} else {
									this.globalData.isTrue = false;
									if (res.data?.userRecordEntity?.flag) {
										this.globalData.flag = res.data?.userRecordEntity?.flag;
									}
								}

							}
						})
			},



			// 有参数情况
			jumpToLoginParams(flag, id, name, reportVersion) {
				uni.removeStorageSync('setUerInfo')
				// uni.removeStorageSync('cameraUserInfo')
				//#ifdef MP-WEIXIN  
				uni.navigateTo({
					url: "/pages/user/login?flag=" + flag + "&id=" + id + "&name=" + name + "&reportVersion=" +
						reportVersion + "&examWidght=examWidght"
				});
				//#endif

			},
			jumpToTestRecordLogin() {
				uni.removeStorageSync('userInfoavatarUrl')
				uni.removeStorageSync('setUerInfo')
				uni.removeStorageSync('beginTextData')
				// uni.removeStorageSync('cameraUserInfo')
				//#ifdef MP-WEIXIN  

				uni.navigateTo({
					url: '/pages/user/login'
				});
				//#endif
				//#ifdef H5
				uni.navigateTo({
					url: "/pages/user/phoneLogin"
				})
				//#endif
			},
			mpUpdate() {
				const updateManager = uni.getUpdateManager()

				updateManager.onCheckForUpdate(res => {
					if (res.hasUpdate) {
						uni.showModal({
							content: '更新到最新版本',
							showCancel: false,
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									updateManager.onUpdateReady(res => {
										updateManager.applyUpdate()
									})

									updateManager.onUpdateFailed(res => {
										uni.showModal({
											content: '下载失败，请删除当前小程序后重新打开',
											showCancel: false,
											confirmText: '知道了'
										})
									})
								}
							}
						})
					}
				})

			},
			percentageLineProgress(num, total) {
				if (num == 0 || total == 0) {
					return 0;
				}
				// 小数点后两位百分比
				return (Math.round(num / total * 10000) / 100);
				// return `${num}/${total}`; 

			},
			getUrl(url) {
				if (url.indexOf('%') > -1) {
					url = url.replace(/%/g, '%25');
				}
				return url
			},
			download(resultId) {
				let that = this
				const downloadTask = uni.downloadFile({
					url: `${baseUrl}/result/download/testResult?id=${resultId}`, //下载地址，后端接口获取的链接
					success: (data) => {
						console.log("----6-----》", data.tempFilePath)
						console.log("----7-----》", JSON.stringify(data))
						if (data.statusCode === 200) {
							uni.saveFile({ //文件保存到本地
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									console.log("下载成功" + res.savedFilePath)
									console.log(JSON.stringify(res))
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存!',
										duration: 3000,
									});
									uni.openDocument({
										fileType: 'xlsx',
										filePath: res.savedFilePath,
										success: function(res) {
											console.log('打开文档成功');
										}
									});
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},

		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url("@/static/css/index.css");

	.u-line-progress__line {
		background-color: linear-gradient(to right, #ffd650, #ff8431) !important;
		background-image: linear-gradient(to right, #ffd650, #ff8431) !important;

	}
</style>
