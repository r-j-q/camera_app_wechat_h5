<template>
	<view class="imgs_style">
		<image :src="search_no_data" mode=""></image>
	</view>
</template>

<script> 
	export default {
		name: "noData",
		data() {
			return { 
				search_no_data: this.$imageUrl.urls.search_no_data,
				 
	
			};
		}, 
	};
</script>

<style scoped>
	.imgs_style{
		width: 446rpx;
		height: 302rpx;
		margin: 0 auto;
		margin-top: 20%;
	}
	.imgs_style image{
		width: 100%;
		height: 100%;
	}
</style>