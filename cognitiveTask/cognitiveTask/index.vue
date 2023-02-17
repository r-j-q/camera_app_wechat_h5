<!-- 认知任务 -->
<template>
  <div>
    <van-sticky>
      <van-search
        v-model="keyWords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs v-model="categoryEname" @change="changeType" color="#57ACBB">
        <van-tab
          v-for="(item, index) in categoryList"
          :key="index"
          :title="item.name"
          :name="item.ename"
        ></van-tab>
      </van-tabs>
    </van-sticky>
    <van-pull-refresh v-model="refresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="完了，被你看光了~"
        offset="50"
        @load="loadData"
        style="padding-bottom: 50px"
        :immediate-check="false"
      >

        <listItem :data="taskList" @goDetails="goDetail"/>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { cognitiveAbilityTaskList } from "@/utils/dict";
import listItem from '../components/list-item.vue';
export default {
  name: "cognitionTask",
  components: {
      listItem,
  },
  data() {
    return {
      taskList: [],
      currentTaskList: [],
	   
      // coverImg: require("../../assets/1.jpg"),
      coverImg:this.$aiUrl.urls.test_records_bg,
      keyWords: "",
      categoryEname: "CALL",
      pageNum: 1,
      pageSize: 10,
      categoryList: [],
      loading: false,
      finished: false,
      refresh: false,
      whiteList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13],
      gId: '0', //组编号
      institutionNo: '', //机构ID
      userId: "", //用户ID
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.gId = userInfo.gid;
    this.institutionNo = userInfo.institutionNo;
    this.loadType();
    this.loadData();
  },
  mounted() {

  },
  methods: {
    // 查询认知任务分类
    loadType() {
      this.$http.get(`category/getCognizeCategoryList?institutionNo=${this.institutionNo}&gId=${this.gId}`, {}, (msg) => {
        this.categoryList = msg?.data;
      });
    },

    // 加载认知任务
    loadData() {
      this.loading = true;
      this.$http.get(
        // `subjectInfo/getCognizeListByName?scaleName=${this.keyWords}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&categoryEname=${this.categoryEname}`,
        `subjectInfo/getCognizeListByAuth?scaleName=${this.keyWords}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&categoryEname=${this.categoryEname}&institutionNo=${this.institutionNo}&uId=${this.userId}&mobile=true`,
        {},
        (msg) => {
            console.log(msg,"认知任务列表")
            // 刷新时，先清空数据列表
            if (this.refresh) {
                this.refresh = false;
                this.taskList = [];
            }
            this.loading = false;
            this.taskList = this.taskList.concat(msg.data.data);
            // let arr = [];
            // 匹配测试人数
            // for (var i = 0; i < this.taskList.length; i++) {
            //   if (this.isWhite(this.taskList[i].no)) {
            //     arr.push(this.taskList[i]);
            //   }
            // }
            // this.currentTaskList = arr;
            this.pageNum++;
            if (this.taskList.length >= msg.data.allNum) {
              this.finished = true;
            }
            // 查询测试人数
            // this.$http.get(`cognize/testAmount`, {}, (res) => {
            //   if (parseInt(res.code) === 200) {
            //     let resultData = res.data;
            //     // let arr = [];
            //     // 匹配测试人数
            //     for (var i = 0; i < this.currentTaskList.length; i++) {
            //       for (var j = 0; j < resultData.length; j++) {
            //         if (resultData[j].flag == this.currentTaskList[i].taskCode) {
            //           this.currentTaskList[i].testNum = resultData[j].amount;
            //         }
            //       }
            //     }
            //   }
            // });
        }
      );
    },
    // // 加载认知任务
    // loadData() {
    //     this.loading = true;
    //     this.taskList = cognitiveAbilityTaskList;
    //     // 查询测试人数
    //     this.$http.get(`cognize/testAmount`, {}, (res) => {
    //         console.log(res);
    //         if (parseInt(res.code) === 200) {
    //             let resultData = res.data;
    //             // 匹配测试人数
    //             for (var i = 0; i < this.taskList.length; i++) {
    //                 for (var j = 0; j < resultData.length; j++) {
    //                     if (resultData[j].flag == this.taskList[i].taskCode) {
    //                         this.taskList[i].testNum = resultData[j].amount;
    //                     }
    //                 }
    //             }
    //         }
    //         this.loading = false;
    //         this.refresh = false;
    //     });
    //     this.finished = true;
    // },
    // 刷新认知任务列表
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.pageNum = 1;
      this.loadData();
    },

    // 根据名称搜索测试
    onSearch() {
      // for (var i = 0; i < cognitiveAbilityTaskList.length; i++) {
      //   if (cognitiveAbilityTaskList[i].name.indexOf(this.keyWords) != -1) {
      //     this.taskList.push(cognitiveAbilityTaskList[i]);
      //   }
      // }
      this.pageNum = 1;
      this.taskList = [];
      // this.loading = false;
      // this.finished = true;
      this.loadData();
    },
    // 取消搜索
    onCancel() {
      this.keyWords = "";
      // this.loading = false;
      // this.finished = false;
      this.taskList = [];
      // this.loadData();
       this.onRefresh()
    },

    // 切换类型
    changeType() {
      this.taskList = [];
      this.finished = false;
      this.loading = true;
      this.pageNum = 1;
      this.loadData();
    },
    // 去测试
    goDetail(item) {
		debugger
        sessionStorage.setItem('subjectInfo', JSON.stringify(item))
        let userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
            this.$router.push({
                name: "TaskDetail",
                query: {
                    flag: item.taskCode,
                    type: item.type,
                },
            });
        } else {
          this.$router.push("/login");
        }
    },
    // 屏蔽白名单外认知任务
    isWhite(no) {
      return this.whiteList.indexOf(no) == -1 ? false : true;
    },
  },
};
</script>

<style  scoped>
 

.van-list__loading {
  visibility: hidden;
}
</style>
