<template>
	<div>

		<div v-if="!saveSuccess" class="explan">
			<div>
				<p>本测试中，测试者需要完成 0-back、1-back和 2-back 三种难度的测试。每个难度的测试都分为两组，每两组之间有10秒的休息时间。在每个组块中，屏幕上会依次呈现一个随机字母。 在 0-back 任务中，测试者需要判断当前呈现的字母是否与本组测试的第一个字母相同，是就点击一下屏幕，不是就不点击屏幕；在 1-back 任务中，测试者需要判断当前呈现的字母与前一个位置呈现的字母是否相同，是就点击一下屏幕，不是就不点击屏幕；在 2-back 任务中，测试者需要判断当前呈现的字母与两个位置前呈现的字母是否相同，是就点击一下屏幕，不是就不点击屏幕。 如您已清楚测试规则，请点击“进入练习测试”按钮进行练习测试。
				</p>
			</div>
			<div class="btnArea">
				<u-button type="success" size="large" @click="startTest"
					class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
					{{ buttonName }}
				</u-button>
				<!-- <van-button round block type="info"  @click="startTest()">{{ buttonName }}</van-button> -->
			</div>
		</div>


		<div style="text-align: center" title="测试结果" v-if="saveSuccess">
			<h1 style="color: red">测试结果:</h1>
			<ul>
				<li>
					<h2>0-back任务测试准确率:{{ back0SuccessRate }}</h2>
				</li>
				<li>
					<h2>1-back任务测试准确率:{{ back1SuccessRate }}</h2>
				</li>
				<li>
					<h2>2-back任务测试准确率:{{ back2SuccessRate }}</h2>
				</li>
			</ul>
		</div>


		<div v-if="testFlag" @click="userClick()" class="activeTask"
			:style="'background-image: url('+rememberAbilityTask+');background-size: cover;background-repeat: no-repeat;'">



			<div class="progress-content" v-if="testTypeCode == 1">
				<u-line-progress height="34rpx"  :percentage="(count / 114) * 100" pivot-text="任务进度" color="#f2826a" >
					<text   class="fontSize12">{{count}}/114</text>
					</u-line-progress>
			</div>

			<div class="glass">
				<h1 class="txt-center test-title">
					({{ nbackIndex }}-back)
				</h1>
				<h2 v-if="countDownSpanShow" class="txt-center" style="color: rgb(240, 248, 255)">
					将在<span style="color: red">{{ countDownTime }}</span>秒后继续测试
				</h2>
				<div class="letterCss txt-center" v-if="divShow && !showAdd">
					{{ currentLetter }}
				</div>
				<div class="focus" v-show="showAdd"
					:style="'background-image: url('+whiteFlag+');background-size: cover;background-repeat: no-repeat;'">
				</div>
			</div>
		</div>
		<div style="text-align: center; padding-bottom: 2rem; display: block">

			<!--    <el-button
		                    class="scaleButton"
		                    type="primary"
		                    v-if="saveFlag"
		                    @click="resultSave()"
		            >结果保存</el-button> -->
			<u-button v-if="saveFlag" type="success" size="large" @click="resultSave"
				class="content_app11 textColorff weight fontSize30 mt10 scaleButton" shape="circle">
				结果保存
			</u-button>
		</div>


	</div>
</template>

