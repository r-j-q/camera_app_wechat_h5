(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["scalePage/beginTest/index"],{321:function(e,n,t){"use strict";(function(e){t(5);r(t(4));var n=r(t(322));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},322:function(e,n,t){"use strict";t.r(n);var r=t(323),o=t(325);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(327);var s,a=t(20),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"51f415ea",null,!1,r["components"],s);c.options.__file="scalePage/beginTest/index.vue",n["default"]=c.exports},323:function(e,n,t){"use strict";t.r(n);var r=t(324);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},324:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uButton:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,480))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},i=!1,s=[];o._withStripped=!0},325:function(e,n,t){"use strict";t.r(n);var r=t(326),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},326:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(12);function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var a,c=function(){t.e("components/textFile/textGrf").then(function(){return resolve(t(414))}.bind(null,t)).catch(t.oe)},u=(getApp().globalData,{name:"index",components:{textGrf:c},computed:i({},(0,r.mapGetters)(["userInfo"])),data:function(){return{bao1:this.$imageUrl.urls.bao1,bao2:this.$imageUrl.urls.bao2,bao3:this.$imageUrl.urls.bao3,urlsTest:this.$imageUrl.urls.toBeginTesting[0].urlsTest,beginTestContent:{name:"",description:"",id:"",testNum:"66"}}},onLoad:function(e){a=this,e.params&&(a.beginTestContent=JSON.parse(decodeURIComponent(e.params)),console.log("开始测试页面参数",a.beginTestContent))},onShow:function(){e.$on("updateData",(function(e){a.beginTestContent=JSON.parse(decodeURIComponent(e))}))},onShareAppMessage:function(e){var n=this,t=encodeURIComponent(JSON.stringify(n.beginTestContent)),r={path:"/scalePage/beginTest/index?params="+t,imageUrl:"",success:function(e){e.errMsg},fail:function(){"shareAppMessage:fail cancel"==res.errMsg||res.errMsg}};return r},methods:{navToBeginTestAnswer:function(){var n=this.beginTestContent;if(console.log("---user-----",n.name),""!=this.$store.state.userInfo.user.id){var t=JSON.stringify(n);e.setStorageSync("beginTextData",t),e.navigateTo({url:"/examWidght/examWidght/index?flag="+n.flag+"&id="+n.id+"&name="+n.name+"&reportVersion="+n.reportVersion})}else getApp().jumpToTestRecordLogin()}}});n.default=u}).call(this,t(1)["default"])},327:function(e,n,t){"use strict";t.r(n);var r=t(328),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},328:function(e,n,t){}},[[321,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/scalePage/beginTest/index.js.map