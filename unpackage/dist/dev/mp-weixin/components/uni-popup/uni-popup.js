(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup"],{471:function(n,t,e){"use strict";e.r(t);var o=e(472),i=e(474);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);e(478);var u,s=e(20),c=Object(s["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"7da806a4",null,!1,o["components"],u);c.options.__file="components/uni-popup/uni-popup.vue",t["default"]=c.exports},472:function(n,t,e){"use strict";e.r(t);var o=e(473);e.d(t,"render",(function(){return o["render"]})),e.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(t,"components",(function(){return o["components"]}))},473:function(n,t,e){"use strict";var o;e.r(t),e.d(t,"render",(function(){return i})),e.d(t,"staticRenderFns",(function(){return u})),e.d(t,"recyclableRender",(function(){return r})),e.d(t,"components",(function(){return o}));try{o={uniTransition:function(){return e.e("components/uni-transition/uni-transition").then(e.bind(null,768))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var n=this,t=n.$createElement;n._self._c},r=!1,u=[];i._withStripped=!0},474:function(n,t,e){"use strict";e.r(t);var o=e(475),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=i.a},475:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(e(476));function i(n){return n&&n.__esModule?n:{default:n}}var r=function(){e.e("components/uni-transition/uni-transition").then(function(){return resolve(e(768))}.bind(null,e)).catch(e.oe)},u={name:"UniPopup",components:{uniTransition:r},props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskclick:{type:Boolean,default:!0}},provide:function(){return{popup:this}},mixins:[o.default],watch:{type:{handler:function(n){this[this.config[n]]()},immediate:!0},maskclick:{handler:function(n){this.mkclick=n},immediate:!0}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:"top"}},created:function(){this.animation?this.duration=300:this.duration=0},methods:{clear:function(n){n.stopPropagation()},open:function(){var n=this;n.showPopup=!0,n.$nextTick((function(){new Promise((function(t){clearTimeout(n.timer),n.timer=setTimeout((function(){n.showTrans=!0,n.$nextTick((function(){t()}))}),50)})).then((function(t){clearTimeout(n.msgtimer),n.msgtimer=setTimeout((function(){n.customOpen&&n.customOpen()}),100),n.$emit("change",{show:!0,type:n.type})}))}))},close:function(n){var t=this;t.showTrans=!1,t.$nextTick((function(){t.$emit("change",{show:!1,type:t.type}),clearTimeout(t.timer),t.customOpen&&t.customClose(),t.timer=setTimeout((function(){t.showPopup=!1}),300)}))},onTap:function(){var n=this;n.mkclick&&n.close()},top:function(){var n=this;n.popupstyle="top",n.ani=["slide-top"],n.transClass={position:"fixed",left:0,right:0}},bottom:function(){var n=this;n.popupstyle="bottom",n.ani=["slide-bottom"],n.transClass={position:"fixed",left:0,right:0,bottom:0}},center:function(){var n=this;n.popupstyle="center",n.ani=["zoom-out","fade"],n.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"}}}};t.default=u},478:function(n,t,e){"use strict";e.r(t);var o=e(479),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=i.a},479:function(n,t,e){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-popup/uni-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-create-component',
    {
        'components/uni-popup/uni-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(471))
        })
    },
    [['components/uni-popup/uni-popup-create-component']]
]);