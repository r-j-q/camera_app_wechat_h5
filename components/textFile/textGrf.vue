<template>
	<view class="featured_test overflow1" 
	:style= "{color:`${colors}`,fontSize:`${fontSizes}`}">
		 {{text}}
	</view>
</template>

<script>
	export default {
		props:['text','colors','fontSizes'],
	    data() {
	        return {
	            // list3: [$imageUrl.urls.banner_0,$imageUrl.urls.banner_1],
	        }
	    },
		 
	}
</script>

<style scoped>
	.featured_test{
		font-size: 34rpx; 
		font-weight: bold; 
	}
</style>