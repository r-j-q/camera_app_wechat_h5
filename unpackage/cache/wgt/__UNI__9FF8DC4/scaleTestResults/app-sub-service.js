(this["webpackJsonp"]=this["webpackJsonp"]||[]).push([["scaleTestResults/app-sub-service"],{1355:function(t,e,s){"use strict";s.r(e);var i=s("e9ad"),r=s.n(i);for(var o in i)"default"!==o&&function(t){s.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},2236:function(t,e,s){"use strict";s.r(e);var i=s("ba1a"),r=s("7a5c");for(var o in r)"default"!==o&&function(t){s.d(e,t,(function(){return r[t]}))}(o);var a,n=s("f0c5"),c=Object(n["a"])(r["default"],i["b"],i["c"],!1,null,"072b21a4",null,!1,i["a"],a);e["default"]=c.exports},"7a5c":function(t,e,s){"use strict";s.r(e);var i=s("8158"),r=s.n(i);for(var o in i)"default"!==o&&function(t){s.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},8158:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s("3a86"),r={data:function(){return{xieYs:""}},onShow:function(){this.xieYs=i.xieY}};e.default=r},ba1a:function(t,e,s){"use strict";var i;s.d(e,"b",(function(){return r})),s.d(e,"c",(function(){return o})),s.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:t._$s(0,"sc","margAll"),attrs:{_i:0}},[s("view",{staticClass:t._$s(1,"sc","fontSize13 fontWeight marginBottom40"),attrs:{_i:1}}),s("view",{staticClass:t._$s(2,"sc","xie_y"),attrs:{_i:2}},[t._v(t._$s(2,"t0-0",t._s(t.xieYs)))])])},o=[]},cf43:function(t,e,s){"use strict";s.d(e,"b",(function(){return r})),s.d(e,"c",(function(){return o})),s.d(e,"a",(function(){return i}));var i={uNavbar:s("3f94").default,uRow:s("db88").default,uCol:s("7fcb").default,uLineProgress:s("4cd3").default,uGap:s("e623").default,uButton:s("e8d6").default},r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",[s("u-navbar",{attrs:{leftText:"\u8fd4\u56de",title:"\u6d4b\u8bd5\u7ed3\u679c",autoBack:!0,_i:1},on:{leftClick:t.leftClick}}),s("view",{staticClass:t._$s(2,"sc","total-score-progress-content"),attrs:{_i:2}},[s("u-row",{attrs:{_i:3}},[s("u-col",{attrs:{span:"9",_i:4}},[s("view",{staticClass:t._$s(5,"sc","demo-layout-bg-purple-light disRowAroundcenter"),attrs:{_i:5}},[t._$s(6,"i",t.totalScores)?s("view",{staticClass:t._$s(6,"sc","total-score-progress mrr textColor"),attrs:{_i:6}}):t._e(),t._$s(7,"i",t.totalScores)?s("view",{staticClass:t._$s(7,"sc","total-score-progress-width"),attrs:{_i:7}},[s("view",{staticClass:t._$s(8,"sc"," marginBottom10 textColor"),attrs:{_i:8}},[t._v(t._$s(8,"t0-0",t._s(2==t.testResult?t.totalScores.toFixed(2):t.scoresList[0].tableContext[0].value[0])))]),s("view",{staticClass:t._$s(9,"sc","total-score-progress-line"),attrs:{_i:9}},[s("u-line-progress",{attrs:{activeColor:"#3FB4C9",height:"18",percentage:t.totalScores,showText:!1,_i:10}})],1)]):t._e()])]),s("u-col",{attrs:{span:"3",_i:11}},[t._$s(12,"i",t.totalScores)?s("view",{staticClass:t._$s(12,"sc","demo-layout-bg-purple"),attrs:{_i:12}},[s("image",{attrs:{src:t._$s(13,"a-src",t.persion),_i:13}})]):t._e()])],1),s("u-row",{attrs:{_i:14}},[s("u-col",{attrs:{span:"12",_i:15}},[s("view",{staticClass:t._$s(16,"sc","demo-layout-bg-purple-light disRowAroundcenter"),attrs:{_i:16}},[t._$s(17,"i","\u65e0"!=t.improvementSuggestions)?s("view",{staticClass:t._$s(17,"sc","total-score-progress-test mrr textColor"),attrs:{_i:17}},[s("span",[t._v(t._$s(18,"t0-0",t._s(t.improvementSuggestions)))])]):t._e()])])],1),s("u-gap",{attrs:{height:"20",_i:19}}),s("u-row",{attrs:{_i:20}},[s("u-col",{attrs:{span:"9",_i:21}},[s("view",{staticClass:t._$s(22,"sc","demo-layout-bg-purple-light disRowAroundcenter"),attrs:{_i:22}},[t._$s(23,"i",t.name)?s("view",{staticClass:t._$s(23,"sc","total-score-progress-test mrr textColor"),attrs:{_i:23}},[t._v(t._$s(23,"t0-0",t._s(t.name)))]):t._e()])])],1),s("u-gap",{attrs:{height:"20",_i:24}}),s("u-row",{attrs:{_i:25}},[s("u-col",{attrs:{span:"12",_i:26}},[s("view",{staticClass:t._$s(27,"sc","demo-layout-bg-purple-light disRowAroundcenter"),attrs:{_i:27}},[t._$s(28,"i",t.time)?s("view",{staticClass:t._$s(28,"sc","total-score-progress-test mrr textColor"),attrs:{_i:28}},[t._v(t._$s(28,"t0-0",t._s(t.time)))]):t._e()])])],1)],1),t._l(t._$s(29,"f",{forItems:t.scoresList}),(function(e,i,r,o){return s("view",{key:t._$s(29,"f",{forIndex:r,key:i})},[s("view",{staticClass:t._$s("30-"+o,"sc","custom-style-list"),attrs:{_i:"30-"+o}},[s("u-row",{attrs:{customStyle:"margin-bottom: 20rpx;background-color: rgb(232, 241, 242);padding:40rpx 0",_i:"31-"+o}},t._l(t._$s("32-"+o,"f",{forItems:e.colNames}),(function(e,i,r,a){return s("u-col",{key:t._$s("32-"+o,"f",{forIndex:r,key:"32-"+o+"-"+a}),attrs:{span:"6",_i:"32-"+o+"-"+a}},[s("view",{staticClass:t._$s("33-"+o+"-"+a,"sc","custom-style-list-left textColor"),attrs:{_i:"33-"+o+"-"+a}},[t._v(t._$s("33-"+o+"-"+a,"t0-0",t._s(e)))])])})),1)],1),s("view",{staticClass:t._$s("34-"+o,"sc","custom-style-list"),attrs:{_i:"34-"+o}},t._l(t._$s("35-"+o,"f",{forItems:2==t.testResult?e.newTableContext.result:e.tableContext}),(function(e,i,r,a){return t._$s("35-"+o+"-"+a,"i",void 0!=e.name)?s("u-row",{key:t._$s("35-"+o,"f",{forIndex:r,key:i}),attrs:{customStyle:"margin-bottom: 20rpx;padding:30rpx 0",_i:"35-"+o+"-"+a}},[s("u-col",{attrs:{span:"6",_i:"36-"+o+"-"+a}},[s("view",{staticClass:t._$s("37-"+o+"-"+a,"sc","custom-style-list-left"),attrs:{_i:"37-"+o+"-"+a}},[t._v(t._$s("37-"+o+"-"+a,"t0-0",t._s(e.name)))])]),s("u-col",{attrs:{span:"6",_i:"38-"+o+"-"+a}},[s("view",{staticClass:t._$s("39-"+o+"-"+a,"sc","custom-style-list-right"),attrs:{_i:"39-"+o+"-"+a}},[t._v(t._$s("39-"+o+"-"+a,"t0-0",t._s(2==t.testResult?e.score:e.value[0])))])])],1):t._e()})),1)])})),s("leiDa",{attrs:{reference:t.reference,scoreList:t.scoreList,indicator:t.indicator,_i:40}}),t._l(t._$s(41,"f",{forItems:t.symptomDescription}),(function(e,i,r,o){return t._$s("41-"+o,"i",void 0!=e.symptom&&"\u65e0"!=e.symptom&&"\u65e0"!=e.improvementSuggestions&&"\u65e0"!=e.symptom)?s("view",{key:t._$s(41,"f",{forIndex:r,key:i}),staticClass:t._$s("41-"+o,"sc","custom-style-list padding20"),attrs:{_i:"41-"+o}},[s("u-row",{attrs:{_i:"42-"+o}},[s("u-col",{attrs:{span:"12",_i:"43-"+o}},[s("view",{staticClass:t._$s("44-"+o,"sc","custom-style-list-left weight"),attrs:{_i:"44-"+o}},[t._$s("45-"+o,"i","\u603b\u5206"!=e.name&&"\u65e0"!=e.symptom)?s("view",[t._v(t._$s("45-"+o,"t0-0",t._s(e.name))+t._$s("45-"+o,"t0-1",t._s(e.symptom)))]):t._e()])])],1),s("u-row",{attrs:{_i:"46-"+o}},[t._$s("47-"+o,"i","\u65e0"!=e.improvementSuggestions)?s("u-col",{attrs:{span:"12",_i:"47-"+o}},[s("view",{staticClass:t._$s("48-"+o,"sc","padding10 textIndent"),attrs:{_i:"48-"+o}},[t._v(t._$s("48-"+o,"t0-0",t._s(e.improvementSuggestions)))])]):t._e()],1)],1):t._e()})),t._$s(49,"i",t.totalScores)?s("view",{staticClass:t._$s(49,"sc","custom-style-list"),attrs:{_i:49}},[s("u-row",{attrs:{customStyle:"margin-bottom: 20rpx;padding:30rpx 0",gutter:10,_i:50}},[s("u-col",{attrs:{span:"6",_i:51}},[s("view",{staticClass:t._$s(52,"sc","custom-style-list-left"),attrs:{_i:52}},[s("u-button",{staticClass:t._$s(53,"sc","content_app11 textColorff weight fontSize30"),attrs:{type:"success",size:"mini",shape:"circle",_i:53},on:{click:t.downloads}},[t._v("")])],1)]),s("u-col",{attrs:{span:"6",_i:54}},[s("view",{staticClass:t._$s(55,"sc","custom-style-list-right"),attrs:{_i:55}},[s("u-button",{staticClass:t._$s(56,"sc","content_app11 textColorff weight fontSize30"),attrs:{type:"success",size:"mini",shape:"circle",_i:56},on:{click:t.navBack}},[t._v("")])],1)])],1)],1):t._e()],2)},o=[]},e9ad:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(s("ba9a")),r=c(s("4c70")),o=s("5cc2"),a=s("26cb"),n=s("6df0");function c(t){return t&&t.__esModule?t:{default:t}}function l(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function u(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?l(Object(s),!0).forEach((function(e){_(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function _(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}getApp().globalData;var f,d={name:"testResults",components:{textGrf:i.default,leiDa:r.default},computed:u({},(0,a.mapGetters)(["userInfo"])),data:function(){return{baseUrl:o.baseUrl,name:"",time:"",persion:this.$imageUrl.urls.persion,totalScores:0,symptomScore:[],symptomDescription:[],symptom:"",reference:[],scoreList:[],indicator:[],improvementSuggestions:"\u65e0",scoresList:[],resultId:"",subjectOrCognitiveId:"",testResult:2}},onBackPress:function(t){return uni.redirectTo({url:"/pages/tab/scaleTest/index"}),!0},onLoad:function(e){f=this,t("log","optionsoptionsoptionsoptionsoptions",e," at scaleTestResults/testResults/index.vue:201"),e.resultId&&(f.resultId=e.resultId,f.getScaleTestResults(f.resultId))},onReachBottom:function(){},methods:{leftClick:function(){uni.switchTab({url:"/pages/tab/scaleTest/index"})},downloads:function(){getApp().download(f.resultId)},navBack:function(){this.leftClick()},getScaleTestResults:function(e){f.$request.get({url:"".concat(n.getRecordById,"?id=").concat(e),loadingTip:"\u52a0\u8f7d\u4e2d...",data:{}}).then((function(e){if(t("log","----\u6d4b\u8bd5\u7ed3\u679c---\x3e",e," at scaleTestResults/testResults/index.vue:235"),200==e.code){var s,i;f.testResult=JSON.parse(null===(s=e.data)||void 0===s||null===(i=s.userRecordEntity)||void 0===i?void 0:i.testResult)[0].version,f.name=e.data.userRecordEntity.name;var r=e.data.userRecordEntity.testDate,o=r.replace("\u5e74","/").replace("\u6708","/").replace("\u65e5"," ").replace("\u65f6",":").replace("\u5206",":").replace("\u79d2","");f.time=o,2==f.testResult?f.getDataList(e.data):(f.scoresList=JSON.parse(e.data.userRecordEntity.testResult),f.init(f.scoresList[0].tableContext[0].value[0]))}else e.code}))},init:function(t){f.totalScores=Number(parseInt(t))},getDataList:function(e){var s=JSON.parse(e.userRecordEntity.testResult);f.scoresList=s,t("log","-----\u4f20\u5165\u7684\u53c2\u6570-----\x3e",s," at scaleTestResults/testResults/index.vue:284"),s.forEach((function(e){if(""!=e.newTableContext.iconInfo){var s,i,r,o,a,n,c=null===e||void 0===e||null===(s=e.newTableContext)||void 0===s||null===(i=s.iconInfo)||void 0===i?void 0:i.indicator;c.length>0&&c.forEach((function(t){f.indicator.push({text:t.text,max:Number(t.max)})}));var l=(null===e||void 0===e||null===(r=e.newTableContext)||void 0===r||null===(o=r.iconInfo)||void 0===o?void 0:o.reference)||[];l.length>0&&l.forEach((function(t){f.reference.push(Number(t))}));var u=null===e||void 0===e||null===(a=e.newTableContext)||void 0===a||null===(n=a.iconInfo)||void 0===n?void 0:n.scoreList;u.length>0&&u.forEach((function(t){f.scoreList.push(Number(t))})),t("log","==1111=====>",f.indicator," at scaleTestResults/testResults/index.vue:310"),t("log","==2222=====>",f.reference," at scaleTestResults/testResults/index.vue:311"),t("log","==3333=====>",f.scoreList," at scaleTestResults/testResults/index.vue:312")}e.newTableContext.result.forEach((function(t){t&&("\u603b\u5206"!==t.name&&"\u538b\u529b\u7efc\u5408\u6307\u6570"!==t.name||(f.init(t.score),f.symptom=t.symptom),"\u662f"===t.isTotalScoreExplain&&(f.improvementSuggestions=t.symptom),f.symptomScore.push({name:t.name,score:t.score}),f.symptomDescription.push({symptom:t.symptom,name:t.name,improvementSuggestions:t.improvementSuggestions}))})),t("log","0000000",e," at scaleTestResults/testResults/index.vue:336")}))}}};e.default=d}).call(this,s("0de9")["default"])},f60e:function(t,e,s){"use strict";s.r(e);var i=s("cf43"),r=s("1355");for(var o in r)"default"!==o&&function(t){s.d(e,t,(function(){return r[t]}))}(o);var a,n=s("f0c5"),c=Object(n["a"])(r["default"],i["b"],i["c"],!1,null,"260a5c3a",null,!1,i["a"],a);e["default"]=c.exports}}]);