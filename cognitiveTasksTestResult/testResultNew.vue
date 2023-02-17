<template>
	<div class="report-warp">
<u-navbar v-if="scrollTopNum" leftText="返回" title="认知任务" @leftClick="leftClick">
			</u-navbar>
		<div class="report-title"
			:style="'background-image: url('+reportTitleBg+');background-size: cover;background-repeat: no-repeat;'">
			{{ data.userRecordEntity.name }}
		</div>

		<div class="report-main">

			<div class="report-user" v-if="data.userRecordEntity && userInfonickName">
				<div class="report-name">{{ userInfonickName  }}</div>
				<div class="report-time">测评时间：{{ data.userRecordEntity.testDate }}</div>
			</div>

			<div class="report-tip">
				<div class="tip-title">报告阅读说明</div>
				<p class="tip-desc">谢谢您的参与，阅读本报告时，请注意以下内容：</p>
				<p class="tip-content">本结果仅供参考，不可作为临床诊断的依据；</p>
				<p class="tip-content">如结果与你自己或他人感知的有出入，可回忆在测试时是否有事情影响了你，或自己答题时是否有所顾虑；</p>
				<p class="tip-content">如对报告有不理解的地方，建议向专业资质人员进行咨询。</p>
			</div>

			<div class="report-total-score-warp" v-if="allData.ifShow && allData.ifShow.totalScore">
				<div class="total-score">总分：<span class="score">{{ allData.totalScore[0].totalScore }}</span>分</div>
				<div class="score-des">
					{{ allData.totalScore[0].totalScoreDesc }}
				</div>
			</div>

			<div class="score-warp" v-if="allData.ifShow.radar || allData.ifShow.table">

				<div class="score-title"
					:style="'background-image: url('+jianyi_icon+');background-size: cover;background-repeat: no-repeat;'">
					得分</div>

				<!--雷达图-->
				<div class="radar-warp" v-if="allData.ifShow.radar && allData.chartModule.chartType == 'radar'">
					  <lei-da-cognitive-tasks   :dataList="allData.chartModule.chartBody"></lei-da-cognitive-tasks>
	                    <!-- <radarChart :data="allData.chartModule.chartBody"></radarChart> -->
	                </div>

				<!--折线图-->
				<!-- <div class="line-warp" v-if="allData.ifShow.radar && allData.chartModule.chartType == 'line'">
	                    <lineChart :data="allData.chartModule.chartBody"></lineChart>
	                </div> -->

				<div class="table-warp" v-if="allData.ifShow && allData.ifShow.table">
					<table class="score-table" border="1" v-for="(item, index) in tableData" :key="index">
						<tr class="score-table-title displayF">
							<th v-for="(items, i) in item.columnName" :key="i">{{ items }}</th>
						</tr>
						<tr v-for="(list, j) in item.columnValue[0]" :key="j" class="displayF">
							<td v-for="(tableItem, k) in item.columnValue" :key="k">{{ tableItem[j] }}</td>
						</tr>
					</table>

				</div>
			</div>

			<div class="score-interpretation-warp" v-if="allData.ifShow && allData.ifShow.dimensions">
				<div class="score-interpretation-title">得分解读：</div>
				<div class="score-interpretation-chart-warp" v-for="(item,index) in allData.dimensions" :key="index">
					<scoreInterpretationItem :data="item" :order="index"></scoreInterpretationItem>
				</div>
			</div>

			<div class="note-warp" v-if="allData.ifShow && allData.ifShow.note">
				<p class="note-title"
					:style="'background-image: url('+pinggu_icon+');background-size: cover;background-repeat: no-repeat;'">
					注意事项</p>
				<div class="note-des">
					{{ allData.note }}
				</div>
			</div>

		</div>
		<div>
			 
			
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
	import LeiDaCognitiveTasks from "./components/leiDaCognitiveTasks.vue"
	import scoreInterpretationItem from "./components/scoreInterpretation-item";
	export default {
		name: "cognitiveTaskReport",
		components: {
			// radarChart,
			// lineChart,
			LeiDaCognitiveTasks,
			scoreInterpretationItem
		},
		props: {},
		data() {
			return {
				scrollTopNum:true,
				data: {},
				reportTitleBg: this.$imageUrl.urls.taskReport_bg,
				jianyi_icon: this.$imageUrl.urls.jianyi_icon,
				pinggu_icon: this.$imageUrl.urls.pinggu_icon,

				allData: {}, //测试显示内容 
				tableData: [], //表格数据
				 id:"",
				 messageShare:0,
				 userInfonickName:""
			}
		},
		onShow() {
		 this.userInfonickName = uni.getStorageSync('uerInfonickName') 	
		},
		onLoad(options) {
			 if (options.id) {
				this.getTestResultData(options.id);
				this.id = options.id;
				if(options.messageShare==1){
					this.messageShare  = options.messageShare
				}
				 
			}

		},
		onPageScroll(res){
		let scrollTopNum=	parseInt(res.scrollTop);
		   this.scrollTopNum = scrollTopNum>200?false:true;
			console.log(res.scrollTop);//距离页面顶部距离
		},
		onShareAppMessage(options) {
		
			var that = this;
			var shareObj = {
				// title: that.name,    // 默认是小程序的名称(可以写slogan等)
				path: '/cognitiveTasksTestResult/testResultNew?id=' + that.id +"&examWidght=testResultNew&FROMTO=cognitiveTasksTestResult&messageShare=1", // 默认是当前页面，必须是以‘/'开头的完整路径
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
		
				shareObj.path = '/cognitiveTasksTestResult/testResultNew?id=' + that.id+"&examWidght=testResultNew&FROMTO=cognitiveTasksTestResult&messageShare=1"
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
				// uni.navigateTo({
				// 	url: "/scalePage/testRecord/index"
				// })
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
			getTestResultData(id) {
				this.$request
					.get({
						url: `${getRecordById}?id=${id}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(res) => {
							if (res.code == 2001) {
								uni.showToast({
									title: res.msg
								})
								return;
							}
							if (res && res.code == 200) {
								// let isFalse = getApp().globalData.isTrue;
								if (JSON.parse(res.data?.userRecordEntity?.testResult).versionNo == "2.0.1") {
									//跳转新测试结果模版数据暂存本地，
									// 此数据是结果页面需要显示的数据
									this.data = res?.data;
									this.allData = JSON.parse(this.data?.userRecordEntity?.testResult);

									if (this.allData.ifShow.table && this.allData?.tableModule) {
										//表格数据赋值处理
										this.tableData = this.allData.tableModule;
										this.tableDataHandle();
									} 
									 
								} 

							} else {
								uni.showToast({
									title: '获取数据失败！服务器异常'
								})

							}
						})
			},
			
			
			tableDataHandle() {
				//表格数据处理
				this.tableData.forEach(item => {
					item.columnValue.forEach((items, index, arr) => {
						item.columnValue[index] = items.split(';')
					})
				});

			}

		},

	}
</script>

<style scoped>
	.report-warp {
		width: 100%;
	}
.btnArea {
		width: 60%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;

		align-items: center;
		padding-bottom: 100upx;
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

	.score-warp {
		width: 100%;
		margin-top: 20px;
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

	.note-title {
		/* background: url("../../assets/congnitiveAblitity/jianyi_icon.png") no-repeat center; */
		background-size: 100% 100%;
	}

	.radar-warp,
	.line-warp {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.table-warp {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 10px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.table-warp .score-table {
		width: 100%;
		background: #F4F4F4;
		font-size: 16px;
	}

	.score-table tr {
		height: 40px;
		line-height: 40px;
	}

	.score-table th,
	.score-table td {
		text-align: center;
		width: 50%;
	}

	.score-table th {
		background: #9DD9E3;
		border: none;
	}

	.score-table {
		border-right: 1px solid #fff;
		border-bottom: 1px solid #fff;
		border-left: none;
		border-top: none;
	}

	.score-table td {
		border-left: 1px solid #fff;
		border-top: 1px solid #fff;
	}

	.score-interpretation-warp {
		width: 100%;
		margin-top: 20px;
	}

	.score-interpretation-title {
		width: 90px;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #262626;
		border-top: 2px solid #5CB9C9;
		/*box-sizing: border-box;*/
		/*margin: 20px 0 0;*/
	}

	.score-interpretation-chart-warp {
		margin-top: 5px;
	}

	.note-warp {
		width: 100%;
		padding-top: 20px;
	}

	.note-des {
		font-size: 12px;
		font-family: PingFang SC;
		color: #262626;
		line-height: 20px;
		box-sizing: border-box;
		padding: 10px 0 10px 25px;
	}
</style>
</style>
