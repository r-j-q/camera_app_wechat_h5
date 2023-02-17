<template>
	<view class="container"> 
		<echarts class="container1001" ref="echarts" :option="option" canvasId="echartsT"></echarts>
	</view>
</template>

<script>
	import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue"
	export default {
		name: "leiDaCognitiveChart",
		props: {
		    data: {
		        type: Object,
		        default: function () {
		            return {}
		        },
		    },
		    order: {
		        type: Number,
		        default: 0,
		    }
		},
		components: {
			echarts
		},
		data() {
			return {
				option:{},
			color:['#A1CC7E','#EECD4B','#EE6D4B','#5185E5','#7ECCCB'],
			}
		},
		 
		mounted() {
			console.log("=测试结果数据在此======>",this.data)
			this.myPieEcharts(this.data.score,this.data.maximum);
		},
		methods: {

			myPieEcharts(pieData,pieMaxData) {
				let _this = this;
 
				_this.option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: false,
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '得分解读',
                            type: 'pie',
                            radius: ['50%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: pieMaxData == '无' ? true : false,
                                formatter: '{c}',
                                position: 'center',
                                fontSize: '10',
                                // fontWeight: 'bold'
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '10',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: Math.abs(pieData), name: '所获分数' },
                                { value: pieMaxData == '无' ? 0 : pieMaxData - pieData, name: '未获得分数' },
                            ],
                            itemStyle: {
                                color:  (colors) => {
                                    let colorList = [this.color[this.order],'#9E9E9E'];
                                    return colorList[colors.dataIndex];
                                }
                            }

                        }
                    ]
                }; 
			},
			// radarDataHandle() {
   //           let param = this.dataList;
			// 	this.radarData = [];
			 
			// 	param.groupData.map((item, index) => { 
			// 		this.radarData.push({
			// 			value: item.value,
			// 			name: item.name,
			// 			areaStyle: {
			// 				color: this.color[index]
			// 			}
			// 		});

			// 	});
				 
				 
			// 	this.myRadarEcharts(param.indicator,this.radarData);

			// },
		}
	}
</script>

<style>
	.container {
		width: 100px;
		height: 100px;
		/* margin: 0 auto; */

	}

	.container1001 {
		width:  100%;
		height: 100%; 
	}
</style>
