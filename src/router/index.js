import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'
import Test3 from '../views/Test3.vue'
import Blog from '../views/Blog.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    hidden:true
  },{
    path: '/blog',
    name: '博客',
    component: Blog,
    children: [
      {
        path: '/test1',
        name: '测试1',
        component: Test1
      },
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
  },
  {
    path: '/blog',
    name: '测试总',
    component: Blog,
    children:[
      {
        path: '/test2',
        name: '测试2',
        component: Test2
      },
      {
        path: '/test3',
        name: '测试3',
        component: Test3
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
