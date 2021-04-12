import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Test2 from '../views/Test2.vue'
import Test3 from '../views/Test3.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    hidden:true,
    redirect:'/blog'
  },{
    path: '/PersonalCenter',
    name: '个人中心',
    component: PersonalCenter,
    children: [
      {
        path: '/blog',
        name: '博客',
        component: Blog
      },
    ],
    redirect:'/blog'
  },
  {
    path: '/navigation',
    name: '测试总',
    component: PersonalCenter,
    children:[
      {
        path: '/test2',
        name: '测试2',
        // meta: {
        //     requireAuth: true
        // },
        component: Test2
      },
      {
        path: '/test3',
        name: '测试3',
          meta: {
              requireAuth: true
          },
        component: Test3
      }
    ]
  }
];



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
