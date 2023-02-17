# 插件简绍

## 插件原理

> 对腾讯地图的前端定位组件进行二次封装。[地图组件 | 腾讯位置服务 (qq.com)](https://lbs.qq.com/webApi/component/componentGuide/componentMarker)

## 使用环境

**本插件只支持H5平台。因部分浏览器调用位置需要 https 环境，推荐大家还是把 https 环境配置上。**

## 插件使用

**插件已支持 uni_modules 支持组件easycom，以下代码演示的是普通使用**

``` html
<!-- HTML -->
<mumu-getlocation ref='muLocation'></mumu-getlocation>
<button type="default" @click="getLocation">获取精准位置</button>
```

``` js
import mumuGetlocation from '@/uni_modules/mumu-getlocation/components/mumu-getlocation/mumu-getlocation.vue'
	export default {
		components: {
			mumuGetlocation
		},
    data() {
			return {
				locationRef: null, // 用于接收定位对象
			}
		},
    onLoad() {
      // 使用 $nextTic 等待组件加载完成调用
			this.$nextTick(() => {
        // 在检测用户是否开启定位权限需要一个过程，推荐使用 login 提示一下
				uni.showLoading({
					title: '定位组件加载中...',
					mask: true
				})
        // 初始化组件，并且检测是否开启与授权定位
				this.$refs.muLocation.__init().then(location => {
          // 用户授权了和开启了定位，把定位对象保存到 data 中
					this.locationRef = location
					uni.hideLoading()
				}, err => {
          // 用户拒绝了定位请求，获取系统没有开启定位功能
					uni.hideLoading()
					if (err.code === 1) {
						uni.showModal({
							title: '获取定位权限失败',
							content: '你拒绝了位置授权服务。请允许当前页面获取定位授权，后刷新页面。'
						})
					} else {
						uni.showModal({
							title: '获取定位权限失败',
							content: '请确定手机定位已打开，并且当前浏览器允许获取定位，都开启后请刷新页面。'
						})
					}
				})

			})
		},
    methods: {
			// 获取精准定位
			getLocation() {
				this.locationRef.getLocation() // 调用 getLocation 方法获取精准定位
					.then(res => {
            // res 就是返回的数据
						uni.showModal({
							content:JSON.stringify(res, null, 4)
						})
					})
			},
        }
    }
```

## 相关 API

### 可传属性（Props）

无

### 组件内部方法（Event）

**通过 refs 调用**

| 方法   | 传参 | 说明                                 | 返回类型 | 返回数据                   |
| ------ | ---- | ------------------------------------ | -------- | -------------------------- |
| __init | 无   | 初始化组件，检测用户是否开启定位权限 | 对象     | 定位对象，用于后续方法调用 |

**定位对象属性**

| 方法名          | 传参     | 说明         | 返回（return） | 返回数据         |
| --------------- | -------- | ------------ | -------------- | ---------------- |
| getLocation()   | 无       | 获取精准定位 | Promise        | 精准定位数据     |
| getIpLocation() | 无       | 获取ip定位   | Promise        | 获取ip定位数据   |
| watchPosition() | function | 持续监听定位 | 数据           | 持续监听定位数据 |
| clearWatch()    | 无       | 关闭持续监听 | 无             | 无               |

## 案例演示

![](https://h5plugin.mumudev.top/public/getLocation/qrcode.png)

## 支持作者

![支持作者](https://student.mumudev.top/wxMP.jpg)