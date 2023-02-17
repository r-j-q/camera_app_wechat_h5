<template>
	<view class="side-category-view">
		<scroll-view :show-scrollbar="false" v-model="currentIndexs" class="category-tabs" style="width:77px;height: 100vh;" :scroll-top="tabScrollTop" :scroll-y="true" scroll-with-animation>
			<view
				class="category-tabs-items"
				:style="[ItemStyle]"
				:class="[index == currentIndexs ? 'active' : '']"
				:id="`side-category-tabs-items-${index}`"
				v-for="(item, index) in list"
				:key="index"
				@click="tabsItemChange(index)"
			>
				<text class="category-tabs-items__title">{{ item[listKey] }}</text>
				<text class="category-tabs-items__num" :style="[numStyle]" v-if="item[listNumKey]">{{ item[listNumKey] }}</text>
			</view>
		</scroll-view>
		<view class="side-category-content"><slot /></view>
	</view>
</template>

<script>
export default {
	props: {
		currentIndex: {
			type: Number,
			default() {
				return 0;
			}
		},
		value: {
			type: Number,
			default() {
				return 0;
			}
		},
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		listKey: {
			type: String,
			default: 'name'
		},
		listNumKey: {
			type: String,
			default: 'num'
		},
		customItemStyle: {
			// items style
			type: Object,
			default() {
				return {};
			}
		},
		customNumStyle: {
			// items style
			type: Object,
			default() {
				return {};
			}
		},
		width: {
			type: Number,
			default: 200
		},
		actiiveColor: {
			type: String,
			default: '#3FB4C9'
		},
		actiiveHeight: {
			type: String,
			default: '60%'
		},
		actiiveWidth: {
			type: String,
			default: '0rpx'
		}
	},
	watch:{
		currentIndex :function(newData){
			this.currentIndexs = newData
		}
	},
	data() {
		return {
			currentIndexs: 0,
			tabScrollTop: 0,
			tabQueryInfo: null
		};
	},
	computed: {
		ItemStyle() {
			return {
				padding: '32rpx 9px',
				'--side-active-color-bg': this.actiiveColor,
				'--side-active-height': this.actiiveHeight,
				'--side-active-width': this.actiiveWidth,
				...this.customItemStyle
			};
		},
		numStyle() {
			return {
				fontSize: '28rpx',
				...this.customNumStyle
			};
		}
	},
	watch: {
		list(n, o) {
			if (n.length !== o.length) {
				this.currentIndexs = 0;
				this.$nextTick(() => {
					this.getTabRect();
					const query = uni.createSelectorQuery().in(this);
					query
						.select('.side-category-view')
						.boundingClientRect(data => {
							this.tabsInfoWrap = data;
						})
						.exec();
				});
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.getTabRect();
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.side-category-view')
				.boundingClientRect(data => {
					this.tabsInfoWrap = data;
				})
				.exec();

			this.currentIndexs = this.value;
		});
	},
	methods: {
		tabsItemChange(index) {
			if (this.currentIndexs === index) return;
			// 防止重复点击
			this.currentIndexs = index;
			this.$emit('input',index)
			this.$emit('change', index, this.list[this.currentIndexs]);
			this.changeScrollTop();
		},
		changeScrollTop() {
			let currentTabInfo = this.tabQueryInfo[this.currentIndexs];
			let mid = this.tabsInfoWrap.height / 2;
			let scrollTop = currentTabInfo.top - mid + currentTabInfo.height;
			this.tabScrollTop = scrollTop > 0 ? scrollTop : 0;
		},
		getTabRect() {
			if (this.list.length == 0) return;
			let query = uni.createSelectorQuery().in(this);
			for (let i = 0; i < this.list.length; i++) {
				query.select(`#side-category-tabs-items-${i}`).fields({
					size: true,
					rect: true
				});
			}
			query.exec(
				function(res) {
					this.tabQueryInfo = res;
				}.bind(this)
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.side-category-view {
	position: absolute;
	top: 168rpx;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	.category-tabs {
		background-color: #e9e9e9;
		.category-tabs-items {
			position: relative;
			display: flex;
			&__title {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;
			}

			&__num {
				border-radius: 4rpx;
			}

			&.active {
				background-color: white;
				font-weight: bold;
				&::after {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					right: 0;
					height: 44rpx;
					width: 8rpx;
					transform: translateY(-50%);
					// box-shadow: 0 0 16rpx var(--side-active-color-bg);
					background-color: var(--side-active-color-bg);
					border-radius: 0 30% 30% 0;
				}
			}
		}
	}

	.side-category-content {
		flex: 1;
	}
}
</style>
