<template>
  <div class="list-item-warp">
    <van-card
      v-for="(item, index) in data"
      :key="index"
      :desc="item.description"
      :title="item.name"
      :thumb="itemImg"
      @click="goDetail(item)"
    >
        <template #tags>
            <van-tag v-if="systemVersion == 'institution'" plain type="primary" color="#57ACBB">免费</van-tag>
            <van-tag v-if="item.reportVersion == 2" plain type="warning" :class="{'done-tag':systemVersion == 'public'}">专业报告</van-tag>
            <van-tag v-if="type == 1 && item.isComplete && item.isComplete == '9'" class="done-tag" plain type="warning">已完成</van-tag>
        </template>
        <!-- 因为没有对接后台接口，暂时注释 -->
        <!-- <template #num></template> -->
        <template #price>{{ item.testNum }}人测试过</template>
    </van-card>
  </div>
</template>

<script> 

export default {
  name: "list-item",
  components: {},
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    
    type: {
      type: Number,
      default: 0,
    }, //type默认为0，0为普通列表内容，1为测试计划列表内容显示是否完成状态
  },
  data() {
    return {
	itemImg:	this.$aiUrl.urls.test_records_bg,
      newToggle: this.toggle,
      systemVersion: process.env.VUE_APP_VERSION
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    goDetail(item) {
      this.$emit("goDetails", item);
    },
  },
};
</script>

<style scoped>
.list-item-warp {
  width: 100%;
}
.done-tag {
  margin-left: 10px;
}
</style>