<template>
	<view>
		<!-- 	<canvas style="width: 346px;height: 2000px;position: fixed;opacity: 0;left: -111111px;" class="canvas"
			canvas-id="canvasID"></canvas>
		<image :src="imgUrl" mode="" style="opacity: 0;display: none;"></image>
		 -->
		<view class="" ref="targetDom" id="targetDom">
			<u-navbar leftText="返回" title="测试结果" @leftClick="leftClick">
			</u-navbar>
			<view class="total-score-progress-content">


				<u-row>
					<u-col span="9">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress mrr textColor">总分 </view>
							<view class="total-score-progress-width">
								<view class="textColor fontWeight">
									{{ testResult == 2? totalScores.toFixed(2) :scoresList[0].tableContext[0].value[0] }}分
								</view>
								<!-- <view class="total-score-progress-line">
									<u-line-progress activeColor="#3FB4C9" height="18" :percentage="totalScores"
										:showText="false"></u-line-progress>
								</view> -->
							</view>
						</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout-bg-purple" v-if="totalScores">
							<image :src="persion"></image>
						</view>
					</u-col>
				</u-row>

				<u-row v-if="showTestedPerson">
					<u-col span="12">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor displayRow">
								<u-avatar size="60" :src="avatarUrl" shape="circle"></u-avatar>
								受测人:<span>{{ petName }}</span>
							</view>

						</view>
					</u-col>

				</u-row>
				<u-row>
					<u-col span="12">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="improvementSuggestions != '无'">
								解读：<span>{{ improvementSuggestions }}</span> </view>

						</view>
					</u-col>

				</u-row>

				<u-gap height="20"></u-gap>
				<u-row>
					<u-col span="9">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="name">量表名称：{{name}} </view>

						</view>
					</u-col>

				</u-row>
				<u-gap height="20"></u-gap>
				<u-row>
					<u-col span="12">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="time">测试时间：{{time}} </view>

						</view>
					</u-col>

				</u-row>
				<u-row>
					<u-col span="12">
						<div class="report-tip">
							<div class="tip-title">报告阅读说明</div>
							<p class="tip-desc">谢谢您的参与，阅读本报告时，请注意以下内容：</p>
							<!--<p class="tip-content">测评图表可快速帮您掌握报告内容；</p>-->
							<p class="tip-content">本结果仅供参考，不可作为临床诊断的依据；</p>
							<p class="tip-content">如结果与你自己或他人感知的有出入，可回忆在测试</br>时是否有事情影响了你，或自己答题时是否有所顾虑；</p>
							<p class="tip-content">如对报告有不理解的地方，建议向专业资质人员进行咨询。</p>
						</div>
					</u-col>

				</u-row>
			</view>

			<unTable :scoresList="scoresList" :testResult="testResult" />
			<leiDa :reference="reference" :scoreList="scoreList" :indicator="indicator" />

			<view class="over-style marTop20"
				v-if="symptomDescription[0].improvementSuggestions !='无' &&symptomDescription.length>0">
				结果分析
			</view>
			<view class="custom-style-list padding20" v-for="(list,j) in symptomDescription" :key="j"
				v-if="list.symptom != undefined &&list.symptom != '无' && list.improvementSuggestions != '无' && list.symptom != '无'">

				<u-row>
					<u-col span="12">
						<view class="custom-style-list-left weight">
							<view v-if="list.name != '总分' &&list.symptom != '无' ">{{list.name}}:{{list.symptom}} </view>

						</view>
					</u-col>

				</u-row>
				<u-row>

					<u-col span="12" v-if="list.improvementSuggestions != '无'">
						<view class="padding10 textIndent">{{list.improvementSuggestions}}</view>
					</u-col>
				</u-row>
			</view>

		</view>
		<view class="custom-style-list">

			<!-- <u-col span="6">
					<view class="custom-style-list-left">
						@click="getPDF"
						<u-button @click="downloads" type="success" size="mini"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">
							下载测试结果</u-button>

					</view>
				</u-col> 
				<u-col span="6">
					<view class="custom-style-list-left">
						<u-button @click="saveImage" type="success" size="mini"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">
							保存图片</u-button>

					</view>
				</u-col>-->
			<!-- #ifdef MP-WEIXIN -->
			<u-row customStyle="margin-bottom: 20rpx;padding:30rpx 0" :gutter="10" v-if="getBenDatas != null">
				<u-col span="4">
					<view class="custom-style-list-left">
						<u-button type="success" size="mini" data-name="shareBtn" open-type="share"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">
							转发</u-button>

					</view>
				</u-col>
				<u-col span="4">
					<view class="custom-style-list-right marTop20">
						<u-button @click="navBackTest" type="success" size="mini"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">再测一次
						</u-button>
					</view>
				</u-col>
				<u-col span="4">
					<view class="custom-style-list-right marTop20">
						<u-button @click="navBack" type="success" size="mini"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">返回
						</u-button>
					</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 20rpx;padding:30rpx 0" :gutter="10" v-else>
				<u-col span="6">
					<view class="custom-style-list-left">
						<u-button type="success" size="mini" data-name="shareBtn" open-type="share"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">
							转发</u-button>

					</view>
				</u-col>

				<u-col span="6">
					<view class="custom-style-list-right marTop20">
						<u-button @click="navBack" type="success" size="mini"
							class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">返回
						</u-button>
					</view>
				</u-col>
			</u-row>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<center>
				<view v-if="getBenDatas != null" class="custom-style-list-right marTop20 mrr">
					<u-button @click="navBackTest" type="success" size="mini"
						class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">再测一次
					</u-button>
				</view>
				<view class="custom-style-list-right marTop20">
					<u-button @click="navBack" type="success" size="mini"
						class="content_app11 textColorff weight fontSize30" shape="circle" style="height:40px">返回
					</u-button>
				</view>
			</center>
			<!-- #endif -->

		</view>
	</view>
