<template>
	<div>
		<div v-if="testFlag" :class="{ testMainDiv: !testState, activeTask: testState }"
			:style="'background-image: url('+ruiWenTask+');background-size: cover;background-repeat: no-repeat;'">
			<div class="taskHead">

				<div  class="progress-content">
					<!-- <view class="text_style_title">知觉辨别</view> -->
					<!-- <u-line-progress height="34rpx"
						:percentage="(examIndex - 1 < 0 ? 0 : ((examIndex - 1) / 12) * 100).toFixed(2)"
						color="#f2826a" > -->
						<u-line-progress height="34rpx"
							:percentage="(examIndex - 1 < 0 ? 0 : ((examIndex - 1) / 60) * 100).toFixed(2)"
							color="#f2826a" >
						<text class="fontSize14 fontWeight">{{examIndex}}/60</text>
						</u-line-progress>
				</div>
				<!-- <div v-if="examIndex > 12 && examIndex <= 24" class="progress-content">
					<view class="text_style_title">类同比较</view>
					<u-line-progress height="34rpx"
						:percentage="(examIndex - 1 - 12 < 0 ? 0 : ((examIndex - 1 - 12) / 12) * 100).toFixed(2)"
						pivot-text="类同比较" color="#f2826a" >
						<text class="fontSize14 fontWeight">{{examIndex}}/60</text>
						</u-line-progress>
				</div>
				<div v-if="examIndex > 24 && examIndex <= 36" class="progress-content">
					<view class="text_style_title">比较推理</view>
					<u-line-progress height="34rpx"
						:percentage="(examIndex - 1 - 24 < 0 ? 0 : ((examIndex - 1 - 24) / 12) * 100).toFixed(2)"
						pivot-text="比较推理" color="#f2826a" >
						<text class="fontSize14 fontWeight">{{examIndex}}/60</text>
						</u-line-progress>
				</div>
				<div v-if="examIndex > 36 && examIndex <= 48" class="progress-content">
					<view class="text_style_title">系列关系</view>

					<u-line-progress height="34rpx"
						:percentage="(examIndex - 1 - 36 < 0 ? 0 : ((examIndex - 1 - 36) / 12) * 100).toFixed(2)"
						pivot-text="系列关系" color="#f2826a" >
						<text class="fontSize14 fontWeight">{{examIndex}}/60</text>
						</u-line-progress>
				</div>
				<div v-if="examIndex > 48 && examIndex <= 60" class="progress-content">
					<view class="text_style_title">抽象推理</view>
					<u-line-progress height="34rpx"
						:percentage="(examIndex - 1 - 48 < 0 ? 0 : ((examIndex - 1 - 48) / 12) * 100).toFixed(2)"
						pivot-text="抽象推理" color="#f2826a" >
						<text class="fontSize14 fontWeight">{{examIndex}}/60</text>
						</u-line-progress>
				</div> -->

			</div>
			<div class="glass">

				<img :src="examImgUrl" class="main-img" />

				<div class="answer_wrap"  v-if="examIndex <= 24" >
					<div class="row">
						<div class="col" v-for="(item, index) in answerList" v-if="index < 3">
							<img :key="index" :src="item" alt="" :class="{
                                      active: index === taskList[examIndex - 1].userAnswer - 1,
                                    }" @click="userClick(index + 1)" />
						</div>
					</div>
					<div class="row row_style_list">
						<div class="col" v-for="(item, index) in answerList" :key="index" v-if="index >= 3">
							<img :src="item" alt="" :class="{
                                      active: index === taskList[examIndex - 1].userAnswer - 1,
                                    }" @click="userClick(index + 1)" />
						</div>
					</div>
				</div>
				<div class="answer_wrap"  v-if="examIndex > 24" >
					<div class="row">
						<div class="col" v-for="(item, index) in answerList" v-if="index < 4">
							<img :key="index" :src="item" alt="" :class="{
				                      active: index === taskList[examIndex - 1].userAnswer - 1,
				                    }" @click="userClick(index + 1)" />
						</div>
					</div>
					<div class="row row_style_list">
						<div class="col" v-for="(item, index) in answerList" :key="index" v-if="index >= 4">
							<img :src="item" alt="" :class="{
				                      active: index === taskList[examIndex - 1].userAnswer - 1,
				                    }" @click="userClick(index + 1)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btnArea" v-if="buttonShow">
			<u-button round block type="info" @click="startTest()">{{buttonName}}</u-button>
		</div>
	</div>
</template>

