(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["cognitiveTask/cognitiveTask/index"],{369:function(t,e,n){"use strict";(function(t){n(5);i(n(4));var e=i(n(370));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},370:function(t,e,n){"use strict";n.r(e);var i=n(371),s=n(373);for(var o in s)"default"!==o&&function(t){n.d(e,t,(function(){return s[t]}))}(o);n(375);var a,r=n(20),u=Object(r["default"])(s["default"],i["render"],i["staticRenderFns"],!1,null,"925247d8",null,!1,i["components"],a);u.options.__file="cognitiveTask/cognitiveTask/index.vue",e["default"]=u.exports},371:function(t,e,n){"use strict";n.r(e);var i=n(372);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},372:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return s})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return i}));var s=function(){var t=this,e=t.$createElement;t._self._c},o=!1,a=[];s._withStripped=!0},373:function(t,e,n){"use strict";n.r(e);var i=n(374),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},374:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("cognitiveTask/components/list-item").then(function(){return resolve(n(704))}.bind(null,n)).catch(n.oe)},s={name:"cognitionTask",components:{listItem:i},data:function(){return{taskList:[],currentTaskList:[],coverImg:this.$aiUrl.urls.test_records_bg,keyWords:"",categoryEname:"CALL",pageNum:1,pageSize:10,categoryList:[],loading:!1,finished:!1,refresh:!1,whiteList:[1,2,3,4,5,6,7,8,9,11,13],gId:"0",institutionNo:"",userId:""}},created:function(){this.userId=sessionStorage.getItem("userId");var t=JSON.parse(sessionStorage.getItem("userInfo"));this.gId=t.gid,this.institutionNo=t.institutionNo,this.loadType(),this.loadData()},mounted:function(){},methods:{loadType:function(){var t=this;this.$http.get("category/getCognizeCategoryList?institutionNo=".concat(this.institutionNo,"&gId=").concat(this.gId),{},(function(e){t.categoryList=null===e||void 0===e?void 0:e.data}))},loadData:function(){var t=this;this.loading=!0,this.$http.get("subjectInfo/getCognizeListByAuth?scaleName=".concat(this.keyWords,"&pageNum=").concat(this.pageNum,"&pageSize=").concat(this.pageSize,"&categoryEname=").concat(this.categoryEname,"&institutionNo=").concat(this.institutionNo,"&uId=").concat(this.userId,"&mobile=true"),{},(function(e){console.log(e,"认知任务列表"),t.refresh&&(t.refresh=!1,t.taskList=[]),t.loading=!1,t.taskList=t.taskList.concat(e.data.data),t.pageNum++,t.taskList.length>=e.data.allNum&&(t.finished=!0)}))},onRefresh:function(){this.finished=!1,this.loading=!0,this.pageNum=1,this.loadData()},onSearch:function(){this.pageNum=1,this.taskList=[],this.loadData()},onCancel:function(){this.keyWords="",this.taskList=[],this.onRefresh()},changeType:function(){this.taskList=[],this.finished=!1,this.loading=!0,this.pageNum=1,this.loadData()},goDetail:function(t){sessionStorage.setItem("subjectInfo",JSON.stringify(t));var e=sessionStorage.getItem("userInfo");e?this.$router.push({name:"TaskDetail",query:{flag:t.taskCode,type:t.type}}):this.$router.push("/login")},isWhite:function(t){return-1!=this.whiteList.indexOf(t)}}};e.default=s},375:function(t,e,n){"use strict";n.r(e);var i=n(376),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},376:function(t,e,n){}},[[369,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/cognitiveTask/cognitiveTask/index.js.map