<script>
	import {
		cognizeMEMORY,
		cognizeSubjectInfoGetRecallChar
	} from "@/api/index.js"
	import {
		rememberAbilityTask
	} from "./data/rememberAbilityTask.js";

	export default {
		name: "rememberAbilityTask",
		data() {
			return {
				countDownTime: 8, //倒计时时长
				countDownSpanShow: false, //8秒倒计时显示标志
				sourceLetterList: [],
				currentLetter: "", //当前要再屏幕上显示的字母
				currentLetterIndex: 0, //当前显示currentLetterList列表下标
				resultData: {}, //接口返回数据
				currentLetterList: {}, //待展示的字母列表
				nbackIndex: 0, //0,1,2:0-back,1-back,2-back
				taskName: "back0", //back0,back1,back2
				testTurnCount: 0, //正式测试轮数 1，2
				taskId: "", // 认知任务id
				saveFlag: false, //结果保存按钮显示标志
				subjectInfo: "", //认知任务详情
				divShow: false, // 控制黑框显示隐藏
				showAdd: false,
				buttonShow: true, // 控制按钮显示吟唱
				passTestExam: false, //练习测试通过标识
				saveSuccess: false,
				testFlag: false,
				testType: "练习测试", // 正式测试
				buttonName: "开始练习", // 正式测试  // 重新练习
				testTypeCode: 0, // 0-练习测试 1-正式测试 2-重新测试
				startMilliSeconds: 0, //div出现时的毫秒数
				divShowInteval: "", //控制div显示的定时器
				countDownInterval: "", //倒计时定时器
				userId: "",
				testResult: {},
				userAnswerList: {
					back0: [],
					back1: [],
					back2: [],
				}, //用户答案列表
				testState: false,
				back0SuccessRate: "",
				back1SuccessRate: "",
				back2SuccessRate: "",
				back0backAverageTime: "",
				back1backAverageTime: "",
				back2backAverageTime: "",
				count: 0,
				testPlanId: "", //测试计划ID
				whiteFlag: '',
				rememberAbilityTask: '',
				isClick: true,
				timeOut: 5000
				// add_bg:this.$imageUrl.urls.add_bg,
				// add_mid:this.$imageUrl.urls.add_mid,
			};
		},
		// 页面初始化函数
		onShow() {


		},
		onLoad() {
// add_mid_s
			this.whiteFlag = rememberAbilityTask.whiteFlag;
			this.rememberAbilityTask = rememberAbilityTask.rememberAbilityTask;
			this.init();
			this.getServerInterfaceData();
			// #ifdef H5
			window.addEventListener(
				"popstate",
				function(e) {
					clearInterval(this.divShowInteval);
					clearInterval(this.countDownInterval);
				},
				true
			);
			// #endif
		},
		mounted() {
			// #ifdef H5
			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				if (key === 122) {
					e.preventDefault();
				}
			};
			// #endif
		},
		destroyed() {
			//将定时器进行清除
			clearInterval(this.divShowInteval);
			clearInterval(this.countDownInterval);
		},
		onShareAppMessage(options) {

			var shareObj = {
				path: '/cognitiveTasksPage/rememberAbilityTask?examWidght=rememberAbilityTask&FROMTO=cognitiveTasksPage', // 默认是当前页面，必须是以‘/'开头的完整路径
				imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: function(res) {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					if (res.errMsg == 'shareAppMessage:fail cancel') {

					} else if (res.errMsg == 'shareAppMessage:fail') {

					}
				}
			};

			if (options.from == 'button') {
				var eData = options.target.dataset;

				shareObj.path =
					'/cognitiveTasksPage/rememberAbilityTask?examWidght=rememberAbilityTask&FROMTO=cognitiveTasksPage';
			}

			return shareObj;
		},
		methods: {

			init() {
				this.userId = this.$store.state.userInfo.user.id;
			},
			getServerInterfaceData() {
				this.$request
					.get({
						url: cognizeSubjectInfoGetRecallChar,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {
							if (res.code == 200) {
								this.resultData = res.data;
							}
						})


				// this.$http.get("subjectInfo/getRecallChar", {}, (res) => {
				// 	if (parseInt(res.code) === 200) {
				// 		this.resultData = res.data;
				// 		console.log(this.resultData);
				// 	}
				// });
			},
			userAnswerPost() {

				let params = {
					userId: this.userId,
					data: this.userAnswerList,
					testPlanId: "",
				}

				let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				if (this.isClick) {
					this.isClick = false;
					this.$request
						.post({
							url: cognizeMEMORY,
							data: {
								data: par
							}
						})
						.then(
							response => {
								if (response?.code == 200) {
									//跳转新测试结果页面
									console.log("--response测试 结果------>", response)
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
				}

				setTimeout(() => {
					this.isClick = true;
				}, this.timeOut)



			},
			async goTestResult(id) {
				await getApp().getVersionId(id);
				let isFalse = getApp().globalData.isTrue;

				console.log("旧====>", isFalse)
				setTimeout(() => {
					if (isFalse) {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id + "&messageShare=1"
						})
					} else {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResult?id=" + id +
								"&messageShare=1&flag=" + getApp()
								.globalData.flag
						})

					}

				}, 1000)



			},
			// goTestResult(id) {
			// 	this.$http.get(`getRecordById?id=${id}`, {}, (res) => {
			// 		if (res.code == 2001) {
			// 			uni.showToast({
			// 				title: res?.msg
			// 			}) 
			// 			return;
			// 		}
			// 		if (res && res.code == 200) {
			// 			if (JSON.parse(res.data?.userRecordEntity?.testResult).versionNo == "2.0.1") {
			// 				//跳转新测试结果模版数据暂存本地
			// 				// sessionStorage.setItem("testResult", res.data?.userRecordEntity?.testResult);
			// 				// this.$store.dispatch('setTestResult',JSON.parse(res.data?.userRecordEntity?.testResult));
			// 				this.$store.dispatch('setTestResult', res?.data);
			// 				this.$router.push({
			// 					name: "testResultNew",
			// 					query: {
			// 						id: res.data?.userRecordEntity?.id,
			// 						title: res.data?.userRecordEntity?.name,
			// 						testPlanId: this.testPlanId || '',
			// 						come: 1, //1-来自认知任务列表，2-测试记录列表
			// 					},
			// 				});
			// 			} else {
			// 				//跳转旧测试结果模版

			// 				let testResult = JSON.parse(res.data?.userRecordEntity?.testResult)[0].version;

			// 				if (testResult == 2) {
			// 					this.$router.push("/testRecordsSCl?id=" + id);
			// 				} else {
			// 					this.$router.push("/testResult?flag=" + res.data?.userRecordEntity?.flag + "&id=" +
			// 						id);
			// 				}
			// 			}

			// 		} else {
			// 			uni.showToast({
			// 				title:  "获取数据失败！服务器异常"
			// 			}) 
			// 		}
			// 	});
			// },
			userClick() {
				//用户点击动作
				if (this.currentLetterIndex - 1 >= 0) {
					this.currentLetterList[this.currentLetterIndex - 1].ifUserClick = true;
					this.currentLetterList[this.currentLetterIndex - 1].userResponseTime =
						new Date().getTime() - this.startMilliSeconds;
					console.log(new Date().getTime() - this.startMilliSeconds);
				}
			},
			startTest() {
				if (this.$store.state.userInfo.user.id == "") {
					uni.showToast({
						icon: "none",
						title: '请先登录！'
					})
					getApp().jumpToTestRecordLogin()
					return;
				}
				// console.log("startTest:" + this.testTypeCode);
				//开始测试   ^ 相同为0，不同为1
				//页面数据初始化
				this.pageDataInit();

				//页面按钮操作
				this.divShow = true;
				this.buttonShow = false;
				this.countDownSpanShow = false;
				this.testState = true;
				//显示字母列表
				this.divShowInteval = setInterval(() => {
					this.showAdd = true;
					//this.backgroundColor = ''
					if (this.testTypeCode == 1) {
						this.count++;
						console.log(this.count);
					}
					this.divRandomShow();
				}, 2000);
			},
			testEnd() {},
			computeScore() {
				//计算练习成绩
				let successCount = 0;
				let returnFlag = false;
				for (var i = 0; i < this.currentLetterList.length; i++) {
					if ((this.currentLetterList[i].ifUserClick ^ this.currentLetterList[i].ifNeedClick) == 0) {
						successCount++;
					}
				}
				if (
					(successCount >= Math.ceil(this.currentLetterList.length * 0.5) &&
						this.nbackIndex == 0) ||
					(successCount >= Math.ceil(this.currentLetterList.length * 0.5) &&
						this.nbackIndex == 1) ||
					(successCount >= Math.ceil(this.currentLetterList.length * 0.5) &&
						this.nbackIndex == 2)
				) {
					returnFlag = true;
				}
				return returnFlag;
			},
			countDown() {
				// 测试时间倒计时
				this.countDownInterval = setInterval(() => {
					this.countDownTime--;
					if (this.countDownTime == 0) {
						//开始测试
						this.startTest();
						// 清除定时器
						clearInterval(this.countDownInterval);
						this.countDownTime = 8;
					}
				}, 1000);
			},
			divRandomShow() {
				this.startMilliSeconds = new Date().getTime();
				if (this.currentLetterIndex == this.currentLetterList.length) {
					clearInterval(this.divShowInteval);
					this.currentTurnCompute();
				} else {
					let tempObj = this.currentLetterList[this.currentLetterIndex];
					this.currentLetter = tempObj.letter;
					setTimeout(() => {
						this.showAdd = false;
					}, 1000);
					this.currentLetterIndex++;
				}
			},
			currentTurnCompute() {

				this.divShow = false;
				this.currentLetterIndex = 0;
				// console.log(this.testTypeCode);
				if (this.testTypeCode == 0) {
					//练习测试时，需要判断当前测试结果是否合格，然后进行下一项测试
					if (this.computeScore()) {

						if (this.nbackIndex == 2) {
							//可以进行正式测试
							this.testType = "正式测试";
							this.buttonName = "正式测试";
							this.buttonShow = true;
							this.testTypeCode = 1;
							this.nbackIndex = 0;
							this.taskName = "back0";
							this.testTurnCount = 0;
							this.testState = false;
							this.testFlag = false;
							this.currentLetter = "";
							// this.$message({
							//     message: "您已掌握测试规则，请点击正式测试按钮，进入正式测试！",
							//     type: "success",
							// });
							uni.showToast({
								title: '您已掌握测试规则，请点击正式测试按钮，进入正式测试！'
							})


						} else {
							//继续进行练习测试
							this.nbackIndex++;
							this.countDownSpanShow = true;
							this.taskName = "back" + this.nbackIndex;
							this.testTurnCount = 0;
							this.countDown();
						}
					} else {

						this.testType = "重新练习";
						this.buttonName = "重新练习";
						this.buttonShow = true;
						this.testState = false;
						this.testFlag = false;
						this.currentLetter = "";

						uni.showToast({
							title: "测试未通过，请点击\'重新测试\'按钮继续练习！"
						})

					}
				} else {
					//正式测试时，需要根据情况进行切换任务类型
					//正式测试时的逻辑
					this.testTurnCount++;
					// console.log(this.testTurnCount);
					if (this.nbackIndex == 0) {
						this.userAnswerList.back0.push(this.currentLetterList);
						if (this.testTurnCount == 2) {
							this.nbackIndex++;
							this.countDownSpanShow = true;
							this.taskName = "back" + this.nbackIndex;
							this.testTurnCount = 0;
						}
						this.countDownSpanShow = true;
						this.countDown();
					} else if (this.nbackIndex == 1) {
						this.userAnswerList.back1.push(this.currentLetterList);
						if (this.testTurnCount == 2) {
							this.nbackIndex++;
							this.countDownSpanShow = true;
							this.taskName = "back" + this.nbackIndex;
							this.testTurnCount = 0;
						}
						this.countDownSpanShow = true;
						this.countDown();
					} else if (this.nbackIndex == 2) {
						this.userAnswerList.back2.push(this.currentLetterList);
						if (this.testTurnCount == 2) {
							this.testState = false;
							this.testFlag = false;
							//用户数据保存
							this.userAnswerPost();
							clearInterval(this.countDownInterval);
							// this.$message({
							//     message: "测试结束！",
							//     type: "success",
							// });

							uni.showToast({
								title: "测试结束"
							})
							return "";
						} else {
							this.countDownSpanShow = true;
							this.countDown();
						}
					}
				}
			},
			pageDataInit() {
				this.testFlag = true;
				if (this.testTypeCode == 0) {
					this.sourceLetterList = this.resultData.exerciseList[this.taskName];
				} else {
					this.sourceLetterList =
						this.resultData.examList[this.taskName][this.testTurnCount];
				}
				this.createCurrentLetterList(this.sourceLetterList);
			},
			createCurrentLetterList(sourceLetterList) {
				this.currentLetterList = [];
				for (var i = 0; i < sourceLetterList.length; i++) {
					let tempObj = {
						letter: sourceLetterList[i],
						ifNeedClick: false,
						ifUserClick: false,
						userResponseTime: 0,
					};
					if (i == 0 || i < this.nbackIndex) {
						this.currentLetterList.push(tempObj);
					} else {
						if (
							(this.sourceLetterList[i] == sourceLetterList[0] &&
								this.nbackIndex == 0) ||
							(this.sourceLetterList[i] == sourceLetterList[i - this.nbackIndex] &&
								this.nbackIndex != 0)
						) {
							tempObj.ifNeedClick = true;
						}
						this.currentLetterList.push(tempObj);
					}
				}
			}
		},
	}
</script>

<style scoped>
	@import url('./css/rememberAbilityTask.css');
</style>
