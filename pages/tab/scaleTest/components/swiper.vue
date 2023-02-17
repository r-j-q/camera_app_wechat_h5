<template>
	<view class="marTop20  borderReduils10 paddingLeftRight20">
	<u-swiper
            :list="swiperList"
			@click="handleClick"
            indicator
            indicatorMode="line"
            circular
			height="150px" 
			class="borderReduils10"
    ></u-swiper>
	</view>
</template>

<script>
	import { 
		subjectInfoGetSubjectByFlag
	} from "@/api/index.js";
    export default {
		props:['swiperList'],
        data() {
            return {
                // list3: [$imageUrl.urls.banner_0,$imageUrl.urls.banner_1],
            }
        },
		methods:{
			handleClick(e){
				if (e == 0) {
					this.handleGetSubjectByFlag("20210617000138")
					console.log("-2-----")
				} else {
					console.log("--3----",e)
					this.handleGetSubjectByFlag("20210617140713")
				}
				// console.log("33300033",e)
				// this.$emit('handleClicks',{val:e}) 
			},
			handleGetSubjectByFlag(id) {
				this.$request.get({
						url: `${subjectInfoGetSubjectByFlag}/${id}`,
						loadingTip: "加载中...",
						data: {},
					})
					.then(
						(response) => {
							let params = encodeURIComponent(JSON.stringify(response.data[0]));
							uni.navigateTo({
								// url: getApp().getUrl("/scalePage/beginTest/index?params=" + params)
								url: "/scalePage/beginTest/index?params=" + params
							})
							console.log("===1211=======>", response)
						})
			},
		}
		 
    }
</script>

<style scoped>
	.borderReduils10{
		overflow: hidden;
		border-radius: 10px;
	}
</style>