(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-sticky/u-sticky"],{377:function(t,e,n){"use strict";n.r(e);var i=n(378),s=n(380);for(var o in s)"default"!==o&&function(t){n.d(e,t,(function(){return s[t]}))}(o);n(383);var c,r=n(20),u=Object(r["default"])(s["default"],i["render"],i["staticRenderFns"],!1,null,"c187ecf2",null,!1,i["components"],c);u.options.__file="node_modules/uview-ui/components/u-sticky/u-sticky.vue",e["default"]=u.exports},378:function(t,e,n){"use strict";n.r(e);var i=n(379);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},379:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return s})),n.d(e,"staticRenderFns",(function(){return c})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return i}));var s=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.style])),i=t.__get_style([t.stickyContent]);t.$mp.data=Object.assign({},{$root:{s0:n,s1:i}})},o=!1,c=[];s._withStripped=!0},380:function(t,e,n){"use strict";n.r(e);var i=n(381),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},381:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n(9)),s=o(n(382));function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,i,s,o,c){try{var r=t[o](c),u=r.value}catch(d){return void n(d)}r.done?e(u):Promise.resolve(u).then(i,s)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(i,s){var o=t.apply(e,n);function r(t){c(o,i,s,r,u,"next",t)}function u(t){c(o,i,s,r,u,"throw",t)}r(void 0)}))}}var u={name:"u-sticky",mixins:[t.$u.mpMixin,t.$u.mixin,s.default],data:function(){return{cssSticky:!1,stickyTop:0,elId:t.$u.guid(),left:0,width:"auto",height:"auto",fixed:!1}},computed:{style:function(){var e={};return this.disabled?e.position="static":this.cssSticky?(e.position="sticky",e.zIndex=this.uZindex,e.top=t.$u.addUnit(this.stickyTop)):e.height=this.fixed?this.height+"px":"auto",e.backgroundColor=this.bgColor,t.$u.deepMerge(t.$u.addStyle(this.customStyle),e)},stickyContent:function(){var t={};return this.cssSticky||(t.position=this.fixed?"fixed":"static",t.top=this.stickyTop+"px",t.left=this.left+"px",t.width="auto"==this.width?"auto":this.width+"px",t.zIndex=this.uZindex),t},uZindex:function(){return this.zIndex?this.zIndex:t.$u.zIndex.sticky}},mounted:function(){this.init()},methods:{init:function(){this.getStickyTop(),this.checkSupportCssSticky(),this.cssSticky||!this.disabled&&this.initObserveContent()},initObserveContent:function(){var t=this;this.$uGetRect("#"+this.elId).then((function(e){t.height=e.height,t.left=e.left,t.width=e.width,t.$nextTick((function(){t.observeContent()}))}))},observeContent:function(){var e=this;this.disconnectObserver("contentObserver");var n=t.createIntersectionObserver({thresholds:[.95,.98,1]});n.relativeToViewport({top:-this.stickyTop}),n.observe("#".concat(this.elId),(function(t){e.setFixed(t.boundingClientRect.top)})),this.contentObserver=n},setFixed:function(t){var e=t<=this.stickyTop;this.fixed=e},disconnectObserver:function(t){var e=this[t];e&&e.disconnect()},getStickyTop:function(){this.stickyTop=t.$u.getPx(this.offsetTop)+t.$u.getPx(this.customNavHeight)},checkSupportCssSticky:function(){var e=this;return r(i.default.mark((function n(){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"android"===t.$u.os()&&Number(t.$u.sys().system)>8&&(e.cssSticky=!0),n.next=3,e.checkComputedStyle();case 3:e.cssSticky=n.sent,"ios"===t.$u.os()&&(e.cssSticky=!0);case 5:case"end":return n.stop()}}),n)})))()},checkComputedStyle:function(){var e=this;return new Promise((function(n){t.createSelectorQuery().in(e).select(".u-sticky").fields({computedStyle:["position"]}).exec((function(t){n("sticky"===t[0].position)}))}))},checkCssStickyForH5:function(){}},beforeDestroy:function(){this.disconnectObserver("contentObserver")}};e.default=u}).call(this,n(1)["default"])},383:function(t,e,n){"use strict";n.r(e);var i=n(384),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},384:function(t,e,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-ui/components/u-sticky/u-sticky.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-sticky/u-sticky-create-component',
    {
        'node-modules/uview-ui/components/u-sticky/u-sticky-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(377))
        })
    },
    [['node-modules/uview-ui/components/u-sticky/u-sticky-create-component']]
]);
