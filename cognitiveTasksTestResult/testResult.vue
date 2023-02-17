<template>
	<div style="background: #ffffff">
		<u-navbar leftText="返回" title="认知任务" @leftClick="leftClick" >
					</u-navbar>
        <div class="main report-main">
			<div class="report-title"
				:style="'background-image: url('+reportTitleBg+');background-size: cover;background-repeat: no-repeat;'">
				{{ userInfo.name }}
			</div>
			<div class="report-user" >
				<div class="report-name">{{ userInfonickName  }}</div>
				<div class="report-time">测评时间：{{ userInfo.testDate }}</div>
			</div>
			<div class="report-tip">
				<div class="tip-title">报告阅读说明</div>
				<p class="tip-desc">谢谢您的参与，阅读本报告时，请注意以下内容：</p>
				<p class="tip-content">本结果仅供参考，不可作为临床诊断的依据；</p>
				<p class="tip-content">如结果与你自己或他人感知的有出入，可回忆在测试时是否有事情影响了你，或自己答题时是否有所顾虑；</p>
				<p class="tip-content">如对报告有不理解的地方，建议向专业资质人员进行咨询。</p>
			</div>
			<div class="report-total-score-warp"  >
				<div class="total-score">总分：<span class="score">{{ resultInfo.tableContext[0].value[0] }}</span>分</div>
				<!-- <div class="score-des">
					{{ allData.totalScore[0].totalScoreDesc }}
				</div> -->
			</div>
			<div class="score-title"
				:style="'margin-top:30px;background-image: url('+jianyi_icon+');background-size: cover;background-repeat: no-repeat;'">
				得分</div>
        <div>
			 
				<!-- <div class="title">测试结果</div> -->
				<table class="resTable">
					 
					<tr class='displayF'>
						<th v-for="(item, index) in resultInfo.colNames" :key="index">
							{{ item }}
						</th>
					</tr>
					<tr class='displayF' v-for="(items, index) in resultInfo.tableContext" :key="index">
						<td>{{ items.name }}</td>
						<td :style="{
	                textAlign: items.value[0].length > 11 ? 'left' : 'center',
	              }">
							{{ items.value[0] }}
						</td>
					</tr>
				</table>

			</div>


			<div class="btnArea">

				<u-button type="success" size="large" @click="leftClickcognitive"
					class="content_app11 textColorff weight fontSize30 mt10 w_401 mrr" shape="circle">返回</u-button>
				<view class="w_120"></view>
				<u-button type="success" size="large" data-name="shareBtn" open-type="share"
					class="content_app11 textColorff weight mt10 w_401 fontSize30 mrl" shape="circle">
					转发</u-button>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		getRecordById
	} from "@/api/index.js"
	export default {
		data() {
			return {
				jianyi_icon: this.$imageUrl.urls.jianyi_icon,
				reportTitleBg: this.$imageUrl.urls.taskReport_bg,
				routerType: "",
				resultInfo: {},
				userInfo:{
					nickName:""
				},
				suggestion: "",
				flag: "",
				score: 0,
				routerPath: "",
				pointColor: "",
				id: "", //来自测试列表
				from: "", //来自首页量表
				testPlanId: "", //来自测试计划
				messageShare:0,
				userInfonickName:""
			};
		},
		onShow() {
		 this.userInfonickName = uni.getStorageSync('uerInfonickName') 	
		},
		onLoad(options) {
			this.flag = options.flag || "";
			this.id = options.id || "";
			this.loadData();
			if(options.messageShare==1){
				console.log("-------",options.messageShare)
				this.messageShare  = options.messageShare
			}
		},
		onShareAppMessage(options) {

			var that = this;
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/cognitiveTasksTestResult/testResult?id=' + that.id + "&flag=" + this
				.flag+"&examWidght=testResult&FROMTO=cognitiveTasksTestResult&messageShare=1", // 默认是当前页面，必须是以‘/'开头的完整路径
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

				shareObj.path = '/cognitiveTasksTestResult/testResult?id=' + that.id + "&flag=" + that.flag+"&examWidght=testResult&FROMTO=cognitiveTasksTestResult&messageShare=1"
			}

			return shareObj;
		},
		methods: {
			leftClick() {
				if(this.messageShare==1){
					uni.switchTab({
						url: "/pages/tab/cognitiveTask/index"
					})
				}else{
				uni.navigateBack();	
				}
			},
			 leftClickcognitive() {
				if(this.messageShare==1){
					uni.switchTab({
						url: "/pages/tab/scaleTest/index"
					})
				}else{
				uni.navigateBack();	
				}
			},
			loadData() {

				this.$request
					.get({
						url: `${getRecordById}?id=${this.id}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {
							console.log("=====>>>>>", res)
							this.userInfo=res.data.userRecordEntity;
							console.log("userInfouserInfouserInfo",this.userInfo)
							let data = JSON.parse(res.data.userRecordEntity.testResult);
							this.resultInfo = data[0];

						})


			},



		},
	};
</script>

<style scoped>
	table.gridtable {
		font-family: verdana, arial, sans-serif;
		font-size: 11px;
		color: #333333;
		border-width: 1px;
		border-color: #cccccc;
		border-collapse: collapse;
		width: 90%;
		margin: 20px auto;
	}

	table.gridtable th {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #cccccc;
		background-color: rgb(238, 241, 246);
	}

	table.gridtable td {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #cccccc;
		background-color: #ffffff;
	}

	.title {
		padding: 20px;
		font-size: 20px;
		color: #57acbb;
		text-align: center;
	}
	.report-title {
		width: 100%;
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 140rpx;
		/* background: url("../../assets/congnitiveAblitity/taskReport_bg.png") no-repeat center; */
		background-size: cover;
	}
	
.report-main {
		width: 100%;
		box-sizing: border-box;
		padding: 10px; 
	}
	#main {
		margin: 0 auto;
	}

	.suggestion {
		font-size: 16px;
		color: #222222;
		line-height: 2;
		padding: 10px 0 20px;
	}

	.resutlReader {
		margin-top: 10px;
	}

	.typeTitle {
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		margin-bottom: 20px;
	}

	.resutlReader .van-step__line {
		background-color: #000000;
	}

	.resutlReader .van-step--finish .van-step__circle,
	.resutlReader .van-step--finish .van-step__line {
		background-color: #07c160;
	}
.report-total-score-warp {
		width: 100%;
		/*height: 160px;*/
		background: #F1F9FA;
		box-sizing: border-box;
		padding: 20px;
		/*margin: 20px 0;*/
		margin-top: 20px;
	}

	.total-score {
		font-size: 16px;
		font-family: PingFang SC;
		/*font-weight: 500;*/
		color: #247E8D;
	}

	.score {
		font-size: 18px;
		font-weight: 500;
	}

	.score-des {
		font-size: 14px;
		font-family: PingFang SC;
		/*font-weight: 500;*/
		color: #666666;
	}
	.taskTips {
		width: 90%;
		margin: 0 auto;
	}

	.taskTips p {
		font-size: 14px;
		color: #666666;
		line-height: 2;
	}

	.resTable {
		width: 94%;
		font-size: 16px;
		margin: 20px auto;

	}

	.resTable td,
	.resTable th {
		border: 1px solid #dddddd;
		padding: 6px 8px;
		text-align: center;
		flex: 1;
	}

	.zb table {
		width: 90%;
		color: #2a4454;
		text-align: center;
		margin: 30px auto;
	}

	.zb table tr {
		line-height: 29px;
	}

	.zb table th {
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #2a4454;
		background: rgba(227, 227, 227, 0.4);
	}

	.zb table td {
		background: rgba(216, 236, 239, 0.4);
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #2a4454;
		padding: 2px 8px;
	}

	.btnArea {
		width: 60%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;

		align-items: center;
		padding-bottom: 100upx;
	}
	.report-tip {
		width: 100%;
		margin-top: 20px;
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
	.report-user {
		width: 100%; 
			height: 45px;
		border-left: 2px solid #247E8D;
		box-sizing: border-box;
		padding-left: 5px;
		color: #247E8D;
	}
	
	.report-name {
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #247E8D;
	}
	
	.report-time {
		font-size: 14px;
		font-family: PingFang SC;
		color: #247E8D;
	}
	.score-title,
	.note-title {
		width: 150px;
		height: 35px;
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #308594;
		line-height: 35px;
		text-align: center;
	}
	
	.score-title {
		/* background: url("../../assets/congnitiveAblitity/pinggu_icon.png") no-repeat center; */
		background-size: 100% 100%;
	}
</style>
