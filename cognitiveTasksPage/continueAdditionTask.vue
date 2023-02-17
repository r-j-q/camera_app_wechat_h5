<template>
	<div>
		<!-- <van-nav-bar
                :title="subjectInfo.name"
                left-text="返回"
                left-arrow
                @click-left="goBack"
        /> -->



		<div v-if="!testResultDivShow" class="explan">

			<div>
				<!-- <p>{{ subjectInfo.mobileTestDescription }}</p> -->
				<p>连续加法测试练习次数：2次两个数加法，2次三个数加法，2次四个数加法。练习结束后自动判断被试成绩，全部回答正确，说明您已掌握测试规则，请点击开始按钮，进入正式测试。否则请您认真阅读测试规则，点击重新测试按钮继续练习。
				</p>
			</div>
			<div class="btnArea">
				<u-button type="success" size="large" @click="startTest"
					class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
					{{ buttonName }}
				</u-button>
				<!-- <van-button round block type="info" @click="startTest()">{{ buttonName }}</van-button> -->
			</div>
		</div>
		<div v-if="testResultDivShow" class="testResultDiv">
			<table class="test_result">
				<tr>
					<th>指标名称</th>
					<th>测试结果</th>
				</tr>
				<tr>
					<td>测试题目总数：</td>
					<td>{{ totalCount }}</td>
				</tr>
				<tr>
					<td>正确题目数：</td>
					<td>{{ rightCount }}</td>
				</tr>
				<tr>
					<td>测试成绩：</td>
					<td>{{ userScore }}</td>
				</tr>
			</table>
		</div>

		<div v-if="testFlag" class="activeTask"
			:style="'background-image: url(' + add_bg + ');background-size: cover;background-repeat: no-repeat;'">


			<div v-if="testTypeCode == 1" class="progress-content">
				<u-line-progress height="34rpx" :percentage="((300 - countDownTime) / 300) * 100" pivot-text="任务进度"
					color="#f2826a">

					<text v-if="countDownTime < 260" class="fontSize12">任务进度</text>
					<text v-else class="fontSize12"></text>
				</u-line-progress>
			</div>

			<div v-if="answerButtonShow" class="digital-input-content">



				<div class="add-mid"
					:style="'background-image: url(' + add_mid + ');background-size: cover;background-repeat: no-repeat;'">
					<p class="digital-show">
						<span class="bn-in"> {{ showSpanText }}</span>
					</p>
					<div class="num-btn">
						<u-button type="success" size="large" @click="userClick(1)"
							class="content_app11   weight fontSize30 mt10 " shape="circle">
							1
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(2)"
							class="content_app11   mrl mrr weight fontSize30 mt10" shape="circle">
							2
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(3)"
							class="content_app11   weight fontSize30 mt10" shape="circle">
							3
						</u-button>
						<!-- <van-button round type="info" @click="userClick(1)">1</van-button>
						<van-button round type="info" @click="userClick(2)">2</van-button>
						<van-button round type="info" @click="userClick(3)">3</van-button> -->
					</div>
					<div class="num-btn">
						<u-button type="success" size="large" @click="userClick(4)"
							class="content_app11   weight fontSize30 mt10" shape="circle">
							4
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(5)"
							class="content_app11  mrl mrr  weight fontSize30 mt10" shape="circle">
							5
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(6)"
							class="content_app11   weight fontSize30 mt10" shape="circle">
							6
						</u-button>
						<!-- <van-button round type="info" @click="userClick(4)">4</van-button>
						<van-button round type="info" @click="userClick(5)">5</van-button>
						<van-button round type="info" @click="userClick(6)">6</van-button> -->
					</div>
					<div class="num-btn">
						<u-button type="success" size="large" @click="userClick(7)"
							class="content_app11   weight fontSize30 mt10" shape="circle">
							7
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(8)"
							class="content_app11    weight fontSize30 mt10" shape="circle">
							8
						</u-button>
						<view class="w_10"> </view>
						<u-button type="success" size="large" @click="userClick(9)"
							class="content_app11   weight fontSize30 mt10" shape="circle">
							9
						</u-button>
						<!-- <van-button round type="info" @click="userClick(7)">7</van-button>
						<van-button round type="info" @click="userClick(8)">8</van-button>
						<van-button round type="info" @click="userClick(9)">9</van-button> -->
					</div>
					<div class="num-btn">
						<u-button type="success" size="large" @click="userClick(0)"
							class="content_app11 textColorff weight fontSize30 mt10" shape="circle"
							style="width: 60px;">
							0
						</u-button>
						<!-- <van-button round type="info" @click="userClick('0')">0</van-button> -->
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
import {
	cognizeADDITION,
	subjectInfoGetSubjectByFlag
} from "@/api/index.js"
import { taskImgs } from "./data/continueAdditionTask.js";

