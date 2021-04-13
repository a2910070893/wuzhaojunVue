import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;


router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    console.log("--------cc")
    var id=window.sessionStorage.getItem('userId');
    console.log(id)
    if (id==="true") { // 查询本地存储信息是否已经登陆

      next();
    } else {
      console.log("================================")
      next({
        // path: '/test2', // 未登录则跳转至login页面
        // //redirect:  '/test1' // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
        path:'/login',
         query:{redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')


//
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//     if (!window.sessionStorage.tokenId) {
//       router.push({name: 'login'})
//     }
//   }
//   next()
//
// })
