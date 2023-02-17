<template>
	<div>

		<div class="memory-warp"
			:style="'background-image: url(' + add_bg_memory_warp + ');background-size: cover;background-repeat: no-repeat;'">

	<!-- 		<div class="modelName">
				{{ showCover ? "观看模式" : "控制模式" }}
			</div> -->

			<div class="tip-title">
				<p>{{ desFlag ? "正序测试" : "倒序测试" }}</p>
			</div>
			<!-- 倒计时 -->
			<div v-if="timingShow" class="timing-content">
				<p class="timing-num">{{ countDownStr }}</p>
			</div>
			<!-- 数字显示 -->
			<div v-if="digitalShow && !timingShow" class="digital-content">
				<p>

					<button class="startTest bg phcolor" v-if="digitalShow && !timingShow && buttonShow"
						@click="begin()">开始测试
					</button>
					{{ randomNum }}
				</p>
			</div>
			<!-- 键盘显示 -->
			<view class="" style="display: flex;flex-direction: column;">
			 
			<div v-if="!digitalShow && !timingShow" class="digital-input-content">
				<div class="add-mid"
					:style="'background-image: url(' + add_add_mid + ');background-repeat: no-repeat;'">
					<p class="digital-show">
						<span class="bn-in"> {{ numberShow }}</span>
					</p>
					<div class="num-btn">
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('1')">1</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('2')">2</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('3')">3</u-button>
					</div>
					<div class="num-btn">
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('4')">4</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('5')">5</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'  shape="circle"  type="success" @click="userClick('6')">6</u-button>
					</div>
					<div class="num-btn">
						<u-button class='custom-style'  shape="circle"   type="success" @click="userClick('7')">7</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'   shape="circle"  type="success" @click="userClick('8')">8</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style' shape="circle"   type="success" @click="userClick('9')">9</u-button>
					</div>
					<div class="num-btn">
						<u-button class='custom-style' shape="circle"   type="success" @click="userDel()">删除</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style' shape="circle"  type="success" @click="userClick('0')">0</u-button>
						<view class="w_60"></view>
						<u-button class='custom-style'  shape="circle"  type="success" @click="userSubmit()">提交</u-button>
					</div>
				</div>
			</div>
			<view   v-if="
			                    role == 'doc' &&
			                    radio1 == 'doc' &&
			                    !timingShow &&
			                    !(digitalShow && !timingShow)
			                  " class="custom-style circleLi" @click="endTest">{{forceEndButtonName}}</view>

	
			</view>
		<!-- 	<u-radio-group direction="horizontal" @change="changeMaster" v-if="role == 'doc'" class="contral_group"
				v-model="radio1">
				<u-radio name="patient" shape="square">用户控制</u-radio>
				<u-radio name="doc" shape="square">医生控制</u-radio>
			</u-radio-group> -->

			<div class="cover" v-show="showCover" @click="disableHandle"></div>
			 
		</div>


	</div>
</template>