export default {
	name: "continueAdditionTask",
	data() {
		return {
			countDownTime30: 30,
			userId: "",
			testResult: {},
			countDownTime: 300, //倒计时时长
			testCount: 6,
			taskId: "", // 认知任务id
			saveFlag: false, //结果保存按钮显示标志
			subjectInfo: null, //认知任务详情
			answerButtonShow: false,
			buttonShow: true, // 控制按钮显示隐藏
			passTestExam: false, //练习测试通过标识
			testType: "练习测试", // 正式测试
			buttonName: "开始练习", // 正式测试  // 重新练习
			testTypeCode: 0, // 0-练习测试 1-正式测试 2-重新测试
			testFlag: false, //true继续测试，false结束测试
			countDownInterval: "", //倒计时定时器
			additionNumCount: 2, //当前轮需要计算的数字个数
			currentAnswer: 0, //当前题答案
			showSpanText: "", //显示题目文本
			totalCount: 0, //测试总次数
			rightCount: 0, //正确总次数
			rightCount2: 0, //n个数相加正确次数
			rightCount3: 0,
			rightCount4: 0,
			rightCount5: 0,
			rightCount6: 0,
			currentRoundRightCount: 0, //当前轮正确次数
			stepWidth: 1, //练习测试时步长为2，正式测试为1
			stepEndFlag: 6,
			testState: false,
			testResultDivShow: false, //控制测试结果显示
			testResultStr: "", //测试结果
			userScore: "", //用户总成绩
			rightThree: 0, //连续对3次
			wrongTwo: 0, //连续错两次
			rightCountList: [], //统计每个层级答对个数
			testPlanId: "",
			add_bg: "",
			add_mid: "",
			myInterval30: null
			// add_bg:this.$imageUrl.urls.add_bg,
			// add_mid:this.$imageUrl.urls.add_mid,
		};
	},
	// 页面初始化函数
	onShow() {


		this.add_bg = taskImgs.add_bg;
		this.add_mid = taskImgs.add_mid;
		this.init();
		this.divShow = false;
		this.testState = false;

		this.testResult = {}
		this.countDownTime30 = 30
		this.countDownTime = 300 //倒计时时长
		this.testCount = 6
		this.taskId = "" // 认知任务id
		this.saveFlag = false //结果保存按钮显示标志
		this.subjectInfo = null //认知任务详情
		this.answerButtonShow = false
		this.buttonShow = true // 控制按钮显示隐藏
		this.passTestExam = false //练习测试通过标识
		this.testType = "练习测试"// 正式测试
		this.buttonName = "开始练习" // 正式测试  // 重新练习
		this.testTypeCode = 0 // 0-练习测试 1-正式测试 2-重新测试
		this.testFlag = false //true继续测试，false结束测试
		this.countDownInterval = "" //倒计时定时器
		this.additionNumCount = 2//当前轮需要计算的数字个数
		this.currentAnswer = 0 //当前题答案
		this.showSpanText = ""//显示题目文本
		this.totalCount = 0 //测试总次数
		this.rightCount = 0 //正确总次数
		this.rightCount2 = 0 //n个数相加正确次数
		this.rightCount3 = 0
		this.rightCount4 = 0
		this.rightCount5 = 0
		this.rightCount6 = 0
		this.currentRoundRightCount = 0//当前轮正确次数
		this.stepWidth = 1 //练习测试时步长为2，正式测试为1
		this.stepEndFlag = 6
		this.testState = false
		this.testResultDivShow = false //控制测试结果显示
		this.testResultStr = "" //测试结果
		this.userScore = "" //用户总成绩
		this.rightThree = 0 //连续对3次
		this.wrongTwo = 0 //连续错两次
		this.rightCountList = [] //统计每个层级答对个数
		this.testPlanId = ""

		// clearInterval(this.divShowInteval);
		// clearInterval(this.countDownInterval);
		clearInterval(this.myInterval30);
	},
	destroyed() {
		// clearInterval(this.divShowInteval);
		clearInterval(this.countDownInterval);
		clearInterval(this.myInterval30);
	},
	mounted: function () {
		var _this = this;
		// #ifdef H5
		document.onkeydown = function (e) {
			let key = window.event.keyCode;
			if (key === 122) {
				e.preventDefault();
			}
			if ((57 >= key && key >= 48) || (105 >= key && key >= 96))
				_this.userClick(window.event.key);
		};
		// #endif

	},
	onShareAppMessage(options) {

		var shareObj = {
			path: '/cognitiveTasksPage/continueAdditionTask?examWidght=continueAdditionTask&FROMTO=cognitiveTasksPage', // 默认是当前页面，必须是以‘/'开头的完整路径
			imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function (res) {
				// 转发成功之后的回调
				if (res.errMsg == 'shareAppMessage:ok') { }
			},
			fail: function () {
				if (res.errMsg == 'shareAppMessage:fail cancel') {

				} else if (res.errMsg == 'shareAppMessage:fail') {

				}
			}
		};

		if (options.from == 'button') {
			var eData = options.target.dataset;

			shareObj.path = '/cognitiveTasksPage/continueAdditionTask?examWidght=continueAdditionTask&FROMTO=cognitiveTasksPage';
		}

		return shareObj;
	},
	methods: {
		// handleGetSubjectByFlag(id) {
		// 	this.$request.get({
		// 			url: `${subjectInfoGetSubjectByFlag}/${id}`,
		// 			loadingTip: "加载中...",
		// 			data: {},
		// 		})
		// 		.then(
		// 			(response) => {
		// 				// this.subjectInfo
		// 				// let params = encodeURIComponent(JSON.stringify(response.data[0]));

		// 				console.log("===1211=======>", response)
		// 			})
		// },
		// goBack() {
		//     if(this.testPlanId) {
		//         //来自测试计划列表
		//         this.$router.push({
		//             name: "testPlanClassify",
		//             params: {
		//                 testPlanId: this.testPlanId,
		//             },
		//         });
		//     }else {
		//         this.$router.push("/index/cognitionTask");
		//     }
		// },
		init() {
			// "8af178857cc99369017cc99495660002"
			// this.testPlanId = options.testPlanId || '';
			this.userId = this.$store.state.userInfo.user.id;
			// this.subjectInfo = JSON.parse(sessionStorage.getItem('subjectInfo'));

			// this.imgUrl = this.subjectInfo.imageUrl;
		},
		userClick(answer) {
			//用户点击动作
			this.totalCount++;
			if (answer == this.currentAnswer) {
				if (this.testTypeCode == 1) {
					//正确次数
					this.rightCount++;
					//当前数字个数计算正确数加1
					this.nNumRightCount();
					//本轮正确次数
					this.currentRoundRightCount++;
					// if (
					//   this.additionNumCount <= 6 &&
					//   this.currentRoundRightCount == this.additionNumCount
					// ) {
					//   this.currentRoundRightCount = 0;
					//   this.additionNumCount =
					//     this.additionNumCount + 1 > 6 ? 6 : this.additionNumCount + 1;
					// }
					this.rightThree++;
					this.wrongTwo = 0;
					if (this.rightThree >= 3 && this.wrongTwo == 0) {
						this.additionNumCount++;
						this.rightThree = 0;
						this.wrongTwo = 0;
					}

				} else {
					this.rightCount++;
					if (this.totalCount % 2 == 0) {
						this.additionNumCount =
							this.additionNumCount + 1 > 6 ? 6 : this.additionNumCount + 1;
					}
				}
			} else {
				//分练习时和正式测试时两种情况,练习测试时，不加处理

				//正式测试时要做降级处理
				if (this.testTypeCode == 1) {
					this.currentRoundRightCount = 0;
					// this.additionNumCount -= 1;
					// if (this.additionNumCount == 1) {
					//   this.additionNumCount = 2;
					// }
					this.rightThree = 0;
					this.wrongTwo++;
					if (this.additionNumCount > 2 && this.rightThree == 0 && this.wrongTwo >= 2) {
						this.additionNumCount--;
						this.rightThree = 0;
						this.wrongTwo = 0;
					}
				} else {
					if (this.totalCount % 2 == 0) {
						this.additionNumCount =
							this.additionNumCount + 1 > 6 ? 6 : this.additionNumCount + 1;
					}
				}
			}
			if (this.totalCount == 6 && this.testTypeCode == 0) {
				this.testEnd();
				this.testFlag = false;
				this.showSpanText = "";
				this.answerButtonShow = false;
				return;
			}
			//生成下一道题
			if (this.testFlag) {
				this.createComputeSpanText();
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

			//开始测试
			this.createComputeSpanText();
			// 按钮隐藏
			this.testFlag = true;
			this.buttonShow = false;
			this.answerButtonShow = true;
			this.testState = true;

			//练习测试时进行倒计时，正式测试时进行测试测试校验
			if (this.testTypeCode == 1) {
				this.countDown();
			} else {
				if (this.testTypeCode == 0) {
					this.countDown30()
				}

			}
		},
		testEnd() {

			//计算练习成绩
			if (this.testTypeCode == 0) {

				if (this.totalCount == this.rightCount) {
					//通过测试
					//开始正式测试

					// this.subjectInfo.testDescription = this.subjectInfo.testExplain;
					this.testTypeCode = 1;
					console.log("--正式测试222----->", this.testTypeCode)
					this.buttonName = "正式测试";
					this.testType = "正式测试";
					this.buttonShow = true;
					this.answerButtonShow = true;
					this.testState = false;
					clearInterval(this.myInterval30);
					// this.$message({
					//     message: "通过练习测试，开始进行正式测试！",
					//     type: "success",
					// });
					uni.showToast({
						icon: "none",
						title: '通过练习测试，开始进行正式测试！'
					})

					//this.pageDataInit()
				} else {
					//重新测试

					this.testTypeCode = 0;
					this.buttonName = "重新测试";
					this.buttonShow = true;
					this.testState = false;
					this.answerButtonShow = true;
					uni.showToast({
						icon: "none",
						title: "测试未通过，请点击'重新测试'按钮继续练习！"
					})
					// this.countDown30()
					// 清除定时器
					clearInterval(this.myInterval30);
					this.countDownTime30 = 30;

				}

				this.pageDataInit();
			} else {

				this.testState = false;
				this.getUserTestScore();


				uni.showToast({
					icon: "none",
					title: '测试结束！'
				})
				this.buttonShow = false;
				this.answerButtonShow = false;
				this.showSpanText = "";
			}
		},
		countDown30() {
			// 测试时间倒计时
			this.myInterval30 = setInterval(() => {
				this.countDownTime30--; 
				if (this.countDownTime30 == 0) {
 
						//计算测试结果 
					this.divShow = false;
					this.testState = false;

					this.testResult = {}

					this.countDownTime = 300 //倒计时时长
					this.testCount = 6
					this.taskId = "" // 认知任务id
					this.saveFlag = false //结果保存按钮显示标志
					this.subjectInfo = null //认知任务详情
					this.answerButtonShow = false
					this.buttonShow = true // 控制按钮显示隐藏
					this.passTestExam = false //练习测试通过标识
					this.testType = "练习测试"// 正式测试
					this.buttonName = "开始练习" // 正式测试  // 重新练习
					this.testTypeCode = 0 // 0-练习测试 1-正式测试 2-重新测试
					this.testFlag = false //true继续测试，false结束测试
					this.countDownInterval = "" //倒计时定时器
					this.additionNumCount = 2//当前轮需要计算的数字个数
					this.currentAnswer = 0 //当前题答案
					this.showSpanText = ""//显示题目文本
					this.totalCount = 0 //测试总次数
					this.rightCount = 0 //正确总次数
					this.rightCount2 = 0 //n个数相加正确次数
					this.rightCount3 = 0
					this.rightCount4 = 0
					this.rightCount5 = 0
					this.rightCount6 = 0
					this.currentRoundRightCount = 0//当前轮正确次数
					this.stepWidth = 1 //练习测试时步长为2，正式测试为1
					this.stepEndFlag = 6
					this.testState = false
					this.testResultDivShow = false //控制测试结果显示
					this.testResultStr = "" //测试结果
					this.userScore = "" //用户总成绩
					this.rightThree = 0 //连续对3次
					this.wrongTwo = 0 //连续错两次
					this.rightCountList = [] //统计每个层级答对个数
					this.testPlanId = ""
					// this.myInterval30=null
					uni.showToast({
						icon: "none",
						title: "测试未通过，请点击'重新测试'按钮继续练习！"
					})

					// 清除定时器
					clearInterval(this.myInterval30);
					this.countDownTime30 = 30

				}
			}, 1000);
		},
		countDown() {
			// 测试时间倒计时
			let myInterval = setInterval(() => {
				this.countDownTime--;
 

				if (this.countDownTime == 0) { 
					//计算测试结果
					this.testEnd();
					// 清除定时器
					clearInterval(myInterval);
					this.countDownTime = 300;
				}
			}, 1000);
		},
		createComputeSpanText() {
			//生成下一道题和答案
			this.testCount--;
			var tempSpanText = "";
			var additionResult = 0;
			for (var i = this.additionNumCount; i > 0; i--) {
				var tempNum = Math.floor(Math.random() * 10);
				additionResult += tempNum;
				tempSpanText += tempNum + "+";
			}
			this.showSpanText = tempSpanText.substr(0, tempSpanText.length - 1);
			this.currentAnswer = additionResult % 10;
		},
		nNumRightCount() {
			// switch (this.additionNumCount) {
			//   case 2:
			//     this.rightCount2++;
			//     break;
			//   case 3:
			//     this.rightCount3++;
			//     break;
			//   case 4:
			//     this.rightCount4++;
			//     break;
			//   case 5:
			//     this.rightCount5++;
			//     break;
			//   case 6:
			//     this.rightCount6++;
			//     break;
			//   default:
			//     break;
			// }
			let isIndex = this.rightCountList.findIndex(item => item.key == this.additionNumCount);
			if (isIndex !== -1) {
				this.rightCountList[isIndex].value++;
			} else {
				this.rightCountList.push({
					key: this.additionNumCount,
					value: 1
				})
			}

		},
		pageDataInit() {
			this.rightCount2 = 0;
			this.rightCount3 = 0;
			this.rightCount4 = 0;
			this.rightCount5 = 0;
			this.rightCount6 = 0;
			this.totalCount = 0;
			this.rightCount = 0;
			this.additionNumCount = 2;
			this.currentAnswer = 0;
			this.currentRoundRightCount = 0;
		},
		getUserTestScore() {
			// console.log(this.rightCountList,"测试记录列表")
			this.testResult.userId = this.userId;
			this.testResult.total = this.totalCount;
			// this.testResult.testPlanId = this.$route.query.testPlanId;
			// let data = [];
			// data.push({ key: 2, value: this.rightCount2 });
			// data.push({ key: 3, value: this.rightCount3 });
			// data.push({ key: 4, value: this.rightCount4 });
			// data.push({ key: 5, value: this.rightCount5 });
			// data.push({ key: 6, value: this.rightCount6 });
			// this.testResult.data = data;
			// this.userScore = parseFloat(
			//   Math.log2(
			//     this.rightCount2 * Math.pow(2, 0) +
			//       this.rightCount3 * Math.pow(2, 1) +
			//       this.rightCount4 * Math.pow(2, 2) +
			//       this.rightCount5 * Math.pow(2, 3) +
			//       this.rightCount6 * Math.pow(2, 4)
			//   )
			// ).toFixed(2);
			// this.testResult.score = this.userScore;

			this.testResult.data = this.rightCountList;
			let sum = 0;
			if (this.rightCountList.length > 0) {
				this.rightCountList.map((item) => {
 
					sum += item.value * Math.pow(2, item.key - 2)
				});
			}
          this.testResult.score = isFinite( parseFloat(Math.log2(sum)).toFixed(2)) ?parseFloat(Math.log2(sum)).toFixed(2):'0';
          this.userTestResultSave();
		},
		userTestResultSave() {

			let params = {
				...this.testResult
			}
			//跳转页面到结果页面
			let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
			this.$request
				.post({
					url: cognizeADDITION,
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
						url: "/cognitiveTasksTestResult/testResult?id=" + id + "&messageShare=1&flag=" + getApp()
							.globalData.flag
					})
					console.log("旧====>", isFalse)
				}

			}, 1000)



		},
		// goTestResult(id){


		// this.$http.get(`getRecordById?id=${id}`, {}, (res) => {
		//     if (res.code == 2001) {
		//         this.$toast.fail(res.msg);
		//         return;
		//     }
		//     if (res && res.code == 200) {
		//         if (JSON.parse(res.data?.userRecordEntity?.testResult).versionNo == "2.0.1") {
		//             //跳转新测试结果模版数据暂存本地
		//             // this.$store.dispatch('setTestResult',JSON.parse(res.data?.userRecordEntity?.testResult));
		//             this.$store.dispatch('setTestResult',res?.data);
		//             this.$router.push({
		//                 name: "testResultNew",
		//                 query: {
		//                     id: res.data?.userRecordEntity?.id,
		//                     title: res.data?.userRecordEntity?.name,
		//                     testPlanId: this.testPlanId || '',
		//                     come: 1, //1-来自认知任务列表，2-测试记录列表
		//                 },
		//             });
		//         } else {
		//             //跳转旧测试结果模版

		//             let testResult=  JSON.parse(res.data?.userRecordEntity?.testResult)[0].version;

		//             if( testResult == 2 ) {
		//                 this.$router.push("/testRecordsSCl?id=" + id);
		//             }else {
		//                 this.$router.push( "/testResult?flag=" + res.data?.userRecordEntity?.flag + "&id=" + id);
		//             }
		//         }

		//     } else {
		//         this.$toast.fail("获取数据失败！服务器异常");
		//     }
		// });
		// },
	},
}
</script>

<style scoped>
@import url('./css/continueAdditionTask.css');
</style>
