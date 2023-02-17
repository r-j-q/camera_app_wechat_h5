<template>
    <div class="score-interpretation-warp">
        <div class="score-interpretation-left">
			<lei-da-cognitive-chart :data="data" :order="order"/>
            <!-- <div id="pieChart" ref="pieChart" style="width: 100px;height: 100px;"></div> -->
        </div>
        <div class="score-interpretation-right">
            <div class="score-interpretation-title">{{ data.name }}</div>
            <div class="score-interpretation-subtitle">所获得分：{{ data.score }}</div>
            <div class="score-interpretation-des">
                {{ data.Describe }}
            </div>
        </div>
    </div>
</template>

<script>
	import LeiDaCognitiveChart from "./leiDaCognitiveChart.vue"
	 
    export default {
        name: "scoreInterpretation-item",
        components: {LeiDaCognitiveChart},
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
        data() {
            return {
                // color:['#A1CC7E','#EECD4B','#EE6D4B','#5185E5','#7ECCCB'],
            }
        },
        mounted() {
            // this.myPieEcharts(this.data.score,this.data.maximum);
        },
        computed: {},
        watch: {

        },
        methods: {
            myPieEcharts(pieData,pieMaxData){
                let myChart = this.$echarts.getInstanceByDom(this.$refs.pieChart);
                // let myChart = this.$echarts.init(document.getElementById('pieChart'));
                if (myChart == null) {
                    myChart = this.$echarts.init(this.$refs.pieChart);
                }
                //配置图表
                let option = {
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

                Math.abs(pieData) >= 0 && option && myChart.setOption(option);
            },
        },

    }
</script>

<style scoped>
    .score-interpretation-warp {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .score-interpretation-left {
        width: 100px;
        height: 100px;
    }
    .score-interpretation-right {
        width: calc(100% - 100px);
    }
    .score-interpretation-title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 24px;
    }
    .score-interpretation-subtitle,.score-interpretation-des {
        font-size: 12px;
        /*line-height: 25px;*/
        font-family: PingFang SC;
        /*font-weight: 500;*/
        color: #262626;
    }
    .score-interpretation-subtitle {
       padding-bottom: 5px;
    }


</style>