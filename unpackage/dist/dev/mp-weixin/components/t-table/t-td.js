(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-td"],{859:function(t,e,n){"use strict";n.r(e);var r=n(860),i=n(862);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n(864);var c,u=n(20),a=Object(u["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);a.options.__file="components/t-table/t-td.vue",e["default"]=a.exports},860:function(t,e,n){"use strict";n.r(e);var r=n(861);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},861:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return c})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=!1,c=[];i._withStripped=!0},862:function(t,e,n){"use strict";n.r(e);var r=n(863),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},863:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"14",color:"#555c60",tdAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.tdAlign=this.align:this.tdAlign=this.tr.align},computed:{tdAlignCpd:function(){var t="";switch(this.tdAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},864:function(t,e,n){"use strict";n.r(e);var r=n(865),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},865:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/t-table/t-td.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-td-create-component',
    {
        'components/t-table/t-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(859))
        })
    },
    [['components/t-table/t-td-create-component']]
]);
