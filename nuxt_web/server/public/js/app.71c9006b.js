(function(e){function t(t){for(var r,o,c=t[0],u=t[1],i=t[2],l=0,f=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);h&&h(t);while(f.length)f.shift()();return s.push.apply(s,i||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},s=[];function c(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"999da083","chunk-2d0e4a5c":"bb4620bc","chunk-567ab50e":"6982ebaf"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-567ab50e":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-2d0e4a5c":"31d6cfe0","chunk-567ab50e":"eb2df29a"}[e]+".css",a=u.p+r,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var i=s[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){i=f[c],l=i.getAttribute("data-href");if(l===r||l===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||a,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete o[e],h.parentNode.removeChild(h),n(s)},h.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var f=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var h=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var f=0;f<i.length;f++)t(i[f]);var h=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},4805:function(e,t,n){"use strict";var r=n("8ce0"),o=n.n(r);o.a},"4b27":function(e,t,n){n("df7c");e.exports={conf:{aa:!0}}},"56d7":function(e,t,n){"use strict";n.r(t);n("caad"),n("d3b7"),n("2532"),n("96cf"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/home"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")]),e._v(" | "),n("router-link",{attrs:{to:"/ok"}},[e._v("확인")])],1),n("router-view")],1)},a=[],s=(n("034f"),n("2877")),c={},u=Object(s["a"])(c,o,a,!1,null,null,null),i=u.exports,l=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("span",[e._v("vvvv")]),n("div",{staticClass:"movies"},[n("h1",[e._v("영화 목록11")]),n("div",[n("span",[e._v("메시지: "+e._s(e.movies))])])])])},h=[],p={created:function(){var e=this;console.info("------------cccc "),console.info(this.$store.state.accessToken),this.$rest.get("/api/movies").then((function(t){e.movies=t.data}))},data:function(){return{movies:[]}}},v=p,m=Object(s["a"])(v,f,h,!1,null,null,null),d=m.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},g=[],_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._m(0),n("h3",[e._v("Installed CLI Plugins")]),e._m(1),n("h3",[e._v("Essential Links")]),e._m(2),n("h3",[e._v("Ecosystem")]),e._m(3)])},k=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v(" For a guide and recipes on how to configure / customize this project,"),n("br"),e._v(" check out the "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(". ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],T={name:"HelloWorld",props:{msg:String}},y=T,w=(n("4805"),Object(s["a"])(y,_,k,!1,null,"b9167eee",null)),j=w.exports,O={name:"home",components:{HelloWorld:j}},x=O,E=Object(s["a"])(x,b,g,!1,null,null,null),S=E.exports,C=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},$=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("404")])])}],L={},P=Object(s["a"])(L,C,$,!1,null,null,null),A=P.exports;r["a"].use(l["a"]);var N=[{path:"/about2",name:"about2",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/about1",name:"about1",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/home",name:"home",component:d},{path:"/login",name:"auth",component:function(){return n.e("chunk-567ab50e").then(n.bind(null,"a55b"))}},{path:"/home1",name:"a2",component:S},{path:"/ok",name:"ok",component:function(){return n.e("chunk-2d0e4a5c").then(n.bind(null,"90b1"))}},{path:"*",component:A}],G=new l["a"]({base:"/",routes:N}),H=G,I=n("2f62"),B=n("bc3a"),M=n.n(B),U=n("2b27"),W=n.n(U);r["a"].use(I["a"]);var q=!1,z=new I["a"].Store({state:{accessToken:q?localStorage.accessToken:sessionStorage.accessToken,refreshToken:W.a.get("refreshToken")},getters:{isAuthenticated:function(e){return e.accessToken=e.accessToken||localStorage.accessToken,e.accessToken}},mutations:{auth_info:function(e,t){var n=t.accessToken,r=t.refreshToken;e.accessToken=n,W.a.set("accessToken",n),e.refreshToken=r,W.a.set("refreshToken",r),q?(localStorage.accessToken=n,localStorage.refreshToken=r):(sessionStorage.accessToken=n,sessionStorage.refreshToken=r)},LOGIN:function(e,t){var n=t.accessToken;e.accessToken=n,localStorage.accessToken=n},LOGOUT:function(e){e.accessToken=null,delete localStorage.accessToken}},actions:{LOGIN:function(e,t){var n=e.commit,r=t.email,o=t.password;return M.a.post("".concat(resourceHost,"/login"),{email:r,password:o}).then((function(e){var t=e.data;n("LOGIN",t),M.a.defaults.headers.common["Authorization"]="Bearer ".concat(t.accessToken)}))},LOGOUT:function(e){var t=e.commit;M.a.defaults.headers.common["Authorization"]=void 0,t("LOGOUT")}}}),D=n("4b27"),F=n.n(D);r["a"].prototype.$conf=F.a,M.a.interceptors.request.use((function(e){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return t=z.state.accessToken,console.info(t),t&&(e.headers["x-access-token"]=t),n.abrupt("return",e);case 4:case"end":return n.stop()}}))}),(function(e){return Promise.reject(e)}));M.a.interceptors.response.use((function(e){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",e);case 1:case"end":return t.stop()}}))}),(function(e){var t;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:if(t=e.config,console.info(e),console.info(t.url),t.url.includes("/v1/auth/")){n.next=6;break}if(401!==e.response.status){n.next=6;break}return n.abrupt("return",M.a.post("/v1/auth/check",{pass:"aaaa"},{headers:{"x-refresh-token":z.state.refreshToken}}).then((function(e){var n=e.data.auth_info;return z.commit("auth_info",n),M()(t)})).catch((function(e){console.error(e),H.push("/login")})));case 6:return n.abrupt("return",Promise.reject(e));case 7:case"end":return n.stop()}}))}));r["a"].prototype.$rest=M.a,r["a"].config.productionTip=!1,new r["a"]({router:H,store:z,render:function(e){return e(i)}}).$mount("#app")},"85ec":function(e,t,n){},"8ce0":function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.71c9006b.js.map