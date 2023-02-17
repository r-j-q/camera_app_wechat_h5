(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/echarts-uniapp/echarts-uniapp"],{814:function(e,t,n){"use strict";n.r(t);var r=n(815),a=n(817);for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);n(821);var s,o=n(20),i=Object(o["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"be623a78",null,!1,r["components"],s);i.options.__file="components/echarts-uniapp/echarts-uniapp.vue",t["default"]=i.exports},815:function(e,t,n){"use strict";n.r(t);var r=n(816);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},816:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return c})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},c=!1,s=[];a._withStripped=!0},817:function(e,t,n){"use strict";n.r(t);var r=n(818),a=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=a.a},818:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(9)),a=i(n(819)),c=o(n(820));function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function o(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var c=r?Object.getOwnPropertyDescriptor(e,a):null;c&&(c.get||c.set)?Object.defineProperty(n,a,c):n[a]=e[a]}return n.default=e,t&&t.set(e,n),n}function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,a,c,s){try{var o=e[c](s),i=o.value}catch(u){return void n(u)}o.done?t(i):Promise.resolve(i).then(r,a)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function s(e){u(c,r,a,s,o,"next",e)}function o(e){u(c,r,a,s,o,"throw",e)}s(void 0)}))}}var d={},v={props:{canvasId:{type:String,default:"echarts"},option:{type:Object,default:function(){return{}}}},watch:{option:function(e,t){console.log("初始化",e),this.initChart(e)}},data:function(){return{ctx:null}},mounted:function(){c.registerPreprocessor((function(e){e&&e.series&&(e.series.length>0?e.series.forEach((function(e){e.progressive=0})):"object"===typeof e.series&&(e.series.progressive=0))}))},methods:{getCanvasAttr2d:function(){var t=this;return new Promise((function(n,r){var s=e.createSelectorQuery().in(t);s.select("#"+t.canvasId).fields({node:!0,size:!0}).exec((function(r){var s=r[0].node;t.canvasNode=s;var o=e.getSystemInfoSync().pixelRatio,i=r[0].width,u=r[0].height;t.ctx=s.getContext("2d");var f=new a.default(t.ctx,t.canvasId,!0,s);c.setCanvasCreator((function(){return f})),n({canvas:f,canvasWidth:i,canvasHeight:u,canvasDpr:o})}))}))},getCanvasAttr:function(){var t=this;return new Promise((function(n,r){t.ctx=e.createCanvasContext(t.canvasId,t);var s=new a.default(t.ctx,t.canvasId,!1);c.setCanvasCreator((function(){return s}));var o=1,i=e.createSelectorQuery().in(t);i.select("#"+t.canvasId).boundingClientRect((function(e){var t=e.width,r=e.height;n({canvas:s,canvasWidth:t,canvasHeight:r,canvasDpr:o})})).exec()}))},initChart:function(e){var t=this;return f(r.default.mark((function n(){var a,s,o,i,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getCanvasAttr2d();case 2:a=n.sent,s=a.canvas,o=a.canvasWidth,i=a.canvasHeight,u=a.canvasDpr,d[t.canvasId]=c.init(s,null,{width:o,height:i,devicePixelRatio:u}),s.setChart(d[t.canvasId]),d[t.canvasId].setOption(e||t.option);case 7:case"end":return n.stop()}}),n)})))()},canvasToTempFilePath:function(t){var n=this,r=e.createSelectorQuery().in(this);r.select("#"+this.canvasId).fields({node:!0,size:!0}).exec((function(r){var a=r[0].node;t.canvas=a,e.canvasToTempFilePath(t,n)}))},touchStart:function(e){if(d[this.canvasId]&&e.touches.length>0){var t=e.touches[0],n=d[this.canvasId].getZr().handler;n.dispatch("mousedown",{zrX:t.x,zrY:t.y}),n.dispatch("mousemove",{zrX:t.x,zrY:t.y}),n.processGesture(l(e),"start")}},touchMove:function(e){if(d[this.canvasId]&&e.touches.length>0){var t=e.touches[0],n=d[this.canvasId].getZr().handler;n.dispatch("mousemove",{zrX:t.x,zrY:t.y}),n.processGesture(l(e),"change")}},touchEnd:function(e){if(d[this.canvasId]){var t=e.changedTouches?e.changedTouches[0]:{},n=d[this.canvasId].getZr().handler;n.dispatch("mouseup",{zrX:t.x,zrY:t.y}),n.dispatch("click",{zrX:t.x,zrY:t.y}),n.processGesture(l(e),"end")}}}};function l(e){for(var t=0;t<e.touches.length;++t){var n=e.touches[t];n.offsetX=n.x,n.offsetY=n.y}return e}t.default=v}).call(this,n(1)["default"])},821:function(e,t,n){"use strict";n.r(t);var r=n(822),a=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=a.a},822:function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/echarts-uniapp/echarts-uniapp.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/echarts-uniapp/echarts-uniapp-create-component',
    {
        'components/echarts-uniapp/echarts-uniapp-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(814))
        })
    },
    [['components/echarts-uniapp/echarts-uniapp-create-component']]
]);
