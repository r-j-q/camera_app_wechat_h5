<template>
	<div>
		<div class="activeTask"
			:style="'background-image: url('+rememberAbilityTask+');background-size: cover;background-repeat: no-repeat;'">
			<div class="progress-content">
				<!-- <u-line-progress height="30rpx" :striped="true"  :percentage="(((cumulation + 1) / 72)*100).toFixed(2)" :striped-active="true"  -->
				<!-- color="#f2826a"> -->
				<!-- <text class="u-percentage-slot fontSize14 fontWeight">{{(((cumulation + 1) / 72)*100).toFixed(2)}}%</text> -->
				<!-- </u-line-progress> -->

				<u-line-progress   :striped="true" :striped-active="true" height="34rpx"
					:percentage="(((cumulation + 1) / 72)*100).toFixed(2)">
					<view class="u-percentage-slot row-center"> 
					
						<!-- <text class="fontSize16 fontWeight">{{(((cumulation + 1) / 72)*100).toFixed(2)}}%</text> -->
						<text class="fontSize14 fontWeight">{{cumulation + 1}}/72</text>
						 
					</view>
				</u-line-progress>
			</div>

			<p v-if="timingShow" class="timingBox">{{ countDownStr }}</p>

			<div v-if="crossShow && !expressionShow && !buttonShow" class="look-point">
				<img :src="whiteFlagNew" alt="" />
			</div>
			<div class="shapeImgWidths">
				<img v-if="expressionShow && !crossShow && !buttonShow" :src="examImgUrl" class="shapeImg" alt="" />
			</div>


			<div v-if="buttonShow && !crossShow && !expressionShow" class="btn-content">
				<div class="btn-item">

					<u-button type="success" size="small" @click="userClick('happy')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						开心
					</u-button>
					<u-button type="success" size="small" @click="userClick('fear')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						害怕
					</u-button>
					<u-button type="success" size="small" @click="userClick('angry')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						生气
					</u-button>


					<!-- <van-button size="small" round block type="info" @click="userClick('happy')">开心</van-button>
					<van-button size="small" round block type="info" @click="userClick('fear')">害怕</van-button>
					<van-button size="small" round block type="info" @click="userClick('angry')">生气</van-button>
					 -->
				</div>
				<div class="btn-item">
					<u-button type="success" size="small" @click="userClick('disgust')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						厌恶
					</u-button>
					<u-button type="success" size="small" @click="userClick('sad')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						悲伤
					</u-button>
					<u-button type="success" size="small" @click="userClick('surprise')"
						class="content_app11 textColorff weight fontSize30 mt10" shape="circle">
						惊讶
					</u-button>

					<!-- <van-button size="small" round block type="info" @click="userClick('disgust')">厌恶</van-button>
					<van-button size="small" round block type="info" @click="userClick('sad')">悲伤</van-button>
					<van-button size="small" round block type="info" @click="userClick('surprise')">惊讶</van-button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		cognizeETB01
	} from "@/api/index.js"

	import {
		ETBexperimentImgs
	} from "./data/ETBexperiment_new.js";
	export default {
		name: "ETBexperiment_new",
		data() {
			return {
				rememberAbilityTask: this.$imageUrl.urls.rememberAbilityTask,
				whiteFlagNew: this.$imageUrl.urls.whiteFlagNew,
			   
				testFlag: true, //显示提示页面与测试页面控制开关
				timingShow: true, //倒计时5秒提示开始
				timingFlag: null, //倒计时名称
				timingNum: 5, //倒计时5秒
				countDownStr: "测试马上开始！",
				crossShow: false, //显示注视点
				expressionShow: false, //显示表情图片
				buttonShow: false, //显示选择按钮
				timingOne: null,
				timingTwo: null,
				timingThree: null,
				flag: null, //反应时间计时器名
				commonTime: 0, //计时器获取反应时间
				cumulation: 0, //累加器
				examImgUrl: '', //展示图片
				arrList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], //取样数组
				randomArr: [], //从十个人中随机获取3个人
				resultData: [], 
				isClick: true,
				timeOut: 5000
			};
		},
		// 页面初始化函数
		onShow() { 
			this.userId = this.$store.state.userInfo.user.id;

                this.testFlag= true //显示提示页面与测试页面控制开关
				this.timingShow= true//倒计时5秒提示开始
				this.timingFlag= null //倒计时名称
				this.timingNum= 5 //倒计时5秒
				this.countDownStr= "测试马上开始！"
				this.crossShow= false //显示注视点
				this.expressionShow= false //显示表情图片
				this.buttonShow= false//显示选择按钮
				this.timingOne= null
				this.timingTwo= null
				this.timingThree= null
				this.flag= null //反应时间计时器名
				this.commonTime= 0 //计时器获取反应时间
				this.cumulation= 0 //累加器
				this.examImgUrl= '' //展示图片
				this.arrList= ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], //取样数组
				this.randomArr= [] //从十个人中随机获取3个人
				this.resultData= []
				this.isClick= true
				this.timeOut= 5000
		},
		mounted() {
			if (this.$store.state.userInfo.user.id != "") {
				this.startTiming();
			} else {
				getApp().jumpToLoginParams()
			}

		},
		onShareAppMessage(options) {

			var that = this;
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/cognitiveTasksPage/ETBexperiment_new?examWidght=ETBexperiment_new&FROMTO=cognitiveTasksPage', // 默认是当前页面，必须是以‘/'开头的完整路径
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
					'/cognitiveTasksPage/ETBexperiment_new?examWidght=ETBexperiment_new&FROMTO=cognitiveTasksPage';
			}

			return shareObj;
		},
		methods: {

			startTiming() {
				//         if (!sessionStorage.getItem("userInfo")) {
				// uni.showToast({
				// 	title:"请先登录！"
				// }) 
				//             this.$router.push("/login");
				//             return;
				//         }

				//关闭提示内容窗口
				this.testFlag = false;

				this.timingFlag = setInterval(() => {
					if (this.timingNum == 0) {
						this.countDownStr = "开始";

						setTimeout(() => {
							//关闭倒计时提示页面
							this.timingShow = false;

							this.timingFlag = clearInterval(this.timingFlag);
							//练习开始

							this.startTest();
						}, 1000);

						this.timingFlag = clearInterval(this.timingFlag);

					} else {
						this.countDownStr = this.timingNum;
						this.timingNum--;
					}
				}, 1000)
			},
			format(percentage) {
				return percentage === 100 ? "任务已完成" : "任务进度";
			},
			startTime() {
				//初始化设置计时器为0
				this.commonTime = 0;

				this.flag = setInterval(() => {
					this.commonTime++
				}, 10)
			},
			endTime() {
				this.flag = clearInterval(this.flag);
			},
			randomList() {
				// 从十个人中随机获取三个不同的人
				this.randomArr = [];

				for (let k = 0; k < 3; k++) {

					let id = Math.floor(Math.random() * 10);

					if (k < 10) {

						if (this.randomArr.indexOf(this.arrList[id]) === -1) {
							this.randomArr.push(this.arrList[id]);
						} else {
							k = k - 1;
							continue;
						}

					} else {
						this.randomArr.push(this.arrList[id])
					}
				}

			},
			async shuffle(arr) {
				for (let i = 1; i < arr.length; i++) {
					const random = Math.floor(Math.random() * (i + 1));
					[arr[i], arr[random]] = [arr[random], arr[i]];
				}
				return arr;
			},
			async initImgList(rank) {
				//动态初始化图片序列数组
				//随机挑选3个人
				await this.randomList();
				//根据情绪等级初始化数组
				this.randomArr.map((item) => {
					let random0 = `${item >= '06'? 'm' + item: 'f' + item}-happy-0${rank + 1}`;
					let random1 = `${item >= '06'? 'm' + item: 'f' + item}-fear-0${rank + 1}`;
					let random2 = `${item >= '06'? 'm' + item: 'f' + item}-angry-0${rank + 1}`;
					let random3 = `${item >= '06'? 'm' + item: 'f' + item}-disgust-0${rank + 1}`;
					let random4 = `${item >= '06'? 'm' + item: 'f' + item}-sad-0${rank + 1}`;
					let random5 = `${item >= '06'? 'm' + item: 'f' + item}-surprise-0${rank + 1}`;
					//开心
					this.resultData.push({
						emoType: "happy", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random0]
					});
					//害怕
					this.resultData.push({
						emoType: "fear", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random1]
					});
					//生气
					this.resultData.push({
						emoType: "angry", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random2]
					});
					//厌恶
					this.resultData.push({
						emoType: "disgust", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random3]
					});
					// 悲伤
					this.resultData.push({
						emoType: "sad", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random4]
					});
					// 惊讶
					this.resultData.push({
						emoType: "surprise", // 情绪类型
						emoAmp: rank, // 整数0，1，2...
						userSelectEmoType: "", //用户选择的情绪类型
						responseTime: "", //反应时（ms）
						correct: "", //用户反映正确性 True, False
						imgUrl: ETBexperimentImgs[random5]
					});

				})

			},
			async imgListSerialize() {
				// 按情绪等级图片数组序列化
				await this.initImgList(0);
				await this.initImgList(1);
				await this.initImgList(2);
				await this.initImgList(3);
				//打乱数组序列
				await this.shuffle(this.resultData);
				this.resultData.map((item, i) => {
					return item.index = i;
				});
				// 图片预加载
				// preloader(this.resultData, () => {
				//图片赋值开始测试
				this.changeImg(this.cumulation);
				this.showCross();

				// });
				console.log(this.resultData, "图片数组序列222")
			},
			changeImg(num) {
				// 切换图片
				this.examImgUrl = this.resultData[num].imgUrl;
			},
			showCross() {
				//显示十字光标
				this.crossShow = true;
				this.expressionShow = false;
				this.buttonShow = false;

				this.timingOne = setTimeout(() => {

					this.showImg();
				}, 750);
			},
			showImg() {
				//显示图片
				this.crossShow = false;
				this.expressionShow = true;
				this.buttonShow = false;

				this.timingTwo = setTimeout(() => {

					this.showBtn();
				}, 500);
			},
			showBtn() {
				//开始计时
				this.startTime();
				//显示选择按钮
				this.crossShow = false;
				this.expressionShow = false;
				this.buttonShow = true;

				this.timingThree = setTimeout(() => {

					console.log("123");
					//关闭按钮显示
					this.buttonShow = false;
					//关闭计时器
					this.endTime();

					this.resultData[this.cumulation].userSelectEmoType = "NO"; //用户选择的情绪类型
					this.resultData[this.cumulation].responseTime = "NULL"; //反应时（ms）
					this.resultData[this.cumulation].correct = "False"; //用户反映正确性 True, False

					if (this.cumulation >= 71) {
						//调用接口，跳转页面
						this.submitData();

					} else {
						// 累加器自增
						this.cumulation++;
						//换展示图片
						this.changeImg(this.cumulation);
						// 继续下一组数据
						this.showCross();

					}
					// 20220508   暂时修改为5秒，用户反应2秒时间太短
				}, 5000);
			},
			userClick(param) {
				//如果两秒内用户点击了选项按钮
				this.timingThree = clearTimeout(this.timingThree);
				//关闭计时器
				this.endTime();

				this.resultData[this.cumulation].userSelectEmoType = param; //用户选择的情绪类型
				this.resultData[this.cumulation].responseTime = this.commonTime * 10; //反应时（ms）
				this.resultData[this.cumulation].correct = param == this.resultData[this.cumulation].emoType ? "True" :
					"False"; //用户反映正确性 True, False

				if (this.cumulation >= 71) {
					//调用接口，跳转页面
					this.submitData();

				} else {
					// 累加器自增
					this.cumulation++;
					//换展示图片
					this.changeImg(this.cumulation);
					// 继续下一组数据
					this.showCross();

				}

			},
			submitData() {
				let correctNum = [],
					happy1 = [],
					happy2 = [],
					happy3 = [],
					happy4 = [],
					fear1 = [],
					fear2 = [],
					fear3 = [],
					fear4 = [],
					angry1 = [],
					angry2 = [],
					angry3 = [],
					angry4 = [],
					disgust1 = [],
					disgust2 = [],
					disgust3 = [],
					disgust4 = [],
					sad1 = [],
					sad2 = [],
					sad3 = [],
					sad4 = [],
					surprise1 = [],
					surprise2 = [],
					surprise3 = [],
					surprise4 = [];

				this.resultData.map((item, i) => {
					if (item.correct == "True") correctNum.push(item);
				});

				correctNum.map((item) => {
					if (item.emoType == "happy" && item.emoAmp == 0) happy1.push(item);
					if (item.emoType == "happy" && item.emoAmp == 1) happy2.push(item);
					if (item.emoType == "happy" && item.emoAmp == 2) happy3.push(item);
					if (item.emoType == "happy" && item.emoAmp == 3) happy4.push(item);
					if (item.emoType == "fear" && item.emoAmp == 0) fear1.push(item);
					if (item.emoType == "fear" && item.emoAmp == 1) fear2.push(item);
					if (item.emoType == "fear" && item.emoAmp == 2) fear3.push(item);
					if (item.emoType == "fear" && item.emoAmp == 3) fear4.push(item);
					if (item.emoType == "angry" && item.emoAmp == 0) angry1.push(item);
					if (item.emoType == "angry" && item.emoAmp == 1) angry2.push(item);
					if (item.emoType == "angry" && item.emoAmp == 2) angry3.push(item);
					if (item.emoType == "angry" && item.emoAmp == 3) angry4.push(item);
					if (item.emoType == "disgust" && item.emoAmp == 0) disgust1.push(item);
					if (item.emoType == "disgust" && item.emoAmp == 1) disgust2.push(item);
					if (item.emoType == "disgust" && item.emoAmp == 2) disgust3.push(item);
					if (item.emoType == "disgust" && item.emoAmp == 3) disgust4.push(item);
					if (item.emoType == "sad" && item.emoAmp == 0) sad1.push(item);
					if (item.emoType == "sad" && item.emoAmp == 1) sad2.push(item);
					if (item.emoType == "sad" && item.emoAmp == 2) sad3.push(item);
					if (item.emoType == "sad" && item.emoAmp == 3) sad4.push(item);
					if (item.emoType == "surprise" && item.emoAmp == 0) surprise1.push(item);
					if (item.emoType == "surprise" && item.emoAmp == 1) surprise2.push(item);
					if (item.emoType == "surprise" && item.emoAmp == 2) surprise3.push(item);
					if (item.emoType == "surprise" && item.emoAmp == 3) surprise4.push(item);
				});



				let params = {
					userId: this.userId,
					testPlanId: this.testPlanId||"",
					data: this.resultData,
					result: {
						totalResult: ((correctNum.length / 72) * 100).toFixed(2) + '%',
						happy: {
							level1: ((happy1.length / 3) * 100).toFixed(2) + '%',
							level2: ((happy2.length / 3) * 100).toFixed(2) + '%',
							level3: ((happy3.length / 3) * 100).toFixed(2) + '%',
							level4: ((happy4.length / 3) * 100).toFixed(2) + '%'
						},
						fear: {
							level1: ((fear1.length / 3) * 100).toFixed(2) + '%',
							level2: ((fear2.length / 3) * 100).toFixed(2) + '%',
							level3: ((fear3.length / 3) * 100).toFixed(2) + '%',
							level4: ((fear4.length / 3) * 100).toFixed(2) + '%'
						},
						angry: {
							level1: ((angry1.length / 3) * 100).toFixed(2) + '%',
							level2: ((angry2.length / 3) * 100).toFixed(2) + '%',
							level3: ((angry3.length / 3) * 100).toFixed(2) + '%',
							level4: ((angry4.length / 3) * 100).toFixed(2) + '%'
						},
						disgust: {
							level1: ((disgust1.length / 3) * 100).toFixed(2) + '%',
							level2: ((disgust2.length / 3) * 100).toFixed(2) + '%',
							level3: ((disgust3.length / 3) * 100).toFixed(2) + '%',
							level4: ((disgust4.length / 3) * 100).toFixed(2) + '%'
						},
						sad: {
							level1: ((sad1.length / 3) * 100).toFixed(2) + '%',
							level2: ((sad2.length / 3) * 100).toFixed(2) + '%',
							level3: ((sad3.length / 3) * 100).toFixed(2) + '%',
							level4: ((sad4.length / 3) * 100).toFixed(2) + '%'
						},
						surprise: {
							level1: ((surprise1.length / 3) * 100).toFixed(2) + '%',
							level2: ((surprise2.length / 3) * 100).toFixed(2) + '%',
							level3: ((surprise3.length / 3) * 100).toFixed(2) + '%',
							level4: ((surprise4.length / 3) * 100).toFixed(2) + '%'
						}
					}

				}

				let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				if (this.isClick) {
					this.isClick = false;
					this.$request
						.post({
							url: cognizeETB01,
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
				uni.showToast({
					title: "测试完成"
				})
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
							url: "/cognitiveTasksTestResult/testResultNew?id=" + id+"&messageShare=1"
						})
					} else {
						uni.navigateTo({
							url: "/cognitiveTasksTestResult/testResult?id=" + id + "&messageShare=1&flag=" + getApp()
								.globalData.flag
						})

					}

				}, 1000)



			},

			startTest() {
				this.imgListSerialize();
			},

		},
		destroyed() {
			clearInterval(this.timingFlag);
			clearInterval(this.flag);
			clearTimeout(this.timingOne);
			clearTimeout(this.timingTwo);
			clearTimeout(this.timingThree);
		},



	}
</script>

<style scoped>
	@import url('./css/ETBexperiment_new.css');
/* 	.u-progress__pivot{
	    position: absolute;
	    top: 50%;
	    box-sizing: border-box;
	    height: 34rpx;
	    font-size: 14px;
	    text-align: center;
	    word-break: keep-all;
	    border-radius: 1em;
	    -webkit-transform: translate(0,-50%);
	    transform: translate(0,-50%);
	    color: #333;
	} */
	     
</style>
