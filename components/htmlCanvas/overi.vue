<template>
	<view class="canvas-box">
		<!-- 导航栏 -->
		<u-button @click="saveImage">保存到相册</u-button>
		<canvas style="width: 346px;height: 500px;position: fixed;opacity: 0;left: -111111px;" class="canvas"
			canvas-id="canvasID"></canvas>
		 
		<!-- <image :src="imgUrl" mode="" style="opacity: 0;"></image> -->
		<image :src="imgUrl" mode=""></image>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				productList:[
					{
						name:"标题1",
						text是:"圆圆与数控试试"
					},
					{
						name:"标题2",
						text是:"圆圆与数控试试2"
					},
					{
						name:"标题3",
						text是:"圆圆与数控试试3"
					}
				],
				
				imgUrl: '',
				statusBarHeight: 0,
				avatar: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg', //头像地址
				hello: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg', // hello图标
				mony: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/gh_33446d7f7a26_430.jpg' //圆的钱图标
			}
		},
		onLoad() {
			this.$tool.getSystemInfo().then(res => {
				this.statusBarHeight = res
			})

		},
		onShow() {

		},
		methods: {
			getCanvas() {
				let ctx = uni.createCanvasContext('canvasID', this);
				// ctx.setFillStyle("transparent"); //设置canvas背景颜色
				// ctx.fillRect(0, 0, 346, 500) //设置canvas画布大小
				// _this.fillRoundRect(ctx, 0, 0, 346, 500, 15); //绘制一个圆角矩形
				// _this.fillRoundRect(ctx, 0, 0, 346, 182, 15, '#333231'); //绘制一个圆角矩形
				// _this.drawCircular(ctx, _this.avatar, 36, 32, 50, 50) //绘制圆形头像

				ctx.setFontSize(18)
				ctx.setFillStyle("#e4393c")
				ctx.fillText(`总分:`, 98, 65)
				ctx.drawImage(this.hello, 240, 10, 86, 86) //二维码
				ctx.font = '20px normal'
				ctx.setFillStyle("#09CFB1")
				ctx.fillText('我为“贤马”带盐', 30, 122)
				ctx.font = '16px normal'
				ctx.setFillStyle("#ffffff")
				ctx.fillText('“闲么？上贤马做兼职”', 20, 152)
				this.productList.forEach((item,index)=>{
					ctx.setFillStyle("#e4393c")
					ctx.fillText(item.name, 20, 182+index*20)
						 
				})
				// 绘制职位标题，多余文字自动换行
				ctx.setFontSize(28)
				ctx.setFillStyle("#333333")



				// 绘制微信二维码
				ctx.drawImage(this.hello, 208, 370, 120, 120) //二维码
				setTimeout(() => {
					ctx.draw(false, (rq) => {
						uni.canvasToTempFilePath({
							canvasId: 'canvasID',
							success: (res) => {
								this.imgUrl = res.tempFilePath
								console.log("111111111111------->", res.tempFilePath)
								uni.saveImageToPhotosAlbum({ //保存图片到相册
									filePath: res.tempFilePath,
									success: function() {
										uni.hideLoading()
										uni.showToast({
											title: "图片已保存",
											duration: 2000
										})
									},
									fail() {
										uni.hideLoading()
									}
								})
							},
							fail: function(err) {
								console.log(err)
							}
						}, this)
					})
				}, 1500)
			},
			getBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			saveImage() { //点击保存
				//  
				this.getCanvas();
			},
			// 将网络图片转为临时图片地址
			async getImageInfo({
				imgSrc
			}) {
				return new Promise((resolve, errs) => {
					uni.downloadFile({
						src: imgSrc,
						success: function(image) {
							resolve(image);
						},
						fail(err) {
							errs(err);
						}
					});
				});
			},
			// 绘制圆形头像
			async drawCircular(ctx, url, x, y, width, height) {
				//画圆形头像
				var avatarurl_width = width;
				var avatarurl_heigth = height;
				var avatarurl_x = x;
				var avatarurl_y = y;
				ctx.save(); //先保存状态，已便于画完园再用
				ctx.beginPath(); //开始绘制
				ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0,
					Math
					.PI * 2, false);
				ctx.setFillStyle("#FFFFFF")
				ctx.fill() //保证图片无bug填充
				ctx.clip(); //剪切
				ctx.drawImage(url, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); //推进去图片
				ctx.restore();
			},
			// 绘制带圆角的矩形方法
			fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
				//圆的直径必然要小于矩形的宽高
				if (2 * radius > width || 2 * radius > height) {
					return false;
				}

				cxt.save();
				cxt.translate(x, y);
				//绘制圆角矩形的各个边
				this.drawRoundRectPath(cxt, width, height, radius);
				cxt.fillStyle = fillColor || '#fff'; //若是给定了值就用给定的值否则给予默认值
				cxt.fill();
				cxt.restore();
			},
			drawRoundRectPath(cxt, width, height, radius) {
				cxt.beginPath(0);
				//从右下角顺时针绘制，弧度从0到1/2PI
				cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

				//矩形下边线
				cxt.lineTo(radius, height);

				//左下角圆弧，弧度从1/2PI到PI
				cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

				//矩形左边线
				cxt.lineTo(0, radius);

				//左上角圆弧，弧度从PI到3/2PI
				cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

				//上边线
				cxt.lineTo(width - radius, 0);

				//右上角圆弧
				cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

				//右边线
				cxt.lineTo(width, height - radius);
				cxt.closePath();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.canvas-box {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1ABC9C;

		image {
			width: 335px;
			height: 500px;
		}
	}
</style>
