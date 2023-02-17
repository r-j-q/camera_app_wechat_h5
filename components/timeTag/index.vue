<template>
	<view class="disRowAroundcenter">
		 <view @click="handleUpTimeData(item)" class="heightTime textColor9e fontSize15 mrl"  :class="item.id == activeList.id?'phcolor fontSize15':''"  v-for="(item,index) in createdTime" :key="item.id">
		 	{{item.time}}
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 
			};
		},
		props: {
			createdTime: {
				type: Array,
				default:[]
			},
			activeList: {
				type: Object,
				default:{}
			},
		},
	
		methods: {
			 handleUpTimeData(item){
				 this.$emit("onUpTimeData",item)
			 }
		}
	}
</script>

<style scope>
	.heightTime{
		height: 100upx;
		line-height: 100upx;
	}
</style>