// <!-- Copyright (c) 2018 by coollsk. All Rights Reserved. -->
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由组件
import router from './router'
// ui
import iView from 'iview'
// store/
import Vuex from "vuex"
// http数据请求
// import Axios from 'axios'
// import VueAxios from "vue-axios"
// import VueResource from "vue-resource"
import Public from "@/Store/Public"
// ui js框架
import ElementUI from "element-ui"

// es6兼容
import "babel-polyfill"
// 密码加密系统
import md5 from 'js-md5';


// 公用组件Store
import store from "@/Store"
/**
 * ui样式
 */
import "element-ui/lib/theme-chalk/index.css"

import { getToken } from "./Store/auth"

router.beforeEach((to, from, next) => {
  // 拦截token 是否拥有
  if (!getToken()) { 

    
    if (to.path == '/Login') {
      next()
    } else {
      next({path: '/Login'}) 
    }
  } else {
    // // 如果是登录页面，重载路由到首页

    
  }
  next()
  
})

// 样式初始化
// import "@/static/reset.css"
// Vue.use(VueAxios, Axios)
// 如果有功能失效  请检查iview 功能是否重叠
Vue.use(iView);
Vue.use(Vuex);
// Vue.use(VueResource);
// Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(Public);
// Vue.use(myUpload);

Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;
// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateJSON = true;
// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// };
// 注册一个全局自定义指令 `v-focus`
var focus = Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