<script>
	import {
		scoketUrl
	} from "../common/config.js";

	import {
		cognizeDST
	} from '@/api/index.js'
	import {
		taskImgs
	} from "./data/DigitalMemoryTest.js";
	export default {
		name: "digitalMemoryTest",
		data() {
			return {
				customStyle: {
						margin:"0 10px"		 
							},
							
				// showCover:true,
				buttonShow: true,
				digitalShow: true, //显示数字与输入数字切换
				numberArr: [], //数字输入数组
				numberShow: "", //数字输入器显示数字
				randomArr: [], //随机数字产生数组
				randomDigital: "", //随机数列
				randomNum: "", //随机数显示
				cumulation: 0, //累加器
				timeFlag: null, //计时器名字
				commonTime: 0, //累加计时
				desFlag: true, //true为正序，false为倒序
				forceEndButtonName: "结束正序测试",
				arrList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //取样数组
				result: {
					AESCScore: 0, //顺序成绩
					DESCScore: 0, //倒序成绩
					AESC: [
						//正序数组
						{
							index: 0, //序号
							diff: 3, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 1, //序号
							diff: 3, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 2, //序号
							diff: 4, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 3, //序号
							diff: 4, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 4, //序号
							diff: 5, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 5, //序号
							diff: 5, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 6, //序号
							diff: 6, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 7, //序号
							diff: 6, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 8, //序号
							diff: 7, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 9, //序号
							diff: 7, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 10, //序号
							diff: 8, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 11, //序号
							diff: 8, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 12, //序号
							diff: 9, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 13, //序号
							diff: 9, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 14, //序号
							diff: 10, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 15, //序号
							diff: 10, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 16, //序号
							diff: 11, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 17, //序号
							diff: 11, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 18, //序号
							diff: 12, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
						{
							index: 19, //序号
							diff: 12, //难度等级
							type: "AESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性    --可以不加
							responseTime: "", //反应时
						},
					],
					DESC: [
						//倒序
						{
							index: 0, //序号
							diff: 2, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 1, //序号
							diff: 2, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 2, //序号
							diff: 3, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 3, //序号
							diff: 3, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 4, //序号
							diff: 4, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 5, //序号
							diff: 4, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 6, //序号
							diff: 5, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 7, //序号
							diff: 5, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 8, //序号
							diff: 6, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 9, //序号
							diff: 6, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 10, //序号
							diff: 7, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 11, //序号
							diff: 7, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 12, //序号
							diff: 8, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 13, //序号
							diff: 8, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 14, //序号
							diff: 9, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 15, //序号
							diff: 9, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 16, //序号
							diff: 10, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
						{
							index: 17, //序号
							diff: 10, //难度等级
							type: "DESC",
							qNumberSequence: "", //呈现字母序列
							userResponseSequence: "", //用户反应字母序列
							rightOrWrong: "", //反应正确性
							responseTime: "", //反应时
						},
					],
				},
				timingShow: true, //显示倒计时
				timingFlag: null, //倒计时名称
				timingDes: "测试于5秒后开始，请做好准备", //倒计时提示语
				countDownStr: "测试马上开始！",
				timingNum: 5, //倒计时初始化时间
				subjectInfo: "",
				userId: "", //用户id
				taskId: "",
				role: "",
				toUserId: "",
				radio1: "doc",
				webSocket: "",
				testPlanId: "",
				add_bg_memory_warp: "",
				add_add_mid: "",
			};
		},
		onShow() {
			this.add_bg_memory_warp = taskImgs.add_bg_memory_warp;
			this.add_add_mid = taskImgs.add_add_mid;
			this.chooseRole();
			//绑定事件
			// #ifdef H5
			window.addEventListener('beforeunload', e => this.closeWebsocket(e));
			// #endif

		},

		computed: {
			showCover: function() {
				return this.role == this.radio1 ? false : true;
			},
		},
		methods: {

			begin() {
				// this.sendMsgHandle(3905, null);
				this.buttonShow = false;

				setTimeout(() => {
					//关闭倒计时提示页面

					//测试开始
					if (this.desFlag) {
						//正序测试
						this.generateRandom(this.result.AESC[this.cumulation].diff);
					} else {
						//倒叙测试

						this.generateRandom(this.result.DESC[this.cumulation].diff);
					}
				}, 1500);
			},
			init() {
				// this.testPlanId = this.$route.query.testPlanId || '';
				this.userId = this.$store.state.userInfo.user.id;

				this.toUserId = this.role == "doc" ? `${this.userId}patient` : `${this.userId}doc`;
				// this.creatScoket();
				this.startTiming();
			},
			changeMaster() {
				let msg = {
					toUserId: this.toUserId,
					message: {
						msg: "角色切换",
						master: this.radio1 == this.role,
					},
				};
				console.log(msg);
				this.webSocket.send(JSON.stringify(msg));
			},
			disableHandle() {

				uni.showToast({
					icon: "none",
					title: '您暂时不需要操作，请耐心等待！'
				})

			},
			chooseRole() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '请选择你的身份，医生还是普通用户？',
					confirmText: "医生", //这块是确定按钮的文字
					cancelText: "普通用户", //这块是取消的文字
					success(res) {
						if (res.confirm) {
							_this.role = "doc";
							_this.init();
						} else if (res.cancel) {
							_this.role = "patient";
							_this.init();
						}
					},

				})


				// this.$dialog.confirm({
				// 		title: '提示',
				// 		message: '请选择你的身份，医生还是普通用户',
				// 		confirmButtonText: '医生',
				// 		cancelButtonText: '普通用户',
				// 	})
				// 	.then(() => {
				// 		this.role = "doc";
				// 		this.init();
				// 	})
				// 	.catch(() => {
				// 		this.role = "patient";
				// 		this.init();
				// 	});


			},
			creatScoket() {
				console.log("判断----》", `${scoketUrl}${this.userId}/${this.role}`)
				let that = this;
				uni.connectSocket({
					url: `${scoketUrl}${this.userId}/${this.role}`,
					success(res) {
						console.log("判断是否已连接----》", res)
						that.open(); //1、判断是否打开连接
						that.scoketMessage(); //2、判断websocket服务器是否返回信息
						// that.TimeOut(); //3、websocket超时操作
					},
					fail(err) {
						console.log("WebSocket连接失败 connectSocket=", err);
						that.error();
					},
				});


				// console.log("scoketUrlscoketUrl======>",scoketUrl)
				// this.webSocket = new WebSocket(`${scoketUrl}${this.userId}${this.role}`);
				// console.log("连接成功");
				// this.webSocket.onerror = (event) => {
				// 	alert("连接错误");
				// };

				// this.webSocket.onopen = (event) => { 
				// };

				// this.webSocket.onclose = (event) => {
				// 	alert("服务不存在或者被关闭");
				// };

				// this.webSocket.onmessage = (event) => {
				// 	let data = JSON.parse(event.data);
				// 	if (!data.message) {

				// 	} else {
				// 		this.receiveMsgHandle(data.message);
				// 	}
				// };
			},
			//连接成功
			open() {
				let that = this;
				uni.onSocketOpen(
					(res) => {
						console.log("WebSocket连接成功了-------->");
						// that.reset();  //连接成功之后做两秒的一次连接(心跳机制)
					});
			},
			//服务器返回信息
			scoketMessage() {
				let that = this;
				console.log("消息发送成功后服务端响应了");
				uni.onSocketMessage((event) => {
					let data = JSON.parse(event.data);
					console.log("消息发送成功后服务端响应了返回数据了", data);
					if (!data.message) {
						// if (data.code == "201") {
						//   this.chooseRole();
						//   this.$message.error(data.msg);
						// }
					} else {
						this.receiveMsgHandle(data.message);
					}
					console.log("-服务器返回信息--99999》", res);

				});
			},
			receiveMsgHandle(res) {
				// 切换控制权权
				console.log(res);
				if (res.master == undefined) {
					if (res.eventNo == 3901) {
						this.randomArr = res.data;
						this.palynum();
					}
					if (res.eventNo == 3902) {
						this.userClick(res.data);
					}
					if (res.eventNo == 3903) {
						this.userDel();
					}
					if (res.eventNo == 3904) {
						this.userSubmit();
					}
					if (res.eventNo == 3905) {
						this.buttonShow = false;
					}
					if (res.eventNo == 3906) {
						console.log(res.data)
						this.endTest();

					}
					if (res.eventNo == 3907) {
						uni.showToast({
							icon: "none",
							title: '测试结束！'
						})
						//跳转新测试结果页面
						this.goTestResult(res.data);
					}

				} else {
					this.radio1 = res.master ? "doc" : "patient";
				}
			},

			// 发送消息处理方法
			sendMsgHandle(No, data) {
				let msg = {
					toUserId: this.toUserId,
					message: {
						msg: "点击了一次",
						eventNo: No,
						data: data,
					},
				};
				this.webSocket.send(JSON.stringify(msg));
			},
			async startTiming() {
				if (this.$store.state.userInfo.user.id == "") {
					uni.showToast({
						icon: "none",
						title: '请先登录！'
					})
					getApp().jumpToTestRecordLogin()
					return;
				}

				this.timingFlag = setInterval(() => {
					if (this.timingNum == 0) {
						this.timingShow = false;

						this.timingFlag = clearInterval(this.timingFlag);
						if (!this.desFlag) {
							this.generateRandom(this.result.DESC[this.cumulation].diff);
						}
					} else {
						this.countDownStr = this.timingNum;
						this.timingNum--;
					}
				}, 1000);
			},
			startTime() {
				//初始化设置计时器为0
				this.commonTime = 0;

				this.timeFlag = setInterval(() => {
					this.commonTime++;
				}, 1000);
			},
			endTime() {
				this.timeFlag = clearInterval(this.timeFlag);
			},
			async sleep() {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, 1000);
				});
			},

			// 产生随机数组

			generateArray(arrSize) {
				this.randomArr = [];
				// 循环N次生成随机数 

				for (let k = 0; k < arrSize; k++) {
					let id = Math.floor(Math.random() * 10);

					if (k < 10) {
						if (this.randomArr.indexOf(this.arrList[id]) === -1) {
							this.randomArr.push(this.arrList[id]);
						} else {
							k = k - 1;
							continue;
						}
					} else {
						this.randomArr.push(this.arrList[id]);
					}
				}
			},

			generateRandom(arrSize) {
				// 产生随机数
				if (!this.showCover) {
					this.generateArray(arrSize);
					// this.sendMsgHandle(3901, this.randomArr);
					this.palynum();
				}

			},
			async palynum() {
				this.randomDigital = this.randomArr.join("");
				for (let i in this.randomArr) {
					this.randomNum = this.randomArr[i];
					await this.sleep();
				}
				//输入器显示
				this.digitalShow = false;
				// 启动计时器开始计时
				this.startTime();
			},
			userClick(param) {
				//用户点击输入数字
				// this.sendMsgHandle(3902, param);
				this.numberArr.push(param);
				// this.numberShow += param;
				this.numberShow = this.numberArr.join("");
			},
			userDel() {
				// 删除数字
				// this.sendMsgHandle(3903, null);
				this.numberArr.pop();
				this.numberShow = this.numberArr.join("");
			},
			userSubmit() {
				//提交结果
				// this.sendMsgHandle(3904, null);
				if (this.numberShow.length == 0) {
					// this.$message.error("请输入数字提交");

					uni.showToast({
						title: '请输入数字提交'
					})
					return;
				}

				//关闭计时器
				this.endTime();

				if (this.desFlag) {
					if (this.numberShow.length == this.randomDigital.length) {
						//正背
						if (this.numberShow == this.randomDigital) {
							this.result.AESC[this.cumulation].qNumberSequence =
								this.randomDigital; //呈现字母序列
							this.result.AESC[this.cumulation].userResponseSequence =
								this.numberShow; //用户反应字母序列
							this.result.AESC[this.cumulation].rightOrWrong = "YES"; //反应正确性
							this.result.AESC[this.cumulation].responseTime = this.commonTime; //反应时

							// 判断获取等级分值
							if (this.cumulation % 2 != 0) {
								if (this.result.AESC[this.cumulation - 1].rightOrWrong == "YES") {
									this.result.AESCScore = this.result.AESC[this.cumulation].diff;
								}
							}
						} else {
							this.result.AESC[this.cumulation].qNumberSequence =
								this.randomDigital; //呈现字母序列
							this.result.AESC[this.cumulation].userResponseSequence =
								this.numberShow; //用户反应字母序列
							this.result.AESC[this.cumulation].rightOrWrong = "NO"; //反应正确性
							this.result.AESC[this.cumulation].responseTime = this.commonTime; //反应时
						}
					} else {
						this.result.AESC[this.cumulation].qNumberSequence =
							this.randomDigital; //呈现字母序列
						this.result.AESC[this.cumulation].userResponseSequence =
							this.numberShow; //用户反应字母序列
						this.result.AESC[this.cumulation].rightOrWrong = "NO"; //反应正确性
						this.result.AESC[this.cumulation].responseTime = this.commonTime; //反应时
					}

					if (this.cumulation >= 19) {
						uni.showToast({
							title: '正背测试完成！接下来进入倒背测试！'
						})


						// 进倒背背练习
						this.cumulation = 0;
						// 是否正背
						this.desFlag = false;

						//关闭输入器显示数字展示
						this.digitalShow = true;
						//清空显示器数字
						this.numberArr = [];
						this.numberShow = "";

						//倒背第一个数据开始
						// this.generateRandom(this.result.DESC[this.cumulation].diff);
						//修改数据，调用倒计时
						// this.timingDes = '休息10秒后继续开始倒背测试'; //倒计时提示语
						this.countDownStr = "测试马上开始！";
						this.timingNum = 10; //倒计时初始化时间
						this.timingShow = true; //显示倒计时
						this.startTiming();

						//清空显示器数字
						// this.numberShow = '';
						//关闭计时器
						this.endTime();
					} else {
						// 累加器自增
						this.cumulation++;
						//关闭输入器显示数字展示
						this.digitalShow = true;
						//清空显示器数字
						this.numberArr = [];
						this.numberShow = "";
						this.generateRandom(this.result.AESC[this.cumulation].diff);
					}
				} else {
					if (this.numberShow.length == this.randomDigital.length) {
						//倒背
						if (this.numberShow == this.randomArr.reverse().join("")) {
							this.result.DESC[this.cumulation].qNumberSequence =
								this.randomDigital; //呈现字母序列
							this.result.DESC[this.cumulation].userResponseSequence =
								this.numberShow; //用户反应字母序列
							this.result.DESC[this.cumulation].rightOrWrong = "YES"; //反应正确性
							this.result.DESC[this.cumulation].responseTime = this.commonTime; //反应时

							// 判断获取等级分值
							if (this.cumulation % 2 != 0) {
								if (this.result.DESC[this.cumulation - 1].rightOrWrong == "YES") {
									this.result.DESCScore = this.result.DESC[this.cumulation].diff;
								}
							}
						} else {
							this.result.DESC[this.cumulation].qNumberSequence =
								this.randomDigital; //呈现字母序列
							this.result.DESC[this.cumulation].userResponseSequence =
								this.numberShow; //用户反应字母序列
							this.result.DESC[this.cumulation].rightOrWrong = "NO"; //反应正确性
							this.result.DESC[this.cumulation].responseTime = this.commonTime; //反应时
						}
					} else {
						this.result.DESC[this.cumulation].qNumberSequence =
							this.randomDigital; //呈现字母序列
						this.result.DESC[this.cumulation].userResponseSequence =
							this.numberShow; //用户反应字母序列
						this.result.DESC[this.cumulation].rightOrWrong = "NO"; //反应正确性
						this.result.DESC[this.cumulation].responseTime = this.commonTime; //反应时
					}

					if (this.cumulation >= 17) {

						let routerInfo = {
							"正序成绩": this.result.AESCScore + "",
							"倒序成绩": this.result.DESCScore + "",
						};


						if (!this.showCover) {
							let params = {
								userId: this.userId,
								result: this.result,
								testPlanId: this.testPlanId
							}
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
										if (response && response.code == '200') {
											// this.sendMsgHandle(3907, response.data);

											uni.showToast({
												title: '测试结束！'
											})

											//清空显示器数字
											this.numberArr = [];
											this.numberShow = "";
											//关闭计时器
											this.endTime();
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


							// this.$http.post(
							// 	`/cognize/DST`, {
							// 		userId: this.userId,
							// 		result: this.result,
							// 		testPlanId: this.testPlanId,
							// 	},
							// 	(response) => {
							// 		if (response && response.code == '200') {
							// 			// this.sendMsgHandle(3907, response.data);

							// 			uni.showToast({
							// 				title: '测试结束！'
							// 			})

							// 			//清空显示器数字
							// 			this.numberArr = [];
							// 			this.numberShow = "";
							// 			//关闭计时器
							// 			this.endTime();
							// 			//跳转新测试结果页面
							// 			this.goTestResult(response.data);
							// 		}
							// 	}
							// );
						} else {

							//清空显示器数字
							this.numberArr = [];
							this.numberShow = "";
							//关闭计时器
							this.endTime();
						}


					} else {
						// 累加器自增
						this.cumulation++;
						//关闭输入器显示数字展示
						this.digitalShow = true;
						//清空显示器数字
						this.numberArr = [];
						this.numberShow = "";
						this.generateRandom(this.result.DESC[this.cumulation].diff);
					}
				}
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
			// goTestResult(id) {
			// 	this.$http.get(`getRecordById?id=${id}`, {}, (res) => {
			// 		if (res.code == 2001) {

			// 			uni.showToast({
			// 				title: res.msg
			// 			})
			// 			return;
			// 		}
			// 		if (res && res.code == 200) {
			// 			if (JSON.parse(res.data?.userRecordEntity?.testResult).versionNo == "2.0.1") {
			// 				//跳转新测试结果模版数据暂存本地
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
			// 				title: '获取数据失败！服务器异常'
			// 			})

			// 		}
			// 	});
			// },
			endTest() {
				//当测试未结束时
				//当现在正进行正序时需要先执行倒计时开始倒序
				if (this.role == "doc") {
					// this.sendMsgHandle(3906, null);
				}

				if (this.desFlag) {
					this.cumulation = 0;
					// 是否正背
					this.desFlag = false;
					//关闭输入器显示数字展示
					this.digitalShow = true;
					//清空显示器数字
					this.numberArr = [];
					this.numberShow = "";

					//倒背第一个数据开始
					// this.generateRandom(this.result.DESC[this.cumulation].diff);
					//修改数据，调用倒计时
					// this.timingDes = '休息10秒后继续开始倒背测试'; //倒计时提示语
					this.countDownStr = "倒序测试马上开始！";
					this.forceEndButtonName = "结束倒序测试";
					this.timingNum = 10; //倒计时初始化时间
					this.timingShow = true; //显示倒计时
					this.startTiming();

					//清空显示器数字
					// this.numberShow = '';
					//关闭计时器
					this.endTime();
				} else {
					//保存数数据到数据库
					let result = {
						"正序成绩": this.result.AESCScore + "",
						"倒序成绩": this.result.DESCScore + "",
					}
					// sessionStorage.setItem("resultInfo", JSON.stringify(result));

					if (this.role != "doc") {
						// this.$router.push(`/cognitiveTestResult?from=1&testPlanId=${this.testPlanId}`);
						if (this.testPlanId) {
							//来自测试计划列表
							this.$router.push({
								name: "testPlanClassify",
								params: {
									testPlanId: this.testPlanId,
								},
							});
						} else {
							// this.$router.push("/index/cognitionTask");
						}
					} else {
						this.$http.post(`/cognize/DST`, {
							userId: this.userId,
							result: this.result,
							testPlanId: this.testPlanId,
						}, (response) => {
							if (response && response.code == '200') {
								uni.showToast({
									title: '测试结束！'
								})

								// this.$router.push("/welcome/CognitiveAbility");
								// this.sendMsgHandle(3907, response.data);
								//清空显示器数字
								this.numberArr = [];
								this.numberShow = "";
								//关闭计时器
								this.endTime();
								//关闭socket
								this.closeWebsocket()
								//跳转新测试结果页面
								this.goTestResult(response.data);
							}
						});
					}
				}

			},
			//关闭websocket
			closeWebsocket(e) {
				if (this.webSocket) {
					this.webSocket.close();
					// let _this=this
					this.webSocket.onclose = function(evt) {
						console.log("websocket已关闭");
					};
				}
			}
		},
		beforeDestroy() {
			//卸载事件
			window.removeEventListener('beforeunload', e => this.closeWebsocket(e))
		},
		destroyed() {
			clearInterval(this.timeFlag);
			clearInterval(this.timingFlag);
			//关闭socket
			this.closeWebsocket()
		},

	}
</script>

<style scoped>
	@import url('./css/DigitalMemoryTest.css');
</style>
