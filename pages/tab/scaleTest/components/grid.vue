<template>
	<view   class="marTop20">
		<u-grid :border="false" col="4"  >
			<u-grid-item v-for="(listItem,listIndex) in categoryName" @click="gridName(listItem)" :key="listIndex">
				<image :src="gridList[listIndex]" class="grid_style_gong"></image>
				<text class="grid-text">{{listItem.name}}</text>
			</u-grid-item>
		</u-grid>
		<!-- <u-toast ref="uToast" /> -->
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	export default {
		props: ['QueryCategoryNameList','gridList','categoryName' ],
		data() {
			return {}
		},
		 
		methods: {
			...mapActions({
				setGridList: "setGridList"
			}),
			gridName(item) {
				let _this = this;
				 
				// uni.showToast({
				// 	icon:"none",
				// 	title:"努力研发中"
				// })  
				let indx = 0;
				let  newCurrentIndex = _this.QueryCategoryNameList;
				 newCurrentIndex.forEach((items,i)=>{ 
					 if(items.ename === item.ename){
						 console.log("匹配到了",items)
						 indx = i;
					 }
				 })
				 _this.setGridList(_this.QueryCategoryNameList);
				
				uni.navigateTo({
					url:"/scalePage/sideCategory/index?indx="+indx+"&ename="+item.ename
				})
				 
			}
		}
	}
</script>

<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.grid_style_gong {
		width: 30px;
		height: 30px;
		padding: 20rpx;
	}
</style>
