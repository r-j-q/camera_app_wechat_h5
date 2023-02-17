require('./common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["cognitiveTasksPage/DigitalMemoryTest"],{266:function(e,t,n){"use strict";(function(e){n(5);s(n(4));var t=s(n(267));function s(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},267:function(e,t,n){"use strict";n.r(t);var s=n(268),r=n(270);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(273);var o,u=n(20),c=Object(u["default"])(r["default"],s["render"],s["staticRenderFns"],!1,null,"7d3d364d",null,!1,s["components"],o);c.options.__file="cognitiveTasksPage/DigitalMemoryTest.vue",t["default"]=c.exports},268:function(e,t,n){"use strict";n.r(t);var s=n(269);n.d(t,"render",(function(){return s["render"]})),n.d(t,"staticRenderFns",(function(){return s["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return s["recyclableRender"]})),n.d(t,"components",(function(){return s["components"]}))},269:function(e,t,n){"use strict";var s;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return s}));try{s={uButton:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,480))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,o=[];r._withStripped=!0},270:function(e,t,n){"use strict";n.r(t);var s=n(271),r=n.n(s);for(var i in s)"default"!==i&&function(e){n.d(t,e,(function(){return s[e]}))}(i);t["default"]=r.a},271:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n(9)),r=n(15),i=(n(13),n(272));function o(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,s,r,i,o){try{var u=e[i](o),c=u.value}catch(a){return void n(a)}u.done?t(c):Promise.resolve(c).then(s,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(s,r){var i=e.apply(t,n);function o(e){u(i,s,r,o,c,"next",e)}function c(e){u(i,s,r,o,c,"throw",e)}o(void 0)}))}}var a={name:"digitalMemoryTest",data:function(){return{customStyle:{margin:"0 10px"},buttonShow:!0,digitalShow:!0,numberArr:[],numberShow:"",randomArr:[],randomDigital:"",randomNum:"",cumulation:0,timeFlag:null,commonTime:0,desFlag:!0,forceEndButtonName:"结束正序测试",arrList:[0,1,2,3,4,5,6,7,8,9],result:{AESCScore:0,DESCScore:0,AESC:[{index:0,diff:3,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:1,diff:3,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:2,diff:4,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:3,diff:4,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:4,diff:5,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:5,diff:5,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:6,diff:6,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:7,diff:6,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:8,diff:7,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:9,diff:7,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:10,diff:8,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:11,diff:8,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:12,diff:9,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:13,diff:9,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:14,diff:10,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:15,diff:10,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:16,diff:11,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:17,diff:11,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:18,diff:12,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:19,diff:12,type:"AESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""}],DESC:[{index:0,diff:2,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:1,diff:2,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:2,diff:3,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:3,diff:3,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:4,diff:4,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:5,diff:4,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:6,diff:5,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:7,diff:5,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:8,diff:6,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:9,diff:6,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:10,diff:7,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:11,diff:7,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:12,diff:8,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:13,diff:8,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:14,diff:9,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:15,diff:9,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:16,diff:10,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""},{index:17,diff:10,type:"DESC",qNumberSequence:"",userResponseSequence:"",rightOrWrong:"",responseTime:""}]},timingShow:!0,timingFlag:null,timingDes:"测试于5秒后开始，请做好准备",countDownStr:"测试马上开始！",timingNum:5,subjectInfo:"",userId:"",taskId:"",role:"",toUserId:"",radio1:"doc",webSocket:"",testPlanId:"",add_bg_memory_warp:"",add_add_mid:""}},onShow:function(){this.add_bg_memory_warp=i.taskImgs.add_bg_memory_warp,this.add_add_mid=i.taskImgs.add_add_mid,this.chooseRole()},computed:{showCover:function(){return this.role!=this.radio1}},methods:{begin:function(){var e=this;this.buttonShow=!1,setTimeout((function(){e.desFlag?e.generateRandom(e.result.AESC[e.cumulation].diff):e.generateRandom(e.result.DESC[e.cumulation].diff)}),1500)},init:function(){this.userId=this.$store.state.userInfo.user.id,this.toUserId="doc"==this.role?"".concat(this.userId,"patient"):"".concat(this.userId,"doc"),this.startTiming()},changeMaster:function(){var e={toUserId:this.toUserId,message:{msg:"角色切换",master:this.radio1==this.role}};console.log(e),this.webSocket.send(JSON.stringify(e))},disableHandle:function(){e.showToast({icon:"none",title:"您暂时不需要操作，请耐心等待！"})},chooseRole:function(){var t=this;e.showModal({title:"提示",content:"请选择你的身份，医生还是普通用户？",confirmText:"医生",cancelText:"普通用户",success:function(e){e.confirm?(t.role="doc",t.init()):e.cancel&&(t.role="patient",t.init())}})},creatScoket:function(){console.log("判断----》","".concat(r.scoketUrl).concat(this.userId,"/").concat(this.role));var t=this;e.connectSocket({url:"".concat(r.scoketUrl).concat(this.userId,"/").concat(this.role),success:function(e){console.log("判断是否已连接----》",e),t.open(),t.scoketMessage()},fail:function(e){console.log("WebSocket连接失败 connectSocket=",e),t.error()}})},open:function(){e.onSocketOpen((function(e){console.log("WebSocket连接成功了--------\x3e")}))},scoketMessage:function(){var t=this;console.log("消息发送成功后服务端响应了"),e.onSocketMessage((function(e){var n=JSON.parse(e.data);console.log("消息发送成功后服务端响应了返回数据了",n),n.message&&t.receiveMsgHandle(n.message),console.log("-服务器返回信息--99999》",res)}))},receiveMsgHandle:function(t){console.log(t),void 0==t.master?(3901==t.eventNo&&(this.randomArr=t.data,this.palynum()),3902==t.eventNo&&this.userClick(t.data),3903==t.eventNo&&this.userDel(),3904==t.eventNo&&this.userSubmit(),3905==t.eventNo&&(this.buttonShow=!1),3906==t.eventNo&&(console.log(t.data),this.endTest()),3907==t.eventNo&&(e.showToast({icon:"none",title:"测试结束！"}),this.goTestResult(t.data))):this.radio1=t.master?"doc":"patient"},sendMsgHandle:function(e,t){var n={toUserId:this.toUserId,message:{msg:"点击了一次",eventNo:e,data:t}};this.webSocket.send(JSON.stringify(n))},startTiming:function(){var t=this;return c(s.default.mark((function n(){return s.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(""!=t.$store.state.userInfo.user.id){n.next=4;break}return e.showToast({icon:"none",title:"请先登录！"}),getApp().jumpToTestRecordLogin(),n.abrupt("return");case 4:t.timingFlag=setInterval((function(){0==t.timingNum?(t.timingShow=!1,t.timingFlag=clearInterval(t.timingFlag),t.desFlag||t.generateRandom(t.result.DESC[t.cumulation].diff)):(t.countDownStr=t.timingNum,t.timingNum--)}),1e3);case 5:case"end":return n.stop()}}),n)})))()},startTime:function(){var e=this;this.commonTime=0,this.timeFlag=setInterval((function(){e.commonTime++}),1e3)},endTime:function(){this.timeFlag=clearInterval(this.timeFlag)},sleep:function(){return c(s.default.mark((function e(){return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){setTimeout((function(){e()}),1e3)})));case 1:case"end":return e.stop()}}),e)})))()},generateArray:function(e){this.randomArr=[];for(var t=0;t<e;t++){var n=Math.floor(10*Math.random());if(t<10){if(-1!==this.randomArr.indexOf(this.arrList[n])){t-=1;continue}this.randomArr.push(this.arrList[n])}else this.randomArr.push(this.arrList[n])}},generateRandom:function(e){this.showCover||(this.generateArray(e),this.palynum())},palynum:function(){var e=this;return c(s.default.mark((function t(){var n;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.randomDigital=e.randomArr.join(""),t.t0=s.default.keys(e.randomArr);case 2:if((t.t1=t.t0()).done){t.next=9;break}return n=t.t1.value,e.randomNum=e.randomArr[n],t.next=7,e.sleep();case 7:t.next=2;break;case 9:e.digitalShow=!1,e.startTime();case 11:case"end":return t.stop()}}),t)})))()},userClick:function(e){this.numberArr.push(e),this.numberShow=this.numberArr.join("")},userDel:function(){this.numberArr.pop(),this.numberShow=this.numberArr.join("")},userSubmit:function(){var t=this;if(0!=this.numberShow.length)if(this.endTime(),this.desFlag)this.numberShow.length==this.randomDigital.length&&this.numberShow==this.randomDigital?(this.result.AESC[this.cumulation].qNumberSequence=this.randomDigital,this.result.AESC[this.cumulation].userResponseSequence=this.numberShow,this.result.AESC[this.cumulation].rightOrWrong="YES",this.result.AESC[this.cumulation].responseTime=this.commonTime,this.cumulation%2!=0&&"YES"==this.result.AESC[this.cumulation-1].rightOrWrong&&(this.result.AESCScore=this.result.AESC[this.cumulation].diff)):(this.result.AESC[this.cumulation].qNumberSequence=this.randomDigital,this.result.AESC[this.cumulation].userResponseSequence=this.numberShow,this.result.AESC[this.cumulation].rightOrWrong="NO",this.result.AESC[this.cumulation].responseTime=this.commonTime),this.cumulation>=19?(e.showToast({title:"正背测试完成！接下来进入倒背测试！"}),this.cumulation=0,this.desFlag=!1,this.digitalShow=!0,this.numberArr=[],this.numberShow="",this.countDownStr="测试马上开始！",this.timingNum=10,this.timingShow=!0,this.startTiming(),this.endTime()):(this.cumulation++,this.digitalShow=!0,this.numberArr=[],this.numberShow="",this.generateRandom(this.result.AESC[this.cumulation].diff));else if(this.numberShow.length==this.randomDigital.length&&this.numberShow==this.randomArr.reverse().join("")?(this.result.DESC[this.cumulation].qNumberSequence=this.randomDigital,this.result.DESC[this.cumulation].userResponseSequence=this.numberShow,this.result.DESC[this.cumulation].rightOrWrong="YES",this.result.DESC[this.cumulation].responseTime=this.commonTime,this.cumulation%2!=0&&"YES"==this.result.DESC[this.cumulation-1].rightOrWrong&&(this.result.DESCScore=this.result.DESC[this.cumulation].diff)):(this.result.DESC[this.cumulation].qNumberSequence=this.randomDigital,this.result.DESC[this.cumulation].userResponseSequence=this.numberShow,this.result.DESC[this.cumulation].rightOrWrong="NO",this.result.DESC[this.cumulation].responseTime=this.commonTime),this.cumulation>=17){this.result.AESCScore,this.result.DESCScore;if(this.showCover)this.numberArr=[],this.numberShow="",this.endTime();else{var n={userId:this.userId,result:this.result,testPlanId:this.testPlanId},s=this.$CryptoJS.AesEncrypt(JSON.stringify(n));this.$request.post({url:cognizeADDITION,data:{data:s}}).then((function(n){n&&"200"==n.code?(e.showToast({title:"测试结束！"}),t.numberArr=[],t.numberShow="",t.endTime(),t.goTestResult(n.data)):e.showToast({title:null===n||void 0===n?void 0:n.msg})}),(function(t){e.showToast({title:t.msg})}))}}else this.cumulation++,this.digitalShow=!0,this.numberArr=[],this.numberShow="",this.generateRandom(this.result.DESC[this.cumulation].diff);else e.showToast({title:"请输入数字提交"})},goTestResult:function(t){return c(s.default.mark((function n(){var r;return s.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,getApp().getVersionId(t);case 2:r=getApp().globalData.isTrue,setTimeout((function(){r?e.navigateTo({url:"/cognitiveTasksTestResult/testResultNew?id="+t}):(e.navigateTo({url:"/cognitiveTasksTestResult/testResult?id="+t+"&messageShare=1&flag="+getApp().globalData.flag}),console.log("旧====>",r))}),1e3);case 4:case"end":return n.stop()}}),n)})))()},endTest:function(){var t=this;if(this.role,this.desFlag)this.cumulation=0,this.desFlag=!1,this.digitalShow=!0,this.numberArr=[],this.numberShow="",this.countDownStr="倒序测试马上开始！",this.forceEndButtonName="结束倒序测试",this.timingNum=10,this.timingShow=!0,this.startTiming(),this.endTime();else{this.result.AESCScore,this.result.DESCScore;"doc"!=this.role?this.testPlanId&&this.$router.push({name:"testPlanClassify",params:{testPlanId:this.testPlanId}}):this.$http.post("/cognize/DST",{userId:this.userId,result:this.result,testPlanId:this.testPlanId},(function(n){n&&"200"==n.code&&(e.showToast({title:"测试结束！"}),t.numberArr=[],t.numberShow="",t.endTime(),t.closeWebsocket(),t.goTestResult(n.data))}))}},closeWebsocket:function(e){this.webSocket&&(this.webSocket.close(),this.webSocket.onclose=function(e){console.log("websocket已关闭")})}},beforeDestroy:function(){var e=this;window.removeEventListener("beforeunload",(function(t){return e.closeWebsocket(t)}))},destroyed:function(){clearInterval(this.timeFlag),clearInterval(this.timingFlag),this.closeWebsocket()}};t.default=a}).call(this,n(1)["default"])},273:function(e,t,n){"use strict";n.r(t);var s=n(274),r=n.n(s);for(var i in s)"default"!==i&&function(e){n.d(t,e,(function(){return s[e]}))}(i);t["default"]=r.a},274:function(e,t,n){}},[[266,"common/runtime","common/vendor","cognitiveTasksPage/common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/cognitiveTasksPage/DigitalMemoryTest.js.map