</template>

<script>
	import leiDa from "@/components/mpvueEcharts/leiDa.vue"
	import unTable from "../components/unTable.vue"

	import {
		baseUrl
	} from '@/common/config.js'
	import {
		mapGetters
	} from "vuex";
	// var app = getApp().globalData;
	var loginRes;
	import {
		getRecordById
	} from "@/api/index.js";
	var _this;
	export default {
		name: "testResults",
		components: {
			leiDa,
			unTable

		},
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {
			return {
				getBenDatas: null,
				avatarUrl: "",
				petName: "",
				showTestedPerson: false,
				baseUrl: baseUrl,
				name: "",
				time: "",
				persion: this.$imageUrl.urls.persion,
				totalScores: 0,
				symptomScore: [],
				symptomDescription: [],
				symptom: "",
				reference: [],
				scoreList: [],
				indicator: [],
				improvementSuggestions: "无",
				scoresList: [],
				resultId: "",
				subjectOrCognitiveId: "",
				testResult: 2,
				imgUrl: '',
				messageShare:0,
				productList: [{
						name: '谢谢您的参与，阅读本报告时，请注意以下内容：'
					},
					{
						name: '. 本结果仅供参考，不可作为临床诊断的依据'
					},
					{
						name: '. 如结果与你自己或他人感知的有出入，可回忆在测试'
					},
					{
						name: '时是否有事情影响了你，或自己答题时是否有所顾虑'
					},
					{
						name: '. 如对报告有不理解的地方，建议向专业人员进行咨询'
					}
				]
			};
		},
		onShareAppMessage(options) {

			var that = this;
			var userInfonickName = uni.getStorageSync('uerInfonickName');
			  
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/scaleTestResults/testResults/index?resultId=' + that.resultId + "&avatarUrl=" + uni
					.getStorageSync("userInfoavatarUrl") + "&petName=" + userInfonickName, // 默认是当前页面，必须是以‘/'开头的完整路径
				imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: function(res) {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						// 转发失败，其中 detail message 为详细失败信息
					}
				}
			};
			// 来自页面内的按钮的转发
			if (options.from == 'button') {
				var eData = options.target.dataset;
				// console.log( eData.id);   // shareBtn
				// 此处可以修改 shareObj 中的内容
				shareObj.path = '/scaleTestResults/testResults/index?resultId=' + that.resultId + "&avatarUrl=" + uni
					.getStorageSync("userInfoavatarUrl") + "&petName=" + that.userInfo?.user?.petName;
			}
			// 返回shareObj
			return shareObj;
		},
		onBackPress(event) {
			uni.redirectTo({
				url: "/pages/tab/scaleTest/index"
			});
			return true;
		},
		onLoad(options) {
			_this = this;
			let bings = uni.getStorageSync('beginTextData')

			if (bings) {
				let bing = JSON.parse(bings);
				_this.getBenDatas = bing;
			}

			if (options.resultId) {
				if (options.petName) {
					_this.showTestedPerson = true;
				}
				if(options.messageShare==1){ 
					this.messageShare  = options.messageShare
				}
				_this.avatarUrl = options.avatarUrl || uni.getStorageSync("userInfoavatarUrl");
				_this.petName = options.petName || _this.userInfo?.user?.petName;
				_this.resultId = options.resultId;
				_this.getScaleTestResults(_this.resultId);

			}


		},

		onReachBottom() {},
		methods: {
			navBackTest() {
				uni.$emit('updateData', encodeURIComponent(JSON.stringify(this
						.getBenDatas)))					uni.navigateBack({
					delta: 2					})
				// uni.navigateTo({
				// 	url: '/scalePage/beginTest/index?params=' + encodeURIComponent(JSON.stringify(this
				// 		.getBenDatas))
				// })
			},
			// 			getCanvas() {
			// 				let data = [];
			// 				var wscreen = 750;
			// 				uni.getSystemInfo({
			// 					success: function(res) {
			// 						wscreen = res.windowWidth
			// 					}
			// 				})
			// 				let ctx = uni.createCanvasContext('canvasID', this);
			// 				ctx.setFillStyle('#d4f3f8');
			// 				ctx.fillRect(0, 0, wscreen, 2000);
			// 				// ctx.setFillStyle("transparent"); //设置canvas背景颜色
			// 				// ctx.fillRect(0, 0, 346, 500) //设置canvas画布大小
			// 				// _this.fillRoundRect(ctx, 0, 0, 346, 500, 15); //绘制一个圆角矩形
			// 				// _this.fillRoundRect(ctx, 0, 0, 346, 182, 15, '#333231'); //绘制一个圆角矩形
			// 				// _this.drawCircular(ctx, _this.avatar, 36, 32, 50, 50) //绘制圆形头像

			// 				ctx.setFontSize(18)
			// 				ctx.font = '16px normal'
			// 				ctx.setFillStyle("#3fb4c9")
			// 				ctx.fillText(`总分:${this.totalScores}`, 20, 15)
			// 				// ctx.drawImage(this.hello, 240, 10, 86, 86) //二维码
			// 				// ctx.font = '20px normal'
			// 				if (this.improvementSuggestions != "无") {
			// 					ctx.font = '12px normal'
			// 					ctx.setFillStyle("#3fb4c9")
			// 					ctx.fillText(`解读:${this.improvementSuggestions}`, 20, 35)
			// 				}
			// 				ctx.font = '12px normal'
			// 				ctx.setFillStyle("#3fb4c9")
			// 				ctx.fillText(`量表名称:${this.name}`, 20, 55)

			// 				if (this.time) {
			// 					ctx.font = '12px normal'
			// 					ctx.setFillStyle("#3fb4c9")
			// 					ctx.fillText(`测试时间${this.time}`, 20, 75)
			// 				}
			// 				ctx.font = '14px normal'
			// 				ctx.setFillStyle("#3fb4c9")
			// 				ctx.fillText(`报告阅读说明:`, 20, 95)

			// 				for (var i in this.productList) {
			// 					console.log(this.productList[i]);
			// 					ctx.font = '12px'
			// 					if (i == 0) {
			// 						ctx.setFillStyle("#666")
			// 					} else {
			// 						ctx.setFillStyle("#000")
			// 					}

			// 					ctx.fillText(this.productList[i].name, 20, 115 + i * 30)
			// 				}



			// 				let rectH = 20;
			// 				let rectW = 96;
			// 				// ctx.scale(2, 2);
			// 				ctx.lineWidth = 1;
			// 				ctx.strokeStyle = "#ccc";
			// 				ctx.textAlign = "center";
			// 				ctx.fillStyle = "#000";
			// 				ctx.fillText("项目", 100, 125 + this.productList.length * 30)
			// 				ctx.fillStyle = "#000";
			// 				ctx.fillText("内容", 194, 125 + this.productList.length * 30);


			// 				for (let k = 0; k < this.scoresList.length; k++) {
			// 					if (this.testResult == 2) {
			// 						data = this.scoresList[k].newTableContext.result;
			// 					} else {
			// 						data = this.scoresList[k].tableContext
			// 					}
			// 				}


			// 				for (let i = 0; i < data.length; i++) {
			// 					ctx.fillStyle = "#666";
			// 					ctx.fillText(data[i].name, 100, 125 + this.productList.length * 30 + rectH * i + 35);
			// 					ctx.fillStyle = "#666";
			// 					if (this.testResult == 2) {
			// 						ctx.fillText(data[i].score, 194, 125 + this.productList.length * 30 + rectH * i + 35);
			// 					} else {
			// 						ctx.fillText(data[i].value[0], 194, 125 + this.productList.length * 30 + rectH * i + 35);
			// 					}

			// 				}
			// 				//横线
			// 				for (let i = 0; i < data.length + 2; i++) {
			// 					ctx.moveTo(0, rectH * i);
			// 					ctx.lineTo(ctx.width, rectH * i);
			// 					// ctx.stroke();
			// 				}
			// 				//竖线
			// 				for (let i = 0; i < 5; i++) {
			// 					ctx.moveTo(rectW * i, 0);
			// 					ctx.lineTo(rectW * i, ctx.height);
			// 					ctx.stroke();
			// 				}
			// 				ctx.font = "14px normal";
			// 				ctx.fillText("结果分析", 30, data.length * 15 + (125 + this.productList.length * 30 + rectH * i + 35));

			// // var lineWidth = 0;
			// // var canvasWidth = c.width;//计算canvas的宽度
			// // var initHeight=15;//绘制字体距离canvas顶部初始的高度
			// // var lastSubStrIndex= 0; //每次开始截取的字符串的索引
			// 				for (let q = 0; q < this.symptomDescription.length; q++) {

			// 					if (this.symptomDescription[q].symptom != undefined && this.symptomDescription[q].symptom != '无' &&
			// 						this.symptomDescription[q].improvementSuggestions != '无' && this.symptomDescription[q].symptom !=
			// 						'无') {

			// 						if (this.symptomDescription[q].name != '总分' && this.symptomDescription[q].symptom != '无') {
			// 							ctx.font = "12px normal";
			// 							ctx.fillStyle = "#666";
			// 							ctx.fillText(`${this.symptomDescription[q].name}:${this.symptomDescription[q].symptom}`, 50,
			// 								q*30+data.length * 15 + (145 + this.productList.length * 30 + rectH * i +
			// 									35));
			// 									let  initY= q*80+data.length * 15 + (
			// 								175 + this.productList.length * 30 + rectH * i +
			// 								35)
			// 								console.log("---解读000--------->",this.symptomDescription[q].improvementSuggestions)
			// 							 this.canvasTextAutoLine(this.symptomDescription[q].improvementSuggestions,ctx,30,initY,20)

			// 						}


			// 					}

			// 				}
			// 				// this.productList.forEach((item, index) => {
			// 				// 	ctx.setFillStyle("#000")
			// 				// 	ctx.fillText(item.name, 20, 192 + index * 20)

			// 				// })
			// 				// 绘制职位标题，多余文字自动换行
			// 				// ctx.setFontSize(28)
			// 				// ctx.setFillStyle("#333333")



			// 				// 绘制微信二维码
			// 				// ctx.drawImage(this.hello, 208, 370, 120, 120) //二维码
			// 				setTimeout(() => {
			// 					ctx.draw(false, (rq) => {
			// 						uni.canvasToTempFilePath({
			// 							canvasId: 'canvasID',
			// 							success: (res) => {
			// 								this.imgUrl = res.tempFilePath
			// 								uni.saveImageToPhotosAlbum({  
			// 									filePath: res.tempFilePath,
			// 									success: function() {
			// 										uni.hideLoading()
			// 										uni.showToast({
			// 											title: "图片已保存",
			// 											duration: 2000
			// 										})
			// 									},
			// 									fail() {
			// 										uni.hideLoading()
			// 									}
			// 								})
			// 							},
			// 							fail: function(err) {
			// 								console.log(err)
			// 							}
			// 						}, this)
			// 					})
			// 				}, 1500)
			// 			},
			// 			saveImage() { 
			// 				this.getCanvas();
			// 			},
			/*
			str:要绘制的字符串
			canvas:canvas对象
			initX:绘制字符串起始x坐标
			initY:绘制字符串起始y坐标
			lineHeight:字行高，自己定义个值即可
			*/
			//  canvasTextAutoLine(str,canvas,initX,initY,lineHeight){
			//    var ctx = canvas; 
			// // let ctx = uni.createCanvasContext('canvasID', this);
			//    var lineWidth = 0;
			//    var canvasWidth = ctx.width; 
			//    var lastSubStrIndex= 0; 
			//    for(let i=0;i<str.length;i++){ 
			//        lineWidth+=ctx.measureText(str[i]).width; 
			//        if(lineWidth>canvasWidth-initX){//减去initX,防止边界出现的问题
			//            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
			//            initY+=lineHeight;
			//            lineWidth=0;
			//            lastSubStrIndex=i;
			//        } 
			//        if(i==str.length-1){
			//            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
			//        }
			//    }
			//  },

			leftClick() {
				 console.log("-this.messageShare------>",this.messageShare)
				if(this.messageShare==1){
					 uni.switchTab({
					 	url: "/pages/tab/scaleTest/index"
					 })
				}else{
					uni.navigateBack(); 
				 
				}
			},
			downloads() {
				getApp().download(_this.resultId)
			},
			navBack() {
				this.leftClick()
			},
			getScaleTestResults(id) {

				_this.$request
					.get({
						url: `${getRecordById}?id=${id}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {

							console.log("----测试结果--->", res);
							if (res.code == 200) {

								_this.testResult = parseInt(JSON.parse(res.data?.userRecordEntity?.testResult)[0].version);
								_this.name = res.data.userRecordEntity.name;
								let testDateTime = res.data.userRecordEntity.testDate;

								let yearMonthDay = testDateTime
									.replace("年", "/")
									.replace("月", "/")
									.replace("日", " ")
									.replace("时", ":")
									.replace("分", ":")
									.replace("秒", "");
								_this.time = yearMonthDay;
								if (_this.testResult == 2) {
									_this.getDataList(res.data);

								} else {

									_this.scoresList = JSON.parse(res.data.userRecordEntity.testResult);
									_this.init(_this.scoresList[0].tableContext[0].value[0])
								}



							} else if (res.code == 401) {


							} else {
								// uni.showToast({
								// 	title: "加载有误",
								// 	icon: "none",
								// })
								(res) => {
									console.log("世界上绝对绝对绝对绝对绝对的", res);
								}
							}
						})



			},
			init(v) {
				_this.totalScores = Number(parseInt(v));
			},
			getDataList(data) {
				let v = JSON.parse(data.userRecordEntity.testResult);
				_this.scoresList = v;
				console.log("-----传入的参数----->", v);
				v.forEach((items) => {

					if (items.newTableContext.iconInfo != "") {
						let indicatorList = items?.newTableContext?.iconInfo?.indicator;

						if (indicatorList.length > 0) {
							indicatorList.forEach((data) => {
								_this.indicator.push({
									text: data.text,
									max: Number(data.max)
								});
							});
						}
						let referenceList = items?.newTableContext?.iconInfo?.reference || [];
						if (referenceList.length > 0) {
							referenceList.forEach((data) => {
								_this.reference.push(Number(data));
							});
						}
						let scoreLists = items?.newTableContext?.iconInfo?.scoreList;
						if (scoreLists.length > 0) {
							scoreLists.forEach((data) => {
								_this.scoreList.push(Number(data));
							});
						}
						console.log("==1111=====>", _this.indicator)
						console.log("==2222=====>", _this.reference)
						console.log("==3333=====>", _this.scoreList)
					}
					// _this.symptomDescription=[]
					items.newTableContext.result.forEach((item) => {
						if (!item) return;
						if (item.name === "总分" || item.name === "压力综合指数") {
							_this.init(item.score);
							_this.symptom = item.symptom;
						}
						if (item.isTotalScoreExplain === "是") {
							_this.improvementSuggestions = item.symptom;
						}

						_this.symptomScore.push({
							name: item.name,
							score: item.score
						});
						_this.symptomDescription.push({
							symptom: item.symptom,
							name: item.name,
							improvementSuggestions: item.improvementSuggestions,
						});
					});

					console.log("0000-----000", _this.symptomDescription);
				});
			},
			getPDF() {
				let _this = this;
				let target = uni.createSelectorQuery().select("#targetDom");
				console.log("------>", target)
				target.scrollWidth = 750
				// // #ifdef H5
				//             let target = document.querySelector('#targetDom')  
				// _this.$createPdf(target, _this.name) 
				// // #endif

			},
		},
	};
</script>
<style scoped>
	.report-tip {
		width: 100%;
		margin-top: 20px;
		padding-left: 40rpx;
	}

	.tip-title {
		width: 100px;
		height: 35px;
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #308594;
		line-height: 35px;
		text-align: center;
		background-image: linear-gradient(to right, #6fc1cf, #deeff4);
		border-top-right-radius: 18px;
		border-bottom-left-radius: 18px;
	}

	.tip-desc {
		box-sizing: border-box;
		font-size: 12px;
		font-family: PingFang SC;
		color: #666666;
		line-height: 30px;
		padding-left: 10px;
	}

	.tip-content {
		box-sizing: border-box;
		font-size: 12px;
		font-family: PingFang SC;
		color: #000;
		line-height: 20px;
		display: list-item;
		list-style-type: disc;
		margin-left: 25px;
	}

	/* .container {
		width: 750rpx;
		height: 320px;
		background-color: aquamarine;
	} */
	.total-score-progress-content {
		padding: 20px 0;
		margin-top: 120rpx;
	}

	.total-score-progress-width {
		width: 80%;
	}

	.total-score-progress {
		font-size: 40rpx;
		font-weight: bold;
		width: 120rpx
	}

	.total-score-progress-test {
		font-size: 32rpx;
	}

	.demo-layout-bg-purple-light {
		display: flex;
		padding: 0 40rpx;
	}

	.demo-layout-bg-purple {
		width: 200rpx;
		height: 200rpx
	}

	.demo-layout-bg-purple image {
		width: 100%;
		height: 100%
	}

	.custom-style-list {
		width: 94%;
		margin: 0 auto;

	}

	.b-b {
		border: 1px solid #f5f5f5;
	}

	.b-d {

		border-right: 1px solid #f5f5f5;
	}

	.custom-style-list-left {
		text-align: center
	}

	.custom-style-list-right {
		text-align: center
	}

	.padding20 {
		margin-top: 20px
	}

	.textIndent {

		text-indent: 33px;
	}

	.content_app11 {
		width: 210rpx !important;
		height: 91rpx !important;
	}

	::v-deep .u-button--mini {
		height: 90rpx !important;
		width: 210rpx !important;

	}

	.over-style {
		color: #666666;
		font-size: 16px;
		font-weight: 400;
		border-left: 4px solid #666;
		padding-left: 10px;
		margin-left: 20px;
	}
</style>
