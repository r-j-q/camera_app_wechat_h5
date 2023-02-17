<template>
	<view style="width: 750rpx;">
		<view class="disRowAround margAll" v-for="(items,listIndex) in categoryNameLists" :key="listIndex"
			@click="navgetToBeginTest(items)">
			<view class="content_list_style_index">
				<image :src="one0Jpg[listIndex%5]" mode=""></image>
			</view>
			<view class="flex-1 mrl">
				<view class="overflow2 fontSize16 fontWeight marginBottom10">{{items.name}} </view>
				<view class="overflow1 fontSize14 marginBottom10">{{items.mobileDescription}}</view>
				<view class="marginBottom10">
					<view v-if="items.reportVersion != 2" class="tag-1 content_app11_ textColorff fontSize15">
						免费
					</view>
					<view v-if="items.reportVersion == 2" class="tag-1 content_app11_ textColorff fontSize15">
						专业报告
					</view>

				</view>
				<view class="rowBetween">
					<view class="fontSize14">{{ items.testNum }}人测试过 </view>
					<view class="b-1-style content_app_f8 textColor fontSize15 mrr">立即测试 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cameraContent',
		props: ['categoryNameLists'],

		data() {
			return {
				one0Jpg: [
					this.$imageUrl.urls.one0Jpg0,
					this.$imageUrl.urls.one0Jpg1,
					this.$imageUrl.urls.one0Jpg2,
					this.$imageUrl.urls.one0Jpg3,
					this.$imageUrl.urls.one0Jpg4,
					this.$imageUrl.urls.one0Jpg5,
				],

			}
		},

		methods: {
			navgetToBeginTest(item) {
				let params = encodeURIComponent(JSON.stringify(item)); 
				if (item.pageUrl == "ShapeIntuition" 
				|| item.pageUrl =='ETBexperiment_new'
				|| item.pageUrl =='continueAdditionTask'
				|| item.pageUrl =='rememberAbilityTask' 
				|| item.pageUrl == 'CoginitiveTask'
				|| item.pageUrl == 'riskPolicy' 
				|| item.pageUrl == 'DigitalMemoryTest'
				|| item.pageUrl =='ruiWenTask') {
					uni.navigateTo({ 
						url: "/scalePage/beginTestCognitiveTask/index?params=" + params
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "努力研发中"
					})
				}
			}

		}
	}
</script>

<style scoped>
	.content_list_style_index {
		width: 240rpx;
		height: 240rpx;
		overflow: hidden;
		border-radius: 16rpx;
	}

	.content_list_style_index image {
		width: 100%;
		height: 100%;
	}

	.flex-1 {
		flex: 1;

	}

	.tag-1 {
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;

	}

	.b-1-style {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border: 1px solid #3FB4C9;
		border-radius: 30rpx;
		position: relative;
		top: -6px;
	}

	.content_app11_ {
		background-color: #3FB4C9 !important;
		border: none !important;
		/* line-height: 33px!important; */
		font-size: 14px !important;
	}
</style>
