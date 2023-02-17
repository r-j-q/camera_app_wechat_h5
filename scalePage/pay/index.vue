<template>
	<view class="">
		<!-- <a :href="urls">9999999</a> -->
		<web-view :src="urls"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				urls :""
			}
		},
	 onLoad(options) {
	 	this.urls = options.url;
	 }
	}
</script>

<style>
</style>