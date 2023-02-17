<template>
	<div>
		<van-nav-bar :title="subjectInfo.name" left-text="返回" left-arrow @click-left="goBack" />
		<div v-if="!testResultDivShow" class="explan">
			<!-- LOGO  -->
			<!--<h1>{{subjectInfo.name}}</h1>-->
			<div>
				<p>{{ subjectInfo.mobileTestDescription }}</p>
			</div>
			<div class="btnArea">
				<u-button type="success" size="large" @click="startTest"
					class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
					{{ buttonName }}
				</u-button>
			</div>
		</div>
		<div v-if="testFlag" class="activeTask"
			:style="'background-image: url('+alert_bg+');background-size: cover;background-repeat: no-repeat;'"
			@click="userClick()">
			<div v-if="testTypeCode == 1" class="progress-content">
				<van-progress :percentage="((60 - testCount) / 60) * 100" pivot-text="任务进度" color="#f2826a" />
			</div>

			<div class="glass_wrap">
				<div class="glass">
					<div class="cognitiveTask" v-if="divShow"></div>
					<p class="timingBox" v-show="showCountDown">
						{{ countDownStr }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		taskImgs
	} from "./data/CoginitiveTask.js";
	export default {
		name: "CoginitiveTask",
		data() {
			return {
				userId: "",
				countDownTime: 20, //倒计时时长
				testCount: 60, //正式测试时60次结束
				userResponseMilliSeconds: 0, //当前刺激用户反应时间
				userTestAnswer: [], //用户测试反应记录
				taskId: "", // 认知任务id
				saveFlag: false, //结果保存按钮显示标志
				subjectInfo: "", //认知任务详情
				divShow: false, // 控制黑框显示隐藏
				buttonShow: true, // 控制按钮显示吟唱
				passTestExam: false, //练习测试通过标识
				testType: "练习测试", // 正式测试
				testFlag: false,
				buttonName: "开始练习", // 正式测试  // 重新练习
				testTypeCode: 0, // 0-练习测试 1-正式测试 2-重新测试
				startMilliSeconds: 0, //div出现时的毫秒数
				divShowInteval: null, //控制div显示的定时器
				countDownInterval: null, //倒计时定时器
				myInterval: null,
				qualifiedCount: 0, //点击合格数
				unQualifiedCount: 0, //点击不合格数
				cuntdownMinMilliSeconds: 2000, //练习时   2-4秒  2000
				cuntdownMaxMilliSeconds: 4000, //正式测试时2-12秒
				testState: false, // 开始测试
				testResultDivShow: false, //控制结果展示隐藏
				pass05SecRate: "", //超过0.5秒的比例
				pass1SecRate: "", //超过1秒的比例
				severalTime: "", //平均时长(ms)
				showCountDown: true,
				countDownStr: "练习马上开始！",
				redayTime: 5,
				countDown2: null,
				alert_bg: ""
			};
		},
		// 页面初始化函数
		onShow() {
			this.userId = this.$store.state.userInfo.user.id;
			this.alert_bg = taskImgs.alert_bg;
			// this.testPlanId = this.$route.params.testPlanId || "";
			// this.userId = JSON.parse(sessionStorage.getItem("userInfo")).id;
			this.subjectInfo = JSON.parse(uni.getStorageSync("subjectInfo"));
			this.imgUrl = this.subjectInfo.imageUrl;
		},
		mounted: function() {},
		destroyed() {
			clearInterval(this.divShowInteval);
			clearInterval(this.countDown2);
			clearInterval(this.myInterval);
		},
		methods: {
			goBack() {
				if (this.testPlanId) {
					//来自测试计划列表
					this.$router.push({
						name: "testPlanClassify",
						params: {
							testPlanId: this.testPlanId,
						},
					});
				} else {
					this.$router.push("/index/cognitionTask");
				}
			},
			format(percentage) {
				return percentage === 100 ? "测试已完成" : "任务进度";
			},
			userClick() {
				//用户点击动作
				if (this.divShow) {
					this.userResponseMilliSeconds =
						new Date().getTime() - this.startMilliSeconds;
					if (this.userResponseMilliSeconds > 500) {
						this.unQualifiedCount++;
					} else {
						this.qualifiedCount++;
					}
					this.divShow = false;
				} else {
					this.unQualifiedCount++;
					uni.showToast({
						icon: "none",
						title: '错误点击！',
						duration: 500 // 持续展示 toast
					})
				}
			},
			startTest() {
				if (!this.userId) {
					uni.showToast({
						icon: "none",
						title: '请先登录！'
					})
					getApp().jumpToTestRecordLogin()
					return;
				}
				this.startTestTime = new Date().getTime();
				this.testState = true;
				this.buttonShow = false;
				this.testFlag = true;

				this.showCountDown = true;
				if (this.testTypeCode == 0) {
					this.countDownStr = "练习马上开始！";
				} else {
					this.countDownStr = "测试马上开始！";
				}
				// 测试准备倒计时
				this.countDown2 = setInterval(() => {
					if (this.redayTime == 0) {
						// 测试开始
						this.countDownStr = "开始";
						this.redayTime = 5;
						setTimeout(() => {
							this.showCountDown = false;
						}, 1000);
						clearInterval(this.countDown2);
						if (this.testTypeCode == 0) {
							this.countDownTime = 20;
							this.countDown();
						}
						this.divShowInteval = setInterval(() => {
							this.divRandomShow();
							if (this.testTypeCode == 1) {
								this.testCount--;
								if (this.testCount == 0) {
									//计算测试结果
									this.computeScore();
									//清除div控制定时器
									clearInterval(this.divShowInteval);
								}
							}
						}, Math.floor(Math.random() * (this.cuntdownMaxMilliSeconds - this
							.cuntdownMinMilliSeconds + 1)) + this.cuntdownMinMilliSeconds);
					} else {
						this.countDownStr = this.redayTime;
						this.showCountDown = true;
						this.redayTime--;
					}
				}, 1000);
			},
			testEnd() {
				this.testState = false;
				this.testFlag = false;
				uni.showToast({
					icon: "none",
					title: '测试结束！'
				})
			},
			computeScore() {
				//计算练习成绩
				if (this.testTypeCode == 0) {
					let qualifiedRate =
						(this.qualifiedCount * 100) /
						(this.unQualifiedCount * 100 + this.qualifiedCount * 100);
					if (qualifiedRate >= 0.6) {
						uni.showToast({
							icon: "success",
							title: '练习测试通过'
						})
						this.subjectInfo.testDescription = this.subjectInfo.description;
						this.passTestExam = true;
						this.buttonName = "正式测试";
						this.buttonShow = true;
						this.testType = "正式测试";
						this.testState = false;
						this.testFlag = false;
						this.testTypeCode = 1;
						this.cuntdownMaxMilliSeconds = 6000;
					} else {
						this.divShow = false;
						this.passTestExam = false;
						this.buttonName = "重新练习";
						this.buttonShow = true;
						this.testState = false;
						this.testFlag = false;
						// this.$message({
						//     message: "测试未通过，请点击'重新测试'按钮继续练习！",
						//     type: "warning",
						// });
						uni.showToast({
							icon: "none",
							title: '测试未通过，请点击重新测试按钮继续练习！'
						})
					}
				} else {
					this.testState = false;
					this.testFlag = false;
					//结果保存
					this.userResponserSave();
					uni.showToast({
						icon: "success",
						title: '测试结束'
					})
					this.buttonShow = false;
				}
			},
			countDown() {
				// 测试时间倒计时
				this.myInterval = setInterval(() => {
					this.countDownTime--;
					if (this.countDownTime == 0) {
						//计算测试结果
						this.computeScore();
						// 清除定时器
						clearInterval(this.myInterval);
						this.countDownTime = 0;
						//清除div控制定时器
						clearInterval(this.divShowInteval);
					}
				}, 1000);
			},
			divRandomShow() {
				if (this.testTypeCode == 1) {
					this.userTestAnswer.push({
						key: 60 - this.testCount,
						value: this.userResponseMilliSeconds == 0 ?
							new Date() - this.startMilliSeconds : this.userResponseMilliSeconds,
					});
				}
				this.divShow = !this.divShow;
				this.userResponseMilliSeconds = 0;
				this.startMilliSeconds = new Date().getTime();
				setTimeout(() => {
					this.divShow = false;
				}, 1000);
			},
			userResponserSave() {
				let params = {
					userId: this.userId,
					data: this.userTestAnswer,
					testPlanId: this.testPlanId
				}
				let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				this.$request
					.post({
						url: 'cognize/ALERTNESS',
						data: {
							data: par
						}
					})
					.then(
						response => {
							if (response?.code == 200) {
								//跳转新测试结果页面
								this.goTestResult(response.data);

							} else {
								uni.showToast({
									title: response?.msg
								})

							}

						},
						err => {
							uni.showToast({
								title: err.msg
							})
						}
					);

				uni.showToast({
					icon: "success",
					title: '测试完成'
				})
			},
			async goTestResult(id) {
				await getApp().getVersionId(id);
				let isFalse = getApp().globalData.isTrue;
				setTimeout(() => {
					if (isFalse) {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id
						})
					} else {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResult?id=" + id +
								"&messageShare=1&flag=" + getApp()
								.globalData.flag
						})
						console.log("旧====>", isFalse)
					}

				}, 1000)
			},
		}
	}
</script>

<style scoped>
	.explan {
		box-sizing: border-box;
		padding: 46px 15px 0;
	}

	.explan h1 {
		font-size: 16px;
		color: #222222;
		text-align: center;
	}

	.explan p {
		font-size: 14px;
		color: #666666;
		line-height: 26px;
		text-indent: 15px;
		margin: 20px 0 20px;
	}

	.activeTask {
		box-sizing: border-box;
		padding-top: 46px;
		width: 100%;
		height: 100%;
		/* background: url(../../assets/congnitiveAblitity/alert.png) no-repeat center; */
		background-size: cover;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.progress-content {
		position: absolute;
		width: 100%;
		height: 20px;
		left: 0;
		top: 60px;
		box-sizing: border-box;
		padding: 4px 10px;
	}

	.timingBox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: black;
		font-size: 18px;
		text-align: center;
		line-height: 50px;
		margin: 0 auto;
		z-index: 10;
	}

	.cognitiveTask {
		width: 340px;
		height: 350px;
		background: #000000;
		border-radius: 12px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
