<template>
	<div>
		<div v-if="!testResultStr" class="explan">
			<div>
				<p>{{ subjectInfo.mobileTestDescription }}</p>
			</div>
			<div class="btnArea">
				<u-button type="success" size="large" v-if="button0Show" @click="startTest(0)"
					class="content_app11 textColorff weight fontSize30" shape="circle">练习测试</u-button>
				<view class="h20px"> </view>
				<u-button type="success" size="large" v-if="button1Show" @click="startTest(1)"
					class="content_app11 textColorff weight fontSize30 mt10" shape="circle">正式测试</u-button>

			</div>
		</div>

		<div v-show="testResultStrShow" style="width: 650px; margin: 20px auto; line-height: 2">
			<p style="margin-top: 20%; font-size: 30px">
				{{ testResultStr }}
			</p>
		</div>

		<div v-if="testFlag" class="activeTask"
			:style="'background-image: url('+p_bg+');background-size: cover;background-repeat: no-repeat;'">
			<div v-if="testTypeCode == 1" class="progress-content">

				<u-line-progress height="34rpx" :percentage="((imgIndex * 100) / 60).toFixed(2)" pivot-text="任务进度"
					color="#f2826a" style="padding-left: 20px;">
					<!-- <text class="u-percentage-slot fontSize16 fontWeight">{{((imgIndex * 100) / 60).toFixed(2)}}%</text> -->
					<text class="u-percentage-slot fontSize14 fontWeight">{{imgIndex }}/60</text>
				</u-line-progress>
			</div>
			<div class="glass">
				<p v-show="countDownShow" class="timingBox">{{ countDownStr }}</p>

				<div v-show="showWhiteFlag" class="look-point">
					<img :src="whiteFlagNews" alt="" />
				</div>
				<div class="shapeImgWidth">
					<img v-show="showDuckEgg" :src="examImgUrl" alt="" class="shapeImg" />
				</div>


				<div class="btn-content" v-show="showDuckEgg">
					<div class="btn-item">
						<u-button type="success" size="small" @click="userClick('L')"
							class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
							<div class="ALR leftJ"></div>
						</u-button>
					</div>
					<div class="btn-item">
						<u-button type="success" size="small" @click="userClick('R')"
							class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
							<div class="ALR rightJ"></div>
						</u-button>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		cognizeSHAPE
	} from "@/api/index.js"

	import {
		shapeIntuitionImgs
	} from "./data/shapeIntuition.js";
	export default {
		name: "shapeIntuition",
		data() {
			return {
				p_bg: this.$imageUrl.urls.p_bg,
				whiteFlagNews: this.$imageUrl.urls.whiteFlagNew,
				rightPng: this.$imageUrl.urls.rightPng,
				leftPng: this.$imageUrl.urls.leftPng,
				showGuider: false,
				userId: "",
				userTestResult: {},
				imgUrl: "",
				examImgUrl: "",
				taskId: "", // 认知任务id
				testFlag: false,
				testState: false,
				saveFlag: false, //结果保存按钮显示标志
				subjectInfo: {
					name: "形状知觉测试(自上而下)",
					mobileTestDescription: "测试阶段共10张图片，练习结束后，若您已明白测试规则请按“正式测试”按钮进行正式测试。若您尚未明白测试规则请按“练习测试”按钮重新进行练习测试。"
				}, //认知任务详情
				button0Show: true, // 控制按钮显示隐藏
				button1Show: false, // 控制按钮显示隐藏 
				testTypeCode: 0, // 0-练习测试 1-正式测试 2-重新测试
				imgIndex: 0,
				userTestPicList: [], //用户点击图片列表
				showImage: true,
				difficultList: [10], //[0,10,30,45,60,90,120,180,360]
				testPicCount: 5, //测试数目
				userRightClickDirection: "", //测试者应该点击的方向
				userRightResponseCount: 0, //测试者反应正确的次数
				showWhiteFlag: false,
				showDuckEgg: false,
				countDownTime: 6, //开始前的倒计时
				countDownStr: "练习马上开始！",
				countDownShow: true,
				testTunrnCount: 0, //正式测试轮数
				testEndFlag: false, //测试结束标志
				testResultStrShow: false, //测试结果展示
				testResultStr: "", //测试成绩
				userCanClick: false, //用户标识用户单次刺激只能点击一次
				myInterval: "",
				timeOne: "",
				timeTwo: "",
				startMilliSeconds: 0, //反应时
				userResponseRecords: [], //用户测试反应记录
				saveFalg: true,
				testPlanId: "",
				isClick: true,
				timeOut: 5000
			};
		},
		// 页面初始化函数
		onLoad(options) {
			this.testPlanId = options.testPlanId || "";
			this.userId = this.$store.state.userInfo.user.id;
			if (this.$store.state.userInfo.user.id != "") {} else {
				getApp().jumpToLoginParams()
			}

		},
		// onShow() {
		// this.userId= ""
		// this.userTestResult= {}
		// this.imgUrl= ""
		// this.examImgUrl= ""
		// this.taskId= "" // 认知任务id
		// this.testFlag= false
		// this.testState= false
		// this.saveFlag=false //结果保存按钮显示标志
		// this.subjectInfo= {
		// 	name: "形状知觉测试(自上而下)",
		// 	mobileTestDescription: "测试阶段共10张图片，练习结束后，若您已明白测试规则请按“正式测试”按钮进行正式测试。若您尚未明白测试规则请按“练习测试”按钮重新进行练习测试。"
		// } //认知任务详情
		// this.button0Show= true // 控制按钮显示隐藏
		// this.button1Show= false // 控制按钮显示隐藏 
		// this.testTypeCode= 0 // 0-练习测试 1-正式测试 2-重新测试
		// this.imgIndex= 0
		// this.userTestPicList= [] //用户点击图片列表
		// this.showImage= true
		// this.difficultList= [10] //[0,10,30,45,60,90,120,180,360]
		// this.testPicCount= 5 //测试数目
		// this.userRightClickDirection= "" //测试者应该点击的方向
		// this.userRightResponseCount= 0 //测试者反应正确的次数
		// this.showWhiteFlag=false
		// this.showDuckEgg= false
		// this.countDownTime= 6 //开始前的倒计时
		// this.countDownStr="练习马上开始！"
		// this.countDownShow= true
		// this.testTunrnCount= 0 //正式测试轮数
		// this.testEndFlag= false//测试结束标志
		// this.testResultStrShow= false //测试结果展示
		// this.testResultStr= ""//测试成绩
		// this.userCanClick= false //用户标识用户单次刺激只能点击一次
		// this.myInterval= ""
		// this.timeOne= ""
		// this.timeTwo= ""
		// this.startMilliSeconds= 0 //反应时
		// this.userResponseRecords= [] //用户测试反应记录
		// this.saveFalg= true
		// this.testPlanId= ""
		// this.isClick= true
		// this.timeOut=5000
		// },
		onShareAppMessage(options) {

			var that = this;
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/cognitiveTasksPage/ShapeIntuition?examWidght=ShapeIntuition&FROMTO=cognitiveTasksPage', // 默认是当前页面，必须是以‘/'开头的完整路径
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

				shareObj.path = '/cognitiveTasksPage/ShapeIntuition?examWidght=ShapeIntuition&FROMTO=cognitiveTasksPage';
			}

			return shareObj;
		},
		destroyed() {
			clearInterval(this.myInterval);
			clearTimeout(this.timeOne);
			clearTimeout(this.timeTwo);
		},
		methods: {
			userClick(clickFlag) {
				if (this.countDownShow || (this.showWhiteFlag && clickFlag != "NULL")) {
					return;
				}
				this.showDuckEgg = false;
				this.showWhiteFlag = true;
				let milliSecondsCount = new Date().getTime() - this.startMilliSeconds;
				let userResponseStr = "Wrong";
				// clearTimeout(this.timeOne);
				clearTimeout(this.timeTwo);
				//用户反应正确性判断
				if (
					this.userRightClickDirection == clickFlag &&
					this.userCanClick == true
				) {
					this.userRightResponseCount++;
					this.userCanClick = false;
					userResponseStr = "Right";
				}
				//判断是否测试结束
				// if (this.imgIndex == this.userTestPicList.length) {
				// 	this.testEndFlag = true;
				// 	clearTimeout(this.timeOne);
				// }
				//记录用户反应
				if (this.testTypeCode == 1) {
					this.userResponseRecords.push({
						index: this.imgIndex,
						rightOrWrong: userResponseStr,
						responseTime: milliSecondsCount,
						diff: this.userTestPicList[this.imgIndex - 1].diff,
					});
				}
				//判断是否测试结束
				if (this.imgIndex == this.userTestPicList.length) {
					this.computeScore();
				} else {
					// 进入下一轮
					this.showTargetNow();
				}
			},
			startTest(testType) {
				console.log("==123=====>", this.$store.state)
				if (this.$store.state.userInfo.user.id == "") {

					uni.showToast({
						title: '请先登录！'
					})

					// this.$router.push("/login");
					return;
				}

				// if (testType == 0) {
				// 	this.testTypeCode = 0;
				// } else {
				// 	this.testTypeCode = 1;
				// }
				 this.showGuider = false;
			     this.testTypeCode = testType;

				if (this.testTypeCode == 1) {
					this.difficultList = [0, 30, 60, 90, 180, 360]; // [360,180,120,90,60,45,30,10,0]
					this.testPicCount = 20;
					this.countDownStr = "马上开始！";
					this.imgIndex = 0;
					this.countDownTime = 6;
					this.testEndFlag = false;
					this.showDuckEgg = false;
					this.userTestPicList = [];
				}
				this.countDownShow = true;
				this.userTestPicListCreate();
				// 预加载图片后开始测试
				// this.$preloader(this.userTestPicList, () => {
				this.testFlag = true;
				this.testState = true;
				this.countDown();
				// });

			},
			showTargetNow() {
			      // 练习间隔2~4，正式测试2~12；
			      var time = 2000; //Math.random()*2000 + 3000;
			      this.showWhiteFlag = true;
			      this.showDuckEgg = false;
			      //鸭蛋出现的时间1000毫秒
			      this.timeOne = setTimeout(() => {
			        this.userRightClickDirection =
			          this.userTestPicList[this.imgIndex].imgDirection;
			        this.examImgUrl = this.userTestPicList[this.imgIndex].imgUrl;
			        this.showDuckEgg = true;
			        this.showWhiteFlag = false;
			        this.startMilliSeconds = new Date().getTime();
			        this.userCanClick = true;
			        this.imgIndex++;
			      }, 1000);
			
			      // 2000后无反应进入下一trail
			      this.timeTwo = setTimeout(() => {
			        if(this.testTypeCode == 1) this.userClick("NULL");
			      }, time);
			    },
			// showTargetNow() {
			// 	// 练习间隔2~4，正式测试2~12；
			// 	var time = 2000; //Math.random()*2000 + 3000;
			// 	this.timeOne = setTimeout(() => {
			// 		this.showWhiteFlag = true;
			// 		this.showDuckEgg = false;
			// 		this.timeTwo = setTimeout(() => {
			// 			if (this.testEndFlag) {
			// 				this.computeScore();
			// 			} else {
			// 				this.userRightClickDirection =
			// 					this.userTestPicList[this.imgIndex].imgDirection;
			// 				this.examImgUrl = this.userTestPicList[this.imgIndex].imgUrl;
			// 				this.showDuckEgg = true;
			// 				this.showWhiteFlag = false;
			// 				this.startMilliSeconds = new Date().getTime();
			// 				this.userCanClick = true;
			// 				this.imgIndex++;

			// 				if (this.imgIndex == this.userTestPicList.length) {
			// 					this.testEndFlag = true;
			// 				}
			// 				this.showTargetNow();
			// 				this.timeOne = setTimeout(this.ifShowNextOne, time, this.imgIndex);
			// 			}
			// 		}, 1000); //1000
			// 	}, time); //time
			// },
			ifShowNextOne(needClickIndex) {
				if (needClickIndex == this.imgIndex) {
					this.userClick("NULL");
				}
			},
			computeScore() {
				if (this.testTypeCode == 0) {
					this.testFlag = false;
					this.testState = false;
					this.countDownStr = "练习马上开始！";
					this.userRightResponseCount = 0;
					this.imgIndex = 0;
					this.countDownTime = 6;
					this.testEndFlag = false;
					this.showDuckEgg = false;
					this.showWhiteFlag = false;
					this.userTestPicList = [];
					this.userResponseRecords = [];
					this.button1Show = true;

					uni.showToast({
						title: '测试结束！',
						position: "top"
					})

				} else {
					if (this.isClick) {
						this.isClick = false;
						let userScore = (
							(this.userRightResponseCount / this.userResponseRecords.length) *
							100
						).toFixed(2);
						this.testFlag = false;
						this.testState = false;
						this.button0Show = false;
						this.button1Show = false;
						console.log(this.userResponseRecords);
						let params = {
							userId: this.userId,
							userScore: userScore + "%",
							userResponseRecords: this.userResponseRecords,
							testPlanId: this.testPlanId,
						}
						let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
						this.$request
							.post({
								url: cognizeSHAPE,
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
							title: '测试结束'
						})
					}
					setTimeout(() => {
						this.isClick = true;
					}, this.timeOut)
				}
			},
			async goTestResult(id) {
				await getApp().getVersionId(id);
				let isFalse = getApp().globalData.isTrue;
				setTimeout(() => {
					if (isFalse) {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id + "&messageShare=1"
						})
					} else {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id + "&messageShare=1"
						})
						console.log("旧====>", isFalse)
					}

				}, 1000)



			},
			userTestPicListCreate() {
				let imgObj = {};

				if (this.testTypeCode == 0) {
					//随机呈现最简单的10张图片
					let imgIndexList = this.getRandomNumber(10, 20);
					for (let j = 0; j < this.difficultList.length; j++) {
						for (let i = 0; i < imgIndexList.length; i++) {
							imgObj = {};
							if (i % 2 == 0) {
								let imgTest = "R_ELP_test_jitter" + this.difficultList[j] + "_s" + imgIndexList[i];
								imgObj.imgUrl = shapeIntuitionImgs[imgTest];
								imgObj.imgDirection = "R";
								imgObj.userClickDirection = "";
							} else {
								let imgTestELP = "ELP_test_jitter" + this.difficultList[j] + "_s" + imgIndexList[i];
								imgObj.imgUrl = shapeIntuitionImgs[imgTestELP]

								imgObj.imgDirection = "L";
								imgObj.userClickDirection = "";
							}
							this.userTestPicList.push(imgObj);
						}
					}
					this.shuffle(this.userTestPicList);
				} else {
					//随机呈现20张难度不同的图片 

					for (let j = 0; j < this.difficultList.length; j++) {
						var tempList = [];
						for (let i = 1; i < 6; i++) {
							imgObj = {};
							let imgTest = "R_ELP_test_jitter" + this.difficultList[j] + "_s" + i;
							imgObj.imgUrl = shapeIntuitionImgs[imgTest];

							imgObj.imgDirection = "R";
							imgObj.userClickDirection = "";
							imgObj.diff = this.difficultList[j];
							tempList.push(imgObj);
							imgObj = {};
							let imgTestELP = "ELP_test_jitter" + this.difficultList[j] + "_s" + i;
							imgObj.imgUrl = shapeIntuitionImgs[imgTestELP]

							imgObj.imgDirection = "L";
							imgObj.userClickDirection = "";
							imgObj.diff = this.difficultList[j];
							tempList.push(imgObj);
						}

						this.userTestPicList = this.userTestPicList.concat(tempList);
						this.testPicCount = this.userTestPicList.length;
						console.log(this.userTestPicList);
					}
					this.shuffle(tempList);
				}
				console.log(this.userTestPicList.length);
			},
			getRandomNumber(size, maxNumber) {
				let numberList = [];
				for (var i = 0; i < size; i++) {
					numberList.push(Math.floor(Math.random() * maxNumber) + 1);
				}
				return numberList;
			},
			 
			 countDown() {
			      // 测试时间倒计时
			      this.myInterval = setInterval(() => {
			        this.countDownTime--;
			        this.countDownStr = this.countDownTime;
			        if (this.countDownTime == 0) {
			          this.countDownShow = false;
			          //计算测试结果
			          if (this.testTypeCode == 0) {
			            this.showGuider = true;
			          } else {
			            this.showGuider = false;
			          }
			          this.showTargetNow();
			          // 清除定时器
			          this.showDuckEgg = false;
			          this.showWhiteFlag = true;
			          clearInterval(this.myInterval);
			          this.countDownTime = 6;
			        }
			      }, 1000);
			    },
			shuffle(arr) {
				var i = arr.length,
					t,
					j;
				while (i) {
					j = Math.floor(Math.random() * i--);
					t = arr[i];
					arr[i] = arr[j];
					arr[j] = t;
				}
			},
		},
	}
</script>

<style scoped>
	@import url("./css/shapeIntuition.css");
</style>
