<template>
	<view class="container" v-if="indicator.length>0">
		<echarts class="container100" ref="echarts" :option="option" canvasId="echartsT"></echarts>
	</view>
</template>

<script>
	import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue"
	export default {
		name: "leiDa",
		props: ["indicator", "reference", "scoreList"],

		components: {
			echarts
		},
		data() {
			return {
				option: {}
			}
		},
		watch: {
			indicator() {
				this.drawLine();
			}
		},

		methods: {
			drawLine() {
				let _this = this;
				 
				let legendData =
					_this.reference?.length > 0 ? ["你的分数", "参考值"] : ["你的分数"];

				_this.option = {
					color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
					title: {
						text: "",
						left: "left",
					},
					legend: {
						data: legendData,
						orient: "vertical",
						left: "left",
					},
					radar: [{
							center: ["25%", "50%"],
							radius: 20,
							startAngle: 2,
							splitNumber: 1,
							shape: "circle",
							axisName: {
								formatter: "【{value}】",
								color: "#428BD4",
							},
							splitArea: {
								areaStyle: {
									color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4"],
									shadowColor: "rgba(0, 0, 0, 0.2)",
									shadowBlur: 10,
								},
							},
							axisLine: {
								lineStyle: {
									color: "rgba(211, 253, 250, 0.8)",
								},
							},
							splitLine: {
								lineStyle: {
									color: "rgba(211, 253, 250, 0.8)",
								},
							},
						},
						{
							indicator: _this.indicator,

							center: ["50%", "50%"],
							radius: 80,
							axisName: {
								color: "#fff",
								backgroundColor: "#666",
								borderRadius: 3,
								padding: [3, 5],
							},
						},
					],
					series: [{
						type: "radar",
						radarIndex: 1,
						data: [{
								value: _this.scoreList,
								name: "你的分数",
								symbol: "rect",
								symbolSize: 12,
								lineStyle: {
									type: "dashed",
								},
								label: {
									show: true,
									formatter: function(params) {
										return params.value;
									},
								},
							},
							{
								value: _this.reference,
								name: "参考值",
								label: {
									show: true,
									formatter: function(params) {
										return params.value;
									},
								},
								areaStyle: {
									color: {
										type: 'linear',
										x: 0,
										y: 0,
										x2: 0,
										y2: 1,
										colorStops: [{
											offset: 0,
											color: 'rgba(58,132,255, 0.5)' // 0% 处的颜色
										}, {
											offset: 1,
											color: 'rgba(58,132,255, 0)' // 100% 处的颜色
										}],
										global: false // 缺省为 false
									}
								},
								// areaStyle: {
								//   color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
								//     {
								//       color: "rgba(255, 145, 124, 0.1)",
								//       offset: 0,
								//     },
								//     {
								//       color: "rgba(255, 145, 124, 0.9)",
								//       offset: 1,
								//     },
								//   ]),
								// },
							},
						],
					}, ],
				}
				console.log("==44444=====>", _this.indicator)
				console.log("==55555=====>", _this.reference)
				console.log("==66666=====>", _this.scoreList)
			}
		}
	}
</script>

<style>
	.container {
		/* width: 750rpx; */
		height: 320px;
		 
	}
	.container100{
		width: 100%;
		height: 100%;
	}
</style>
