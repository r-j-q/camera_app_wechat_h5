<template>
	<view class="navbar"  >
		<view class="navbar-fixed">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view @click="navToIndex" class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<!-- <u-icon @click="navToBack" name="arrow-left" color="#333333" size="40"></u-icon> -->
				<view class="fontSize14 fontWeight color_3 " style="width: 170rpx; padding-left: 10rpx;">
					量表测试
				</view>
				<view class="navbar-search">

					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-serach"> 
					<input
					disabled
					 class="navbar-search_text"
					 type="text"  
					 v-model="val"
					 :placeholder="placeholderT" 
					 placeholder-style="font-size:32rpx;color: #8a8a8a;" 
					 />
					 </view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>

</template>
<script>
	import {
		mapGetters
	} from "vuex";
	export default {

		name: 'navbar',
        props:['placeholderT'],
		computed: {
			...mapGetters(["userInfo"]),
		},
		data() {

			return {

				statusBarHeight: 20,
				/* 状态栏高度 */

				navBarHeight: 45,
				/* 导航栏高度 */

				windowWidth: 375,
				/* 窗口宽度 */

				/* 设定状态栏默认高度 */

				val: '' /* 导航栏搜索框的值 */

			};

		},

		created() {

			// 获取手机系统信息

			const info = uni.getSystemInfoSync()

			// 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）

			this.statusBarHeight = info.statusBarHeight

			this.windowWidth = info.windowWidth

			// 除了h5 app mp-alipay的情况下执行

			// #ifndef H5 || APP-PLUS || MP-ALIPAY

			// 获取胶囊的位置

			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

			console.log(menuButtonInfo);

			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度

			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)

			this.windowWidth = menuButtonInfo.left

			// #endif

		},
		methods: {
			navToIndex(){
				 	this.$emit('navTo')
		    }
			 
			 
		}

	}
</script>
<style scoped lang="less">
	.zuo {
		position: absolute;
		width: 15rpx;
		height: 15rpx;
		border-top: 4rpx solid #333;
		border-right: 4rpx solid #333;
		transform: rotate(-135deg);
	}

	.navbar {
        background-color: #fff;
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			// background-color: red;

			.navbar-content {

				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px 0 0px;
				height: 45px;
				box-sizing: border-box;



				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 40px;
					border-radius: 30px;
					background-color: #F6F6F6;
					margin-left: 6px;

					.navbar-search_icon {
						margin-right: 10px
					}

					.navbar-search_text {
                        width: 100%;
						font-size: 34rpx;
						color: #333;
					}

				}

				&.search {
					padding-left: 0;
                    .navbar-content__search-icons {
						margin: 0 10px;
						}

					.navbar-search {
						border-radius: 5px
					}

				}

			}

		}

	}
</style>
