<!--
	说明: 基于 Color-ui、Uni-app 的二维码展示卡片
	作者: 黄善武
	邮箱: huangshanwu@syncsoft.com
	创建日期: 2020年07月9日	16:11:19	V1.0		初始发布
	当前版本: V1.0.0
	组件作用：主要用于二维码及其详情信息的展示，建议配合modal弹窗使用，点击二维码可查看大图
	参数说明:
		【参数名】			【数据类型】		【说明】																【更新标识】					【更新说明】
		qrName				String			二维码名
		qrSrc				String			二维码图片地址
		qrButton			String			按钮名称
		qrColor				String			整体颜色（需colorUI定义的颜色名：blue,green...）
		qrContentList		Array			主体内容数组  [{cls:'样式名，如图标颜色之类的',text: '左边字段',value: '右边字段'}]

		【方法名	】			【说明】							【更新标识】					【更新说明】
		clickButton			点击按钮回调

	用法示例:
		// view部分
		<wu-card-qr qrName="主体码" :qrSrc="qyQrSrc" :qrContentList="qrContentList" @clickButton="changeModal('QrCode')" qrButton="知道了" qrColor="red"></wu-card-qr>

		// data部分
		qyQrSrc: 'https://img13.360buyimg.com/ddimg/jfs/t1/134519/19/12321/36617/5f86b7a2Ed9aaa2d7/746203b11b0cab5a.png',
		qrContentList: [
						{
							text: '名称',
							value: 'XX',
							cls: 'cuIcon-homefill text-blue',
						},
						{
							text: '地址',
							value: 'XX',
							cls: 'cuIcon-locationfill text-mauve'
						},
					];

		// methods部分
		clickQrcode(type) {
			/*
			 do something ......
			*/
		}
 -->
<template>
	<view class="cu-dialog padding-tb-xl bg-white">
		<view :class="'text-xxl text-bold margin-left-xs text-'+qrColor +' text-shadow'">{{qrName}}</view>
		<view class="image margin-top">
			<image class="qrimgcls" :src="qrSrc" style="width: 300rpx;height: 300rpx;" @click="showImg([qrSrc])"></image>
		</view>
		<view class="margin-xl text-left">
			<view v-for="(qr, index) in qrContentList" :key="index">
				<view><text class="margin-right-xs" :class="qr.cls"></text>{{qr.text}}</view>
				<view class="margin-left-sm margin-bottom margin-top-sm text-shadow text-black">{{qr.value}}</view>
			</view>
		</view>
		<view class="cu-bar flex flex-wrap">
			<button :class="'basis-xl bg-gradual-'+qrColor  +' text-center shadow round'" @click="clickButton()">{{qrButton}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'wu-card-qr',
		data() {
			return {
				
			}
		},
		props: {
			qrName: {
				type: String,
				default: '二维码'
			},
			qrSrc: {
				type: String,
				default: 'https://img13.360buyimg.com/ddimg/jfs/t1/134519/19/12321/36617/5f86b7a2Ed9aaa2d7/746203b11b0cab5a.png'
			},
			qrButton: {
				type: String,
				default: '关闭'
			},
			qrColor: {
				type: String,
				default: 'blue'
			},
			// 内容列表
			qrContentList: {
				type: Array,
				default() {
					return [
						{
							cls:'',
							text: '',
							value: ''
						}
					]
				}
			}
		},
		methods: {	
			/**
			 * 展示图片
			 * @param {Object} urls
			 * @param {Object} index
			 */
			showImg(urls,index) {
				let i = index === undefined ? 0 : index;
				uni.previewImage({
					current: i,
					urls: urls
				});
			},
			
			/**
			 * 点击按钮
			 */
			clickButton() {
				// 使用主界面的方法
				this.$emit('clickButton');
			},
		}
	}
</script>

<style lang="scss">

</style>
