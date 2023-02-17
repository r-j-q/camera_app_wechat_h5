<template>
	<view class="container"> 
		<echarts class="container100" ref="echarts" :option="option" canvasId="echartsT"></echarts>
	</view>
</template>

<script>
	import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue"
	export default {
		name: "leiDaCognitiveTasks",
		props: ['count','dataList'],

		components: {
			echarts
		},
		data() {
			return {
				color: ['#FCEF9A', '#D54039', '#56743E', '#FF917C'],
				radarIndicator: [],
				radarData: [],

				option: {}
			}
		},
		 
		mounted() {
			this.radarDataHandle();
		},
		methods: {

			myRadarEcharts(radarIndicator,radarData) {
				let _this = this;

	console.log("===_this.radarIndicator发生了变化=======>",_this.radarIndicator)
				_this.option = {
					color: ['#FCEF9A', '#D54039', '#56743E', '#FF917C'],
					title: {
						show: false,
					},
					legend: {
						show: false,
					},
					radar: { 
						indicator:  radarIndicator, 
						radius: 98,
						center: ['50%', '50%'],
						axisName: {
							formatter: '{value}',
							color: '#2A4454'
						},
						splitArea: {
							areaStyle: {
								color: ['#A1CC7E'],
								shadowColor: 'rgba(0, 0, 0, 0.2)',
								shadowBlur: 10
							}
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(86, 116, 62, 0.2)'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(86, 116, 62, 0.2)'
							}
						}
					},
					series: [{
						type: 'radar',
						data:  radarData,
					}]
				}; 
			},
			radarDataHandle() {
             let param = this.dataList;
				this.radarData = [];
			 
				param.groupData.map((item, index) => { 
					this.radarData.push({
						value: item.value,
						name: item.name,
						areaStyle: {
							color: this.color[index]
						}
					});

				});
				 
				 
				this.myRadarEcharts(param.indicator,this.radarData);

			},
		}
	}
</script>

<style>
	.container {
		width: 355px;
		height: 320px;
		margin: 0 auto;

	}

	.container100 {
		width:  100%;
		height: 100%; 
	}
</style>
