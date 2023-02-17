<template>
	<view class="line-progress-w">
		<u-line-progress :striped-active="true" height="30rpx" :percentage="percentage">
			<view class="u-percentage-slot row-center">
				<text style="font-size: 14px;font-weight: bold;">{{currentIndex+1}}</text>/<text style="margin-right: 20rpx;font-size: 12px;">{{total}}</text>
			 </view>
		</u-line-progress>
	</view>
</template>

<script> 
	export default {
		props: ['currentIndex', 'total'],

		data() {
			return {
				percentage: 0
			}
		},
		watch: {
			currentIndex: function(newVal, oldVal) {
				this.percentage = getApp().percentageLineProgress(newVal + 1, this.total)
			}
		},
		methods: {


		},

	}
</script>

<style scoped lang="scss">
.line-progress-w{
	    width: 94%;
	    margin: 0 auto;
}
.row-center{
	    display: flex;
	    flex-direction: row;
	    align-items: center;
}

</style>
