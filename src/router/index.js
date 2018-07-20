import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['@/pages/Login'],resolve)
const index = resolve => require(['@/pages/index'],resolve)

const MySysMan = resolve => require(["@/pages/MySysMan/index"])

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: "login"
    },
    {
      path: '/',
      component: index,
      name: 'index',
      children: [
        { path: 'MySysMan', component: MySysMan }
      ]
    }
  ]
})
