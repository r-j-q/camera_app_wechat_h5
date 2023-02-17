/**
 *
 *
 * @param {*} number  第几位
 * @param {*} src 名片头像
 * @param {*} name 名片名字
 * @param {*} qrCodeUrl 小程序codeURL图片
 */
import leiDa from "@/components/mpvueEcharts/leiDa.vue"

const wxml = (testResult, totalScores, scoresList, persion) =>
	`
<view class="total-score-progress-content">
 <u-row>
	<u-col span="9">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress mrr textColor" v-if="`+totalScores+`">总分 </view>
							<view class="total-score-progress-width" v-if="`+totalScores+`">
								<view class=" marginBottom10 textColor">
									`+ testResult == 2? totalScores.toFixed(2) :scoresList[0].tableContext[0].value[0]  +` 分
								</view>
								<view class="total-score-progress-line">
									<u-line-progress activeColor="#3FB4C9" height="18" :percentage="`+totalScores+`"
										:showText="`+false+`"></u-line-progress>
								</view>
							</view>
						</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout-bg-purple" v-if="`+totalScores+`">
							<image :src="`+persion+`"></image>
						</view>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="12">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="`+improvementSuggestions!= '无'+`"+>
								解读：<span> `+improvementSuggestions+`</span> </view>

						</view>
					</u-col>

				</u-row>

				<u-gap height="20"></u-gap>
				<u-row>
					<u-col span="9">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="`+name+`">量表名称：`+name+` </view>

						</view>
					</u-col>

				</u-row>
				<u-gap height="20"></u-gap>
				<u-row>
					<u-col span="12">
						<view class="demo-layout-bg-purple-light disRowAroundcenter">
							<view class="total-score-progress-test mrr textColor" v-if="`+time+`">测试时间：`+time+` </view>

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
							<p class="tip-content">如结果与你自己或他人感知的有出入，可回忆在测试时是否有事情影响了你，或自己答题时是否有所顾虑；</p>
							<p class="tip-content">如对报告有不理解的地方，建议向专业资质人员进行咨询。</p>
						</div>
					</u-col>

				</u-row>
			</view>
			<view v-for="`+(items,index) in scoresList+`" :key="`+index+`">
				<view class="custom-style-list">
					<u-row customStyle="margin-bottom: 20rpx;background-color: rgb(232, 241, 242);padding:40rpx 0">
						<u-col span="6" v-for="`+(itemTitle,i) in items.colNames+`">
							<view class="custom-style-list-left textColor">
								`+itemTitle+`
							</view>
						</u-col>
			
					</u-row>
				</view>
			
				<view class="custom-style-list">
					<u-row customStyle="margin-bottom: 20rpx;padding:30rpx 0"
						v-for="`+(c,p) in  testResult == 2 ?items.newTableContext.result : items.tableContext+`" :key="`+p+`"
						v-if='`+c.name != undefined+`'>
						<u-col span="6">
							<view class="custom-style-list-left">
							  `+c.name+`
							</view>
						</u-col>
						<u-col span="6">
							<view class="custom-style-list-right">`+testResult == 2?c.score:c.value[0]+`</view>
						</u-col>
					</u-row>
				</view>
			</view>
			<leiDa :reference="`+reference+`" :scoreList="`+scoreList+`" :indicator="`+indicator+`" />
			
			
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
			`





// `
// <view class="container">
//     <image src="`+pic+`"  class="pic"/>
//     <text class="name">`+ name +`</text>
//     <text class="content">`+ c1 +`</text>
//     <text class="content">`+ c2 +`</text>
//     <view class="bottom">
//         <image src="`+pic+`"  class="qr"/>
//         <text class="msg">扫码一起加入学习吧</text>
//     </view>
// </view>
// `

/**
 *
 *
 * @param {*} screenWidth 屏幕宽度
 * @param {*} canvasWidth  画布宽度
 * @param {*} canvasHeight  画布高度
 * @param {*} numberWidth  数字宽度，动态设置
 * @return {*} 
 */
const style = (screenWidth, canvasWidth, canvasHeight) => {
	return {
		"container": {
			width: canvasWidth,
			height: canvasHeight,
			position: 'relative',
			overflow: 'hidden',
			backgroundColor: '#ffffff',
		},
		"name": {
			fontSize: 20,
			color: '#333',
			marginLeft: canvasWidth * 0.08,
			width: canvasWidth * 0.84,
			height: screenWidth * 0.18,
			textAlign: 'center',
		},
		"content": {
			fontSize: 14,
			color: '#333',
			width: canvasWidth * 0.84,
			height: screenWidth * 0.15,
			marginLeft: canvasWidth * 0.08,
		},
		"pic": {
			width: canvasWidth * 0.3,
			height: screenWidth * 0.28,
			marginTop: canvasWidth * 0.1,
			marginLeft: canvasWidth * 0.35,
			marginBottom: canvasWidth * 0.05,
			borderRadius: screenWidth * 0.14,
			overflow: 'hidden',
		},
		"bottom": {
			width: canvasWidth,
			height: screenWidth * 0.2,
			flexDirection: 'row',
			justifyContent: 'self-start',
			alignItems: 'center',
			backgroundColor: '#fafafa',
			position: 'absolute',
			bottom: 0,
			left: 0,
		},
		"qr": {
			width: canvasWidth * 0.14,
			height: screenWidth * 0.14,
			marginLeft: canvasWidth * 0.04,
			marginRight: canvasWidth * 0.04,
		},
		"msg": {
			fontSize: 14,
			color: '#a1a1a1',
			width: canvasWidth * 0.74,
			height: 14,
			textAlign: 'left'
		},
	}
}

module.exports = {
	wxml,
	style
}
