<template>
	<view class="exam-list-row">
		<view class="">
			<view class="exam-list-title fontSize19 fontWeight" style="min-height:92rpx">
				{{currentIndex +1}}:{{QuestionList.answer}}
			</view>
			<view class="exam-list-content fontSize16">
				<!-- <scroll-view> -->
				<view v-for="(item,i) in QuestionList.QuestionOptionList" :key="i" class="disRowAroundStart"
					:class="QuestionList.fldAnswer == item.fldOptionText ?'checked_user':'checked_'"
					@click.stop="onListItem(item)">
					<!-- @click.stop="onItem(item)"  单选去掉-->
					<view class="">
						<!-- 	<image     class="exam-list-content-img mr10"
					  		  :src="QuestionList.fldAnswer == item.fldOptionText ? checked_user :checked_ " mode=""></image> -->
					</view>

					{{item.fldOptionText}}
					<!-- </view> -->
				</view>
				<view class="exam-list-button displayRow">
					<button v-if='currentIndex > 0' @click="goPrev" class="content_app11 phcolor">上一题</button>
					<button v-if='currentIndex < total && currentIndex != total-1' @click="goNext"
						class="content_app11 phcolor">下一题</button>

					<button v-if='currentIndex+1 == total' @click="subMit" class="content_app11 phcolor">提交</button>


				</view>
			</view>
		</view>
		<!-- 按钮区域 -->

	</view>

</template>

<script>
	export default {
		name: 'Li-ExamWidght',
		props: [
			'QuestionList',
			'total',
			'currentIndex'
		],
		data() {
			return {

				checked_user: this.$imageUrl.urls.checked_user,
				checked_: this.$imageUrl.urls.checked_,
				isShowBtn: true

			};
		},
		mounted() {
			this.isShowBtn = true
		},
		methods: {


			goPrev() {
				this.$emit("goPrevAnswer")
			},
			goNext() {
				this.$emit("goNextAnswer")
			},
			onItem(item) {
				this.$emit("onItemAnswer", item)
			},
			onListItem(item) {
				this.$emit("onListItemAnswer", item)
			},
			subMit() {
				console.log("=1=====>", this.isShowBtn)
				// if(!this.isShowBtn) return;
				// this.isShowBtn=false;
				this.$emit("subMitList");
				console.log("=2=====>", this.isShowBtn)
				// setTimeout(()=>{
				// this.isShowBtn=true;	
				// },2000)
			},

		}
	}
</script>

<style scoped>
	.exam-list-content-img {
		width: 60rpx;
		height: 60rpx;

	}

	.exam-list-row {
		padding: 30rpx;
	}

	.exam-list-content {
		padding: 20rpx 0;
	}

	.checked_ {
		padding: 30rpx 0;
		padding-left: 20px;
		background-color: #f5f5f5;
		border-radius: 50px;
		margin-bottom: 10px;
	}

	.checked_user {
		color: #3FB4C9;
		padding: 30rpx 0;
		padding-left: 20px;
		background-color: #D4F3F8;
		border-radius: 50px;
		margin-bottom: 10px;
		font-weight: bold;

	}

	.exam-list-button {
		margin-top: 60rpx;
	}
</style>
<!-- https://www.bilibili.com/video/BV1dL4y1p7Mo/?spm_id_from=333.788&vd_source=3c6e49266293c767a6c4158cfe64766d -->
