(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab/cognitiveTask/index"],{160:function(e,t,n){"use strict";(function(e){n(5);o(n(4));var t=o(n(161));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},161:function(e,t,n){"use strict";n.r(t);var o=n(162),r=n(164);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(166);var a,u=n(20),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"51078e42",null,!1,o["components"],a);c.options.__file="pages/tab/cognitiveTask/index.vue",t["default"]=c.exports},162:function(e,t,n){"use strict";n.r(t);var o=n(163);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},163:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));try{o={uSticky:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-sticky/u-sticky")]).then(n.bind(null,377))},uSearch:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-search/u-search")]).then(n.bind(null,449))},vTabs:function(){return n.e("components/v-tabs/v-tabs").then(n.bind(null,457))},uLoadmore:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(n.bind(null,385))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,a=[];r._withStripped=!0},164:function(e,t,n){"use strict";n.r(t);var o=n(165),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},165:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,r=u(n(9)),i=n(12),a=n(13);function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,r,i,a){try{var u=e[i](a),c=u.value}catch(s){return void n(s)}u.done?t(c):Promise.resolve(c).then(o,r)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){c(i,o,r,a,u,"next",e)}function u(e){c(i,o,r,a,u,"throw",e)}a(void 0)}))}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(){n.e("components/cameraContent/index").then(function(){return resolve(n(464))}.bind(null,n)).catch(n.oe)},m=(getApp().globalData,{name:"index",components:{CameraContent:g},computed:d({},(0,i.mapGetters)(["userInfo"])),data:function(){return{scaleName:"",placeholder:"请输入搜索关键词",current:0,tabs:["全部测试","心里综合","人格气质及个性","老年测评","儿童及青少年测评"],loadingText:"加载中...",loadmoreText:"加载中",nomoreText:"----到底了----",categoryList:[],categoryNameList:[],status:"加载中",pageNum:1,pageSize:30,totleSize:0,categoryEname:"全部任务"}},watch:{},onLoad:function(){o=this,o.userId=o.userInfo.user.id,o.gId=o.userInfo.user.gid,o.institutionNo=o.$textContent.institutionNo,o.getSubjectListByName(),o.getCategoryList(),console.log("--认知任务-------\x3e")},onShareAppMessage:function(e){var t={path:"/pages/tab/cognitiveTask/index",imageUrl:"",success:function(e){e.errMsg},fail:function(){"shareAppMessage:fail cancel"==res.errMsg||res.errMsg}};return t},onReachBottom:function(){o.categoryNameList.length>=o.totleSize||(o.status="loading",o.pageNum++,setTimeout((function(){o.getSubjectListByName(),o.categoryNameList.length>=o.totleSize?o.status="nomore":o.status="loading"}),1e3),e.stopPullDownRefresh())},methods:{input:function(e){o.pageNum=1,o.categoryNameList=[],o.getSubjectListByName()},changeTab:function(e){o.categoryEname=o.categoryList[e].ename,o.categoryNameList=[],o.pageNum=1,o.getSubjectListByName()},handleStockList:function(e,t){var n=this;n.stockList[t].active=!n.stockList[t].active},nativeGetTo:function(){e.navigateTo({url:"/pages/user/login"}),e.showToast({icon:"none",title:"Please Sign In"})},jumpToDescribe:function(t){null==this.userInfo?this.nativeGetTo():e.navigateTo({url:getApp().getUrl("/pages/describe/index?item="+encodeURIComponent(JSON.stringify(t)))})},getSubjectListByName:function(){var t,n={pageNum:o.pageNum,pageSize:o.pageSize,categoryEname:"全部任务"==o.categoryEname?"CALL":o.categoryEname,uId:o.userId,gId:o.gId,institutionNo:null===(t=o.userInfo)||void 0===t?void 0:t.user.institutionNo,scaleName:o.scaleName};o.$request.get({url:a.getCognizeListByAuth,loadingTip:"加载中...",data:d({},n)}).then((function(t){if(200==t.code){var n=t.data.data;n.forEach((function(e){"ShapeIntuition"!=e.pageUrl&&"ETBexperiment_new"!=e.pageUrl&&"continueAdditionTask"!=e.pageUrl&&"rememberAbilityTask"!=e.pageUrl&&"CoginitiveTask"!=e.pageUrl&&"DigitalMemoryTest"!=e.pageUrl&&"riskPolicy"!=e.pageUrl&&"ruiWenTask"!=e.pageUrl||o.categoryNameList.push(e)})),o.totleSize=o.categoryNameList.length,o.categoryNameList.length>=o.totleSize?o.status="nomore":o.status="loadmore"}else 401==t.code||e.showToast({title:"加载有误",icon:"none"})}))},getCategoryList:function(){return s(r.default.mark((function e(){var t;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.$request.get({url:"".concat(a.getCognizeCategoryList,"?institutionNo=").concat(null===(t=o.userInfo)||void 0===t?void 0:t.user.institutionNo,"&gId=").concat(o.gId),loadingTip:"加载中..."}).then((function(e){var t=[],n=[];if(200==e.code){for(var r=0;r<e.data.length;r++)t.push(e.data[r]),n.push(e.data[r].name);o.tabs=n,o.categoryList=t}}));case 2:case"end":return e.stop()}}),e)})))()}}});t.default=m}).call(this,n(1)["default"])},166:function(e,t,n){"use strict";n.r(t);var o=n(167),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},167:function(e,t,n){}},[[160,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tab/cognitiveTask/index.js.map