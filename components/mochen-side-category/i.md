# 使用说明

```
import sideCategory from '@/components/mochen-side-category/mochen-side-category.vue';
<!-- 引入  -->

components: {
	sideCategory
}

<!-- 注册 -->

<!-- 在页面中使用 -->


<side-category class="category"  v-model="currentIndex" :customNumStyle="{ color: 'red' }"  :list="list"  active-color="#4CD964" :width="100" actiive-height="80%" actiive-width="2%" @change="change">
	<view>
		分类
	</view>
</side-category>

<!-- 示例值 -->
data(){
	returl {
		list: [
			{
				name: '分类一',
				num: 10
			},
			{
				name: '分类一',
				num: 20
			}
		],
		currentIndex : 1
		
	}
},
methods:{
	change(currentIndex){
		console.log(currentIndex)
	}
}




props: {
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
			default: '#4CD964'
		},
		actiiveHeight: {
			type: String,
			default: '60%'
		},
		actiiveWidth: {
			type: String,
			default: '4px'
		}
	},


```
