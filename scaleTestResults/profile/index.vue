<template>
	<view class="margAll">
		<view class="fontSize13 fontWeight marginBottom40">
			心灵照相机用户注册协议
		</view>
		<view class="xie_y">
			{{xieYs}}
		</view>
	</view>
</template>
 
<script>
	import {
		xieY
	} from "@/utils/Profile.js"
	export default {
		data(){
			return {
				xieYs: "",
			}
		},
	 onShow() {
	 	this.xieYs = xieY
	 },
	}
</script>
<style scoped>
	.xie_y{ 
		overflow-y: scroll;
		font-size: 12px;
	}
</style>