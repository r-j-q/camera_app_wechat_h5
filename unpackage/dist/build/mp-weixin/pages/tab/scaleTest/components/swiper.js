(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab/scaleTest/components/swiper"],{"1b46":function(e,n,t){},"1d20":function(e,n,t){"use strict";t.r(n);var u=t("f420"),a=t.n(u);for(var o in u)"default"!==o&&function(e){t.d(n,e,(function(){return u[e]}))}(o);n["default"]=a.a},"66a1":function(e,n,t){"use strict";var u=t("1b46"),a=t.n(u);a.a},"6bf0":function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return u}));var u={uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,"4c81"))}},a=function(){var e=this,n=e.$createElement;e._self._c},o=[]},"6d7c":function(e,n,t){"use strict";t.r(n);var u=t("6bf0"),a=t("1d20");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("66a1");var c,i=t("f0c5"),r=Object(i["a"])(a["default"],u["b"],u["c"],!1,null,"2e1937e4",null,!1,u["a"],c);n["default"]=r.exports},f420:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=t("6df0"),a={props:["swiperList"],data:function(){return{}},methods:{handleClick:function(e){0==e?(this.handleGetSubjectByFlag("20210617000138"),console.log("-2-----")):(console.log("--3----",e),this.handleGetSubjectByFlag("20210617140713"))},handleGetSubjectByFlag:function(n){this.$request.get({url:"".concat(u.subjectInfoGetSubjectByFlag,"/").concat(n),loadingTip:"加载中...",data:{}}).then((function(n){var t=encodeURIComponent(JSON.stringify(n.data[0]));e.navigateTo({url:"/scalePage/beginTest/index?params="+t}),console.log("===1211=======>",n)}))}}};n.default=a}).call(this,t("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/tab/scaleTest/components/swiper-create-component',
    {
        'pages/tab/scaleTest/components/swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6d7c"))
        })
    },
    [['pages/tab/scaleTest/components/swiper-create-component']]
]);
