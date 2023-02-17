<!-- 风险决策 -->
<template>
	<div class="game_content" :style="'background-image: url('+risk_bg+');'">
		<div>
			<div class="small_content" v-show="!showResult">
				<div class="balloon">
					<img :style="{ transform: scaleAnimate }" :src="imgUrl" alt="" />
				</div>
				<div class="game_info">
					<p>
						<span style="
                height: 50px;
                font-size: 20px;
                font-family: PingFang SC;
                font-weight: bold;
                line-height: 28px;
                color: #333333;
                opacity: 1;
              ">
							{{ currentLevel + 1 }}</span><span style="
                font-size: 15px;
                font-family: PingFang SC;
                line-height: 28px;
                color: #000000;
                opacity: 1;
              ">
							/10</span>
					</p>
					<p>
						<span class="text1">本次收益: &nbsp;&nbsp;&nbsp;{{ currentEarn }}</span>
					</p>
					<p>
						<span class="text1">充气次数: &nbsp;&nbsp;&nbsp;{{ aeratedCount }}</span>
					</p>
					<p>
						<span class="text1">总收益:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ totalEarn }}</span>
					</p>
					<p style="display: flex;justify-content: center;margin-top: 40px;">
						<button class="button" @click="goAerated" :disabled="disabled">充气</button>
						<button class="button" style="margin-left: 10px" @click="getMony">提现</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		taskImgs
	} from "./data/riskPolicy.js";
	export default {
		data() {
			return {
				risk_bg: '',
				currentLevel: 0, // 当前关数
				aeratedCount: 0, // 当前充气次数
				aeratedArr: [], // 随机数组
				boomProbability: 0, // 爆炸概率
				totalEarn: 0, // 总收益
				scaleAnimate: "", // 缩放倍数
				userData: [], // 用户原始数据
				totalAerated: 0, // 总充气次数
				showResult: false,
				boom: {},
				imgUrl: taskImgs.bool,
				inflate: {},
				collect: {},
				disabled: false,
			};
		},
		onShow() {
			this.risk_bg = taskImgs.risk_bg;
			this.createAeratedArr();
			this.userId = this.$store.state.userInfo.user.id;
			this.voiceInit();
		},
		computed: {
			// 当前收益
			currentEarn() {
				return this.aeratedCount * 1;
			},
		},
		methods: {
			// 随机生成充气次数，2-10次;
			createAeratedArr() {
				for (let i = 0; i < 10; i++) {
					let temp = Math.round(Math.random() * 8) + 2;
					this.aeratedArr.push(temp);
				}
			},

			// 充气
			goAerated() {
				if (this.aeratedCount < this.aeratedArr[this.currentLevel]) {
					// 播放充气声音
					this.inflate.play();
					this.aeratedCount++;
					this.scaleAnimate = `scale(${this.aeratedCount * 0.05 + 1})`;
				} else {
					this.disabled = true;
					let clickTimes = this.aeratedCount; //变量重新赋值，防止变量因延时器提升取值为0
					// 播放爆炸声音
					this.boom.play();
					// 记录总点击次数
					this.imgUrl = taskImgs.boom;
					setTimeout(() => {
						this.imgUrl = taskImgs.bool;
						this.totalAerated += this.aeratedCount;
						// 记录原始数据
						this.userData.push({
							index: this.currentLevel + 1,
							// currentEarn: this.currentEarn,
							currentEarn: 0,
							numberPumps: clickTimes,
							explosion: true, //是否爆炸
						});
						// 若为最后一关
						if (this.currentLevel >= 9) {
							this.saveUserData();
						} else {
							this.currentLevel++;
							this.aeratedCount = 0;
							this.scaleAnimate = "scale(1)";
							this.disabled = false;
						}
					}, 500);
				}
			},
			screen() {
				screenfull.toggle();
			},
			// 提现
			getMony() {
				if (this.currentEarn > 0) {
					// 播放爆炸声音
					this.collect.play();
					// 记录总数据
					this.totalEarn += this.currentEarn;
					this.totalAerated += this.aeratedCount;
					// 记录原始数据
					this.userData.push({
						index: this.currentLevel + 1,
						currentEarn: this.currentEarn,
						numberPumps: this.aeratedCount,
						explosion: false, //是否爆炸
					});
					// 若为最后一关
					if (this.currentLevel >= 9) {
						this.saveUserData();
					} else {
						this.aeratedCount = 0;
						this.currentLevel++;
						this.scaleAnimate = "scale(1)";
					}
				}
			},
			returnHome() {
				this.screen();
				uni.navigateTo({
					url: "/welcome/CognitiveAbility"
				})
			},
			// 提交用户测试数据
			saveUserData() {
				let params = {
					userId: this.userId,
					totalEarned: this.totalEarn,
					rawData: this.userData,
					testPlanId: "",
					totalAerated: this.totalAerated,
				}
				let par = this.$CryptoJS.AesEncrypt(JSON.stringify(params))
				this.$request.post({
					url: 'cognize/RDT',
					data: {
						data: par
					}
				}).then(
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
							url: "/cognitiveTasksTestResult/testResult?id=" + id +
								"&messageShare=1&flag=" + getApp()
								.globalData.flag
						})
						console.log("旧====>", isFalse)
					}

				}, 1000)
			},
			voiceInit() {
				this.boom = uni.createInnerAudioContext();
				this.boom.src =
					'https://test.jue-ming.com:8849/api/show?filePath=./images/1d676264-f311-4650-9b17-b8b0d36198c5.wav'
				this.inflate = uni.createInnerAudioContext();
				this.inflate.src =
					'https://test.jue-ming.com:8849/api/show?filePath=./images/8c2e3e60-b965-48f0-9fff-0dc6ac143b2d.mp3'
				this.collect = uni.createInnerAudioContext();
				this.collect.src =
					'https://test.jue-ming.com:8849/api/show?filePath=./images/a1f9f76a-46a8-4e08-bd0b-fb28501ac0f3.mp3'
			},

			drawLine1() {
				this.$nextTick(() => {
					let myChart = this.$echarts.init(document.getElementById("one"));
					myChart.setOption({
						series: [{
							type: "gauge",
							progress: {
								show: true,
								width: 5,
								itemStyle: {
									color: {
										type: "linear",
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
												offset: 0,
												color: "#98F0FF", // 0% 处的颜色
											},
											{
												offset: 1,
												color: "#FFBA43", // 100% 处的颜色
											},
										],
										global: false, // 缺省为 false
									},
									borderColor: "#000000",
									borderWidth: 0,
								},
							},
							axisLine: {
								lineStyle: {
									width: 5,
								},
							},
							axisTick: {
								show: false,
							},
							splitLine: {
								length: 5,
								lineStyle: {
									width: 1,
									color: "#999",
								},
							},
							axisLabel: {
								distance: 5,
								color: "#999",
								fontSize: 10,
							},
							anchor: {
								show: true,
								showAbove: true,
								size: 5,
								itemStyle: {
									borderWidth: 5,
								},
							},
							title: {
								show: false,
							},
							detail: {
								valueAnimation: true,
								fontSize: 15,
								offsetCenter: [0, "60%"],
							},
							data: [{
								value: this.totalAerated,
							}, ],
						}, ],
					});
				});
			},
			drawLine2() {
				var that = this;
				this.$nextTick(() => {
					let myChart = this.$echarts.init(document.getElementById("two"));
					myChart.setOption({
						series: [{
							type: "gauge",
							progress: {
								show: true,
								width: 5,
								itemStyle: {
									color: {
										type: "linear",
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
												offset: 0,
												color: "#98F0FF", // 0% 处的颜色
											},
											{
												offset: 1,
												color: "#FFBA43", // 100% 处的颜色
											},
										],
										global: false, // 缺省为 false
									},
									borderColor: "#000000",
									borderWidth: 0,
								},
							},
							axisLine: {
								lineStyle: {
									width: 5,
								},
							},
							axisTick: {
								show: false,
							},
							splitLine: {
								length: 5,
								lineStyle: {
									width: 1,
									color: "#999",
								},
							},
							axisLabel: {
								distance: 5,
								color: "#999",
								fontSize: 10,
							},
							anchor: {
								show: true,
								showAbove: true,
								size: 5,
								itemStyle: {
									borderWidth: 5,
								},
							},
							title: {
								show: false,
							},
							detail: {
								valueAnimation: true,
								fontSize: 15,
								offsetCenter: [0, "60%"],
							},
							data: [{
								value: this.totalEarn,
							}, ],
						}, ],
					});
				});
			},
		},
	}
</script>

<style scoped>
	.game_content {
		background-size: cover;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.echart {
		margin-left: 110px;
		text-align: center;
	}

	.small_content {
		width: 90vw;
		height: 80vh;
		margin: 5vh auto;
		background: url('https://test.jue-ming.com:8849/api/show?filePath=./images/a8ff2581-d1af-4275-8f26-3c835755dea1.png') no-repeat center;
		background-size: 100% 100%;
		opacity: 0.7;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.text1 {
		height: 28px;
		font-size: 18px;
		font-family: PingFang SC;
		line-height: 28px;
		color: #000000;
		opacity: 1;
	}

	.button {
		width: 70px;
		line-height: 40px;
		opacity: 1;
		background: #07c160;
		color: #ffffff;
	}

	.balloon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.balloon image {
		display: block;
		width: 198rpx;
		height: 232rpx;
	}

	.game_info {
		width: 100%;
		text-align: center;
	}

	.result {
		padding-top: 20px;
	}

	.result p {
		font-size: 24px;
		color: #222222;
		text-align: center;
		line-height: 100px;
	}
</style>
