<template>
	<view v-if="showPopup" class="uni-popup-view" :class="[popupstyle]" >
		<uni-transition v-if="maskShow" :mode-class="['fade']" :styles="maskClass" :duration="duration" :show="showTrans" @click="onTap" />
		<uni-transition :mode-class="ani" :styles="transClass" :duration="duration" :show="showTrans" @click="onTap">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import uniTransition from '../uni-transition/uni-transition.vue'
	import popup from './popup.js'
	 

	export default {
		name: 'UniPopup',
		components: {
			uniTransition
		},
		props: {
			animation: {
				type: Boolean,
				default: true
			},
			 
			type: {
				type: String,
				default: 'center'
			},
			maskclick: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				popup: this
			}
		},
		mixins: [popup],
		watch: {
			 
			type: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			}, 
			maskclick:
			 {
				 handler:function(val){
					 
					 this.mkclick = val
				 },
				 immediate: true
				
			}
		},
		data() {
			return {
				duration: 300,
				ani: [],
				showPopup: false,
				showTrans: false,
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'backgroundColor': 'rgba(0, 0, 0, 0.4)'
				},
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				mkclick: true,
				popupstyle: 'top'
			}
		},
		// created() {
		// 	if (this.animation) {
		// 		this.duration = 300
		// 	} else {
		// 		this.duration = 0
		// 	}
		// },
		created() {
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
		},
		methods: {
			clear(e) {
				e.stopPropagation()
			},
			// open() {
			// 	this.showPopup = true
			// 	this.$nextTick(() => {
			// 		new Promise(resolve => {
			// 			clearTimeout(this.timer)
			// 			this.timer = setTimeout(() => {
			// 				this.showTrans = true
			// 				// fixed by mehaotian 兼容 app 端
			// 				this.$nextTick(() => {
			// 					resolve();
			// 				})
			// 			}, 50);
			// 		}).then(res => {
			// 			// 自定义打开事件
			// 			clearTimeout(this.msgtimer)
			// 			this.msgtimer = setTimeout(() => {
			// 				this.customOpen && this.customOpen()
			// 			}, 100)
			// 			this.$emit('change', {
			// 				show: true,
			// 				type: this.type
			// 			})
			// 		})
			// 	})
			// },
			open() {
				let _this =this;
				_this.showPopup = true
				_this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(_this.timer)
						_this.timer = setTimeout(() => {
							_this.showTrans = true
							// fixed by mehaotian 兼容 app 端
							_this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// 自定义打开事件
						clearTimeout(_this.msgtimer)
						_this.msgtimer = setTimeout(() => {
							_this.customOpen && _this.customOpen()
						}, 100)
						_this.$emit('change', {
							show: true,
							type: _this.type
						})
					})
				})
			},
			// close(type) {
			// 	this.showTrans = false
			// 	this.$nextTick(() => {
			// 		this.$emit('change', {
			// 			show: false,
			// 			type: this.type
			// 		})
			// 		clearTimeout(this.timer)
			// 		// 自定义关闭事件
			// 		this.customOpen && this.customClose()
			// 		this.timer = setTimeout(() => {
			// 			this.showPopup = false
			// 		}, 300)
			// 	})
			// },
			close(type) {
				let _this =this;
				_this.showTrans = false
				_this.$nextTick(() => {
					_this.$emit('change', {
						show: false,
						type: _this.type
					})
					clearTimeout(_this.timer)
					// 自定义关闭事件
					_this.customOpen && _this.customClose()
					_this.timer = setTimeout(() => {
						_this.showPopup = false
					}, 300)
				})
			},
			// onTap() {
			// 	if (!this.mkclick) return
			// 	this.close()
			// }, 
			// top() {
			// 	this.popupstyle = 'top'
			// 	this.ani = ['slide-top']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		'left': 0,
			// 		'right': 0,
			// 	}
			// }, 
			onTap() {
				let _this = this;
				if (!_this.mkclick) return
				_this.close()
			}, 
			top() {
				let _this = this;
				_this.popupstyle = 'top'
				_this.ani = ['slide-top']
				_this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				}
			}, 
			// bottom() {
			// 	this.popupstyle = 'bottom'
			// 	this.ani = ['slide-bottom']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		'left': 0,
			// 		'right': 0,
			// 		'bottom': 0
			// 	}
			// }, 
			bottom() {
				let _this =this;
				_this.popupstyle = 'bottom'
				_this.ani = ['slide-bottom']
				_this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
					'bottom': 0
				}
			}, 
			// center() {
			// 	this.popupstyle = 'center'
			// 	this.ani = ['zoom-out', 'fade']
			// 	this.transClass = {
			// 		'position': 'fixed',
			// 		/* #ifndef APP-NVUE */
			// 		'display': 'flex',
			// 		'flexDirection': 'column',
			// 		/* #endif */
			// 		'bottom': 0,
			// 		'left': 0,
			// 		'right': 0,
			// 		'top': 0,
			// 		'justifyContent': 'center',
			// 		'alignItems': 'center'
			// 	}
			// }
			center() {
				let _this = this;
				_this.popupstyle = 'center'
				_this.ani = ['zoom-out', 'fade']
				_this.transClass = {
					'position': 'fixed',
					/* #ifndef APP-NVUE */
					'display': 'flex',
					'flexDirection': 'column',
					/* #endif */
					'bottom': 0,
					'left': 0,
					'right': 0,
					'top': 0,
					'justifyContent': 'center',
					'alignItems': 'center'
				}
			}
		}
	}
</script>
<style scoped>
	.uni-popup-view {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}

	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.content-ani {
		/* transition: transform 0.3s;
 */
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>