<script>
	import {
		cognizeRIVEN
	} from "@/api/index.js"
	import ruiWenTaskList from "./data/ruiWenTaskData.js";
	export default {
		name: "ruiWenTask",
		data() {
			return {
				ruiWenTask: this.$imageUrl.urls.ruiWenTask,
				userId: "",
				userTestResult: {},
				userAnswerList: [],
				buttonPre: "方块 ",
				imgUrl: "",
				examImgUrl: "",
				taskId: "", // 认知任务id
				userAnswer: "",
				examIndex: 1,
				showMoreSlect: false,
				examIndexShow: false,
				radioShow: false,
				testFlag: false,
				testState: false,
				taskList: "",
				saveFlag: false, //结果保存按钮显示标志
				subjectInfo: "", //认知任务详情
				divShow: false, // 控制黑框显示隐藏
				buttonShow: true, // 控制按钮显示吟唱
				passTestExam: false, //练习测试通过标识
				buttonName: "开始测试", // 正式测试  // 重新练习
				testTypeCode: 0, // 0-练习测试 1-正式测试 2-重新测试
				userRightCount: 0, //标识当前用户回答正确的个数
				verdict: "", //测试结论
				brainsLevel: "", //智力水平
				userFinalTestStrShow: false,
				answerList: [],
				chooseAnswer: "",
				isLoading: false,
				testPlanId: "",
			};
		},
		onLoad(options) {
				this.testPlanId = options.testPlanId || "";
		},
		// 页面初始化函数
		onShow() {
			// this.taskId = this.$route.query.taskId;
		 this.userId= ""
		 this.userTestResult= {}
		 this.userAnswerList= []
		 this.buttonPre= "方块 "
		 this.imgUrl= ""
		 this.examImgUrl= ""
		 this.taskId= ""// 认知任务id
		 this.userAnswer= ""
		 this.examIndex= 1
		 this.showMoreSlect= false
		 this.examIndexShow= false
		 this.radioShow= false
		 this.testFlag= false
		 this.testState= false
		 this.taskList= ""
		 this.saveFlag= false //结果保存按钮显示标志
		 this.subjectInfo= "" //认知任务详情
		 this.divShow= false // 控制黑框显示隐藏
		 this.buttonShow= true // 控制按钮显示吟唱
		 this.passTestExam= false //练习测试通过标识
		 this.buttonName= "开始测试" // 正式测试  // 重新练习
		 this.testTypeCode= 0 // 0-练习测试 1-正式测试 2-重新测试
		 this.userRightCount= 0 //标识当前用户回答正确的个数
		 this.verdict= "" //测试结论
		 this.brainsLevel= "" //智力水平
		 this.userFinalTestStrShow= false
		 this.answerList= []
		 this.chooseAnswer= ""
		 this.isLoading= false
		 this.testPlanId= ""
			this.init();
			this.startTest();
		},
		onShareAppMessage(options) {

			var that = this;
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/cognitiveTasksPage/ruiWenTask?examWidght=ruiWenTask&FROMTO=cognitiveTasksPage', // 默认是当前页面，必须是以‘/'开头的完整路径
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

				shareObj.path = '/cognitiveTasksPage/ruiWenTask?examWidght=ruiWenTask&FROMTO=cognitiveTasksPage';
			}

			return shareObj;
		},
		methods: {
			init() {
				this.userId = this.$store.state.userInfo.user.id;
				// this.subjectInfo = JSON.parse(sessionStorage.getItem('subjectInfo'));
				this.taskList = ruiWenTaskList;
				this.taskList.forEach((item) => {
					item.userAnswer = "";
				}); //初始化设置用户回答答案为空，防止重复测试答案缓存；
				this.examImgUrl = this.taskList[0].imageUrl;
				this.answerList = this.taskList[0].answerList;
			},
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
			format(percentage) {
				return percentage === 100 ? "测试已完成" : "总进度";
			},
			format1(percentage) {
				return percentage === 100 ? "知觉辨别" : "知觉辨别";
			},
			format2(percentage) {
				return percentage === 100 ? "类同比较" : "类同比较";
			},
			format3(percentage) {
				return percentage === 100 ? "比较推理" : "比较推理";
			},
			format4(percentage) {
				return percentage === 100 ? "系列关系" : "系列关系";
			},
			format5(percentage) {
				return percentage === 100 ? "抽象推理" : "抽象推理";
			},
			userClick(i) {
				if (this.isLoading) {
					return;
				}
				this.isLoading = true;

				//用户点击动作
				if (i == this.taskList[this.examIndex - 1].rightAnswer) {
					this.userRightCount++;
					this.userAnswerList.push({
						key: this.examIndex,
						value: i,
						score: 1,
						rightAnswer: this.taskList[this.examIndex - 1].rightAnswer,
					});
				} else {
					this.userAnswerList.push({
						key: this.examIndex,
						value: i,
						score: 0,
						rightAnswer: this.taskList[this.examIndex - 1].rightAnswer,
					});
				}
				//保存当前成绩
				this.taskList[this.examIndex - 1].userAnswer = i;

				// //迭代次数
				setTimeout(() => {
					if (this.examIndex == 60) {
						this.testEnd();
					} else if (this.examIndex < 60) {
						this.examImgUrl = this.taskList[this.examIndex].imageUrl;
						this.answerList = this.taskList[this.examIndex].answerList;
						this.examIndex++;
						this.isLoading = false;
					}
				}, 300);
			},
			startTest() {
				if (this.$store.state.userInfo.user.id == "") {
					uni.showToast({
						icon: "none",
						title: "请先登录"
					})
					getApp().jumpToTestRecordLogin()
					return;
				}
				//开始测试

				this.buttonShow = false;
				this.testFlag = true;
				this.examIndexShow = true;
				this.radioShow = true;
				this.testState = true;
			},
			testEnd() {
				this.testFlag = false;
				this.testState = false;
				this.radioShow = false;
				this.examImgUrl = "";
				uni.showToast({
					icon: "none",
					title: "测试结束!"
				})
				this.examIndexShow = false;
				this.userTestResult.data = this.userAnswerList;
				this.userTestResult.userId = this.userId;
				this.userTestResult.userScore = this.userRightCount;
				this.userTestResult.testPlanId = this.testPlanId || "";

				let params = {
					...this.userTestResult
				}
				let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				this.$request
					.post({
						url: cognizeRIVEN,
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
			computeScore() {},
			// 跳转测试结果
			async goTestResult(id) {
				await getApp().getVersionId(id);
				let isFalse = getApp().globalData.isTrue;
				 
					if (isFalse) {
						console.log("isFalse===为true=>", isFalse)
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id+"&messageShare=1"
						})
					} else {
						// uni.navigateTo({
						// 	url: "/cognitiveTasksTestResult/testResultNew?id=" + id
						// })
						console.log("isFalse==false==>", isFalse)
					}

			 

				//           this.$http.get(`getRecordById?id=${id}`, {}, (res) => {
				//               if (res.code == 2001) { 
				// uni.showToast({
				// 		icon:"none",
				// 		title:res.msg
				// 	})
				//                   return;
				//               }
				//               if (res && res.code == 200) {
				//                   if (JSON.parse(res.data?.userRecordEntity?.testResult).versionNo == "2.0.1") {
				//                       //跳转新测试结果模版数据暂存本地
				//                       this.$store.dispatch('setTestResult',res?.data);
				//                       this.$router.push({
				//                           name: "testResultNew",
				//                           query: {
				//                               id: res.data?.userRecordEntity?.id,
				//                               title: res.data?.userRecordEntity?.name,
				//                               testPlanId: this.testPlanId || "",
				//                               come: 1, //1-来自认知任务列表，2-测试记录列表
				//                           },
				//                       });
				//                   } else {
				//                       //跳转旧测试结果模版
				//                       let testResult = JSON.parse(
				//                           res.data?.userRecordEntity?.testResult
				//                       )[0].version;
				//                       if (testResult == 2) {
				//                           this.$router.push({
				//                               path: "/persionDetailSCl",
				//                               params: {
				//                                   id: id,
				//                               },
				//                               query: {
				//                                   phone: sessionStorage.getItem(
				//                                       "f7a42fe7211f98ac7a60a285ac3a9e87"
				//                                   ),
				//                                   id: id,
				//                               },
				//                           });
				//                       } else {
				//                           this.$router.push({
				//                               path: "/PersionDetail",
				//                               params: {
				//                                   id: id,
				//                               },
				//                               query: {
				//                                   phone: sessionStorage.getItem(
				//                                       "f7a42fe7211f98ac7a60a285ac3a9e87"
				//                                   ),
				//                                   id: id,
				//                               },
				//                           });
				//                       }
				//                   }
				//               } else { 
				// uni.showToast({
				// 		icon:"none",
				// 		title:"获取数据失败！服务器异常"
				// 	}) 
				//               }
				//           });
			},
		},
	}
</script>

<style scoped>
	.testMainDiv {
		margin: 0 auto;
		margin-top: 10px;
		background: gray;
		background-size: cover;
		/* text-align:center; */
		width: 500px;
		height: 300px;
		/* object-fit:fill; */
	}
.row_style_list{
	
}
	.activeTask {
		box-sizing: border-box;
		padding-top: 46px;
		width: 100%;
		height: 100%;
		/* background: url(../../assets/congnitiveAblitity/ruiWenTask.png) no-repeat center; */
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
		top: 16px;
		box-sizing: border-box;
		padding: 4px 10px;
	}

	.glass {
		width: 100%;
		position: absolute;
		left: 0;
		top: 80px;
		box-sizing: border-box;
	}

	.main-img {
		width: 100%;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.scaleButton {
		margin-top: 20px;
		margin-bottom: 20px;
		background-size: cover;
	}

	.answer_wrap {
		width: 100%;
		/*padding: 0 100px;*/
		margin: 0 auto;
		box-sizing: border-box;
		text-align: left;
	}

	.answer_wrap img {
		margin-top: 16px;
		width: 100%;
		/*width: 118px;*/
		/* height: 72px; */
		height: 100%;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.answer_wrap img:active {
		opacity: 0.6;
	}

	.answer_wrap img.active {
		border: 3px solid #1de32c;
		border-radius: 15px;
	}

	.row {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		height: 176rpx;
	}

	.col {
		width: 23%;
		height: 114rpx;
		text-align: center;
	}
	
	.text_style_title{
		text-align: center;
		    width: 94%;
		    
			margin: 0 auto;
			 margin-bottom: 10px;
	}
</style>
