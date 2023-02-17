<template>
	<view class="warp_">
		<view class="box">  
			<t-table @change="change" v-for="(items,index) in scoresList" :key="index">
				<t-tr >
					<t-th v-for="(itemTitle,i) in items.colNames" :key="i">{{itemTitle}}</t-th>
					 
				</t-tr>
				<t-tr v-for="(c,p) in  testResult == 2 ?items.newTableContext.result : items.tableContext" :key="p"
						 >
					<t-td>{{c.name != undefined?c.name:'总分'}}</t-td>
					<t-td v-if="c.name != undefined">{{testResult == 2?c.score:c.value[0]}}</t-td>
				</t-tr>
				<t-tr v-if='items.newTableContext.result.length==0 &&testResult == 2'>
					<t-td>总分</t-td>
					<t-td>0.00</t-td>
				</t-tr>
	 
			</t-table>
		</view>
		 
	</view>
</template>
<script>
	// https://ext.dcloud.net.cn/plugin?id=413
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		props:['scoresList','testResult'],
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return { 
			};
		},
		methods: {
			change(e) {
				console.log(e.detail);
			} 
		}
	};
</script>
<style scoped>
	.warp_{
		width: 94%;
		margin: 0 auto;
	}
</style>
