(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/echarts-uniapp/echarts-uniapp"],{"0ad3":function(t,e,n){},"3d9b":function(t,e,n){"use strict";n.r(e);var a=n("7c11"),r=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=r.a},"7c11":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),r=o(n("d288")),c=i(n("2481"));function s(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return s=function(){return t},t}function i(t){if(t&&t.__esModule)return t;if(null===t||"object"!==typeof t&&"function"!==typeof t)return{default:t};var e=s();if(e&&e.has(t))return e.get(t);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var c=a?Object.getOwnPropertyDescriptor(t,r):null;c&&(c.get||c.set)?Object.defineProperty(n,r,c):n[r]=t[r]}return n.default=t,e&&e.set(t,n),n}function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,a,r,c,s){try{var i=t[c](s),o=i.value}catch(u){return void n(u)}i.done?e(o):Promise.resolve(o).then(a,r)}function f(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var c=t.apply(e,n);function s(t){u(c,a,r,s,i,"next",t)}function i(t){u(c,a,r,s,i,"throw",t)}s(void 0)}))}}var d={},v={props:{canvasId:{type:String,default:"echarts"},option:{type:Object,default:function(){return{}}}},watch:{option:function(t,e){console.log("初始化",t),this.initChart(t)}},data:function(){return{ctx:null}},mounted:function(){c.registerPreprocessor((function(t){t&&t.series&&(t.series.length>0?t.series.forEach((function(t){t.progressive=0})):"object"===typeof t.series&&(t.series.progressive=0))}))},methods:{getCanvasAttr2d:function(){var e=this;return new Promise((function(n,a){var s=t.createSelectorQuery().in(e);s.select("#"+e.canvasId).fields({node:!0,size:!0}).exec((function(a){var s=a[0].node;e.canvasNode=s;var i=t.getSystemInfoSync().pixelRatio,o=a[0].width,u=a[0].height;e.ctx=s.getContext("2d");var f=new r.default(e.ctx,e.canvasId,!0,s);c.setCanvasCreator((function(){return f})),n({canvas:f,canvasWidth:o,canvasHeight:u,canvasDpr:i})}))}))},getCanvasAttr:function(){var e=this;return new Promise((function(n,a){e.ctx=t.createCanvasContext(e.canvasId,e);var s=new r.default(e.ctx,e.canvasId,!1);c.setCanvasCreator((function(){return s}));var i=1,o=t.createSelectorQuery().in(e);o.select("#"+e.canvasId).boundingClientRect((function(t){var e=t.width,a=t.height;n({canvas:s,canvasWidth:e,canvasHeight:a,canvasDpr:i})})).exec()}))},initChart:function(t){var e=this;return f(a.default.mark((function n(){var r,s,i,o,u;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getCanvasAttr2d();case 2:r=n.sent,s=r.canvas,i=r.canvasWidth,o=r.canvasHeight,u=r.canvasDpr,d[e.canvasId]=c.init(s,null,{width:i,height:o,devicePixelRatio:u}),s.setChart(d[e.canvasId]),d[e.canvasId].setOption(t||e.option);case 7:case"end":return n.stop()}}),n)})))()},canvasToTempFilePath:function(e){var n=this,a=t.createSelectorQuery().in(this);a.select("#"+this.canvasId).fields({node:!0,size:!0}).exec((function(a){var r=a[0].node;e.canvas=r,t.canvasToTempFilePath(e,n)}))},touchStart:function(t){if(d[this.canvasId]&&t.touches.length>0){var e=t.touches[0],n=d[this.canvasId].getZr().handler;n.dispatch("mousedown",{zrX:e.x,zrY:e.y}),n.dispatch("mousemove",{zrX:e.x,zrY:e.y}),n.processGesture(h(t),"start")}},touchMove:function(t){if(d[this.canvasId]&&t.touches.length>0){var e=t.touches[0],n=d[this.canvasId].getZr().handler;n.dispatch("mousemove",{zrX:e.x,zrY:e.y}),n.processGesture(h(t),"change")}},touchEnd:function(t){if(d[this.canvasId]){var e=t.changedTouches?t.changedTouches[0]:{},n=d[this.canvasId].getZr().handler;n.dispatch("mouseup",{zrX:e.x,zrY:e.y}),n.dispatch("click",{zrX:e.x,zrY:e.y}),n.processGesture(h(t),"end")}}}};function h(t){for(var e=0;e<t.touches.length;++e){var n=t.touches[e];n.offsetX=n.x,n.offsetY=n.y}return t}e.default=v}).call(this,n("543d")["default"])},"918a":function(t,e,n){"use strict";var a=n("0ad3"),r=n.n(a);r.a},b652:function(t,e,n){"use strict";n.r(e);var a=n("d4bf"),r=n("3d9b");for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);n("918a");var s,i=n("f0c5"),o=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"246644a4",null,!1,a["a"],s);e["default"]=o.exports},d4bf:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/echarts-uniapp/echarts-uniapp-create-component',
    {
        'components/echarts-uniapp/echarts-uniapp-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b652"))
        })
    },
    [['components/echarts-uniapp/echarts-uniapp-create-component']]
]);
