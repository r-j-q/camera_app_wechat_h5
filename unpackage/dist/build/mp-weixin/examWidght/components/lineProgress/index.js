(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["examWidght/components/lineProgress/index"],{"0276":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:["currentIndex","total"],data:function(){return{percentage:0}},watch:{currentIndex:function(e,n){this.percentage=getApp().percentageLineProgress(e+1,this.total)}},methods:{}};n.default=r},"6c6c":function(e,n,t){},"74f8":function(e,n,t){"use strict";var r=t("6c6c"),u=t.n(r);u.a},a791:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return r}));var r={uLineProgress:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-line-progress/u-line-progress")]).then(t.bind(null,"4cd3"))}},u=function(){var e=this,n=e.$createElement;e._self._c},c=[]},c08e:function(e,n,t){"use strict";t.r(n);var r=t("a791"),u=t("f84e");for(var c in u)"default"!==c&&function(e){t.d(n,e,(function(){return u[e]}))}(c);t("74f8");var o,i=t("f0c5"),a=Object(i["a"])(u["default"],r["b"],r["c"],!1,null,"2055c424",null,!1,r["a"],o);n["default"]=a.exports},f84e:function(e,n,t){"use strict";t.r(n);var r=t("0276"),u=t.n(r);for(var c in r)"default"!==c&&function(e){t.d(n,e,(function(){return r[e]}))}(c);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'examWidght/components/lineProgress/index-create-component',
    {
        'examWidght/components/lineProgress/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c08e"))
        })
    },
    [['examWidght/components/lineProgress/index-create-component']]
]);
