<template>
	<view v-if="isShow" ref="ani" class="uni-transition-view" :class="[ani.in]" :style="'transform:' +transform+';'+stylesObject" @click="handleChanges">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	 
	export default {
		name: 'uniTransition',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			modeClass: {
				type: Array,
				default () {
					return []
				}
			},
			duration: {
				type: Number,
				default: 300
			},
			styles: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				isShow: false,
				transform: '',
				ani: {
					in: '',
					active: ''
				}
			};
		},
		watch: {
			show: {
				handler(newVal) {
					if (newVal) {
						this.open()
					} else {
						this.close()
					}
				},
				immediate: true
			}
		},
		computed: {
			// stylesObject() {
			// 	let styles = {
			// 		...this.styles,
			// 		'transition-duration': this.duration / 1000 + 's'
			// 	}
			// 	let transfrom = ''
			// 	for (let i in styles) {
			// 		let line = this.toLine(i)
			// 		transfrom += line + ':' + styles[i] + ';'
			// 	}
			// 	return transfrom
			// }
			stylesObject() {
				let _this =this;
				let stylesParams = {
					..._this.styles,
					'transition-duration': _this.duration / 1000 + 's'
				}
				let transfrom = ''
				for (let i in stylesParams) {
					let line = _this.handletoLine(i)
					transfrom += line + ':' + stylesParams[i] + ';'
				}
				return transfrom
			}
		},
		 
		methods: {
			// change() {
			// 	this.$emit('click', {
			// 		detail: this.isShow
			// 	})
			// },
			handleChanges() {
				let _this =this;
				_this.$emit('click', {
					detail: _this.isShow
				})
			},
			// open() {
			// 	clearTimeout(this.timer)
			// 	this.isShow = true
			// 	this.transform = ''
			// 	this.ani.in = ''
			// 	for (let i in this.getTranfrom(false)) {
			// 		if (i === 'opacity') {
			// 			this.ani.in = 'fade-in'
			// 		} else {
			// 			this.transform += `${this.getTranfrom(false)[i]} `
			// 		}
			// 	}
			// 	this.$nextTick(() => {
			// 		setTimeout(() => {
			// 			this._animationTyle(true)
			// 		}, 50)
			// 	})

			// },
			open() {
				let _this =this;
				clearTimeout(_this.timer)
				_this.isShow = true
				_this.transform = ''
				_this.ani.in = ''
				for (let i in _this.getTranfrom(false)) {
					if (i === 'opacity') {
						_this.ani.in = 'fade-in'
					} else {
						_this.transform += `${_this.getTranfrom(false)[i]} `
					}
				}
				_this.$nextTick(() => {
					setTimeout(() => {
						_this._animationTyle(true)
					}, 50)
				})
			
			},
			// close(type) {
			// 	clearTimeout(this.timer)
			// 	this._animationTyle(false)
			// },
			// _animationTyle(type) {
			// 	let styles = this.getTranfrom(type)
			// 	// #ifdef APP-NVUE
			// 	if (!this.$refs['ani']) return
			// 	animation.transition(this.$refs['ani'].ref, {
			// 		styles,
			// 		duration: this.duration, //ms
			// 		timingFunction: 'ease',
			// 		needLayout: false,
			// 		delay: 0 //ms
			// 	}, () => {
			// 		if (!type) {
			// 			this.isShow = false
			// 		}
			// 		this.$emit('change', {
			// 			detail: this.isShow
			// 		})
			// 	})
			// 	// #endif
			// 	// #ifndef APP-NVUE
			// 	this.transform = ''
			// 	for (let i in styles) {
			// 		if (i === 'opacity') {
			// 			this.ani.in = `fade-${type?'out':'in'}`
			// 		} else {
			// 			this.transform += `${styles[i]} `
			// 		}
			// 	}
			// 	this.timer = setTimeout(() => {
			// 		if (!type) {
			// 			this.isShow = false
			// 		}
			// 		this.$emit('change', {
			// 			detail: this.isShow
			// 		})

			// 	}, this.duration)
			// 	// #endif

			// },
			close(type) {
				let _this = this;
				clearTimeout(_this.timer)
				_this._animationTyle(false)
			},
			_animationTyle(type) {
				let _this = this;
				let stylesView = _this.getTranfrom(type)
				// #ifdef APP-NVUE
				if (!_this.$refs['ani']) return
				animation.transition(_this.$refs['ani'].ref, {
					stylesView,
					duration: _this.duration, //ms
					timingFunction: 'ease',
					needLayout: false,
					delay: 0 //ms
				}, () => {
					if (!type) {
						_this.isShow = false
					}
					_this.$emit('change', {
						detail: _this.isShow
					})
				})
				// #endif
				// #ifndef APP-NVUE
				_this.transform = ''
				for (let i in stylesView) {
					if (i === 'opacity') {
						_this.ani.in = `fade-${type?'out':'in'}`
					} else {
						_this.transform += `${stylesView[i]} `
					}
				}
				_this.timer = setTimeout(() => {
					if (!type) {
						_this.isShow = false
					}
					_this.$emit('change', {
						detail: _this.isShow
					})
			
				}, _this.duration)
				// #endif
			
			},
			// getTranfrom(type) {
			// 	let styles = {
			// 		transform: ''
			// 	}
			// 	this.modeClass.forEach((mode) => {
			// 		switch (mode) {
			// 			case 'fade':
			// 				styles.opacity = type ? 1 : 0
			// 				break;
			// 			case 'slide-top':
			// 				styles.transform += `translateY(${type?'0':'-100%'}) `
			// 				break;
			// 			case 'slide-right':
			// 				styles.transform += `translateX(${type?'0':'100%'}) `
			// 				break;
			// 			case 'slide-bottom':
			// 				styles.transform += `translateY(${type?'0':'100%'}) `
			// 				break;
			// 			case 'slide-left':
			// 				styles.transform += `translateX(${type?'0':'-100%'}) `
			// 				break;
			// 			case 'zoom-in':
			// 				styles.transform += `scale(${type?1:0.8}) `
			// 				break;
			// 			case 'zoom-out':
			// 				styles.transform += `scale(${type?1:1.2}) `
			// 				break;
			// 		}
			// 	})
			// 	return styles
			// },
			getTranfrom(types) {
				let _this = this;
				let stylesView = {
					transform: ''
				}
				_this.modeClass.forEach((mode) => {
					switch (mode) {
						case 'fade':
							stylesView.opacity = types ? 1 : 0
							break;
						case 'slide-top':
							stylesView.transform += `translateY(${types?'0':'-100%'}) `
							break;
						case 'slide-right':
							stylesView.transform += `translateX(${types?'0':'100%'}) `
							break;
						case 'slide-bottom':
							stylesView.transform += `translateY(${types?'0':'100%'}) `
							break;
						case 'slide-left':
							stylesView.transform += `translateX(${types?'0':'-100%'}) `
							break;
						case 'zoom-in':
							stylesView.transform += `scale(${types?1:0.8}) `
							break;
						case 'zoom-out':
							stylesView.transform += `scale(${types?1:1.2}) `
							break;
					}
				})
				return stylesView
			},
			// _modeClassArr(type) {
			// 	let mode = this.modeClass
			// 	if (typeof(mode) !== "string") {
			// 		let modestr = ''
			// 		mode.forEach((item) => {
			// 			modestr += (item + '-' + type + ',')
			// 		})
			// 		return modestr.substr(0, modestr.length - 1)
			// 	} else {
			// 		return mode + '-' + type
			// 	}
			// }, 
			// toLine(name) {
			// 	return name.replace(/([A-Z])/g, "-$1").toLowerCase();
			// }
			_modeClassArr(types) {
				let _this = this;
				let modeState = _this.modeClass
				if (typeof(modeState) !== "string") {
					let modestr = ''
					modeState.forEach((item) => {
						modestr += (item + '-' + types + ',')
					})
					return modestr.substr(0, modestr.length - 1)
				} else {
					return modeState + '-' + types
				}
			}, 
			handletoLine(names) {
				return names.replace(/([A-Z])/g, "-$1").toLowerCase();
			}
		}
	}
</script>

<style scoped>
	.uni-transition-view {
		transition-timing-function: ease;
		transition-duration: 0.3s;
		transition-property: transform, opacity;
	}

	.fade-in {
		opacity: 0;
	}

	.fade-active {
		opacity: 1;
	}

	.slide-top-in {
		/* transition-property: transform, opacity; */
		transform: translateY(-100%);
	}

	.slide-top-active {
		transform: translateY(0);
		/* opacity: 1; */
	}

	.slide-right-in {
		transform: translateX(100%);
	}

	.slide-right-active {
		transform: translateX(0);
	}

	.slide-bottom-in {
		transform: translateY(100%);
	}

	.slide-bottom-active {
		transform: translateY(0);
	}

	.slide-left-in {
		transform: translateX(-100%);
	}

	.slide-left-active {
		transform: translateX(0);
		opacity: 1;
	}

	.zoom-in-in {
		transform: scale(0.8);
	}

	.zoom-out-active {
		transform: scale(1);
	}

	.zoom-out-in {
		transform: scale(1.2);
	}
</style>