<template>
  <div id="app">
    <div class="line"style="text-align: center">
      <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/personalCenter">个人中心</el-menu-item>
<!--        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        <el-menu-item  style="float: right" @click="login">{{userNameText}}</el-menu-item><!-- @click="login"-->
        <el-menu-item  style="float: right" @click="register">注册</el-menu-item>
      </el-menu>
    </div>

    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Index from './components/index.vue'

const userNameText = sessionStorage.getItem('userNameText');
export default {
  name: 'app',
  components: {
    Index
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true,
      user:{
        userName:'wuzhaojun',
        password:'123456'
      },
      userNameText:userNameText,
      // url:'http://localhost:8080/wuzhaojun/',
      url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',//控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    },
    login(){

      let _this=this;

      console.log("111111111=="+sessionStorage.getItem('userNameText'))
      if (this.userNameText=== '未登录') {

          this.$router.push('/login')
          // sessionStorage.setItem("userId", res.data);
          // sessionStorage.setItem("userNameText",_this.user.userName+'《点击退出》')
          // _this.userNameText=sessionStorage.getItem('userNameText');
          // let redirect=decodeURIComponent(_this.$route.query.redirect || '/')
          // _this.$router.push({path : redirect})
          // window.location.reload();
      // axios.post(this.url+'user/login',this.user).then(function (res) {
      //
      //   console.log(JSON.stringify(res.data)+"=====================")
      //   sessionStorage.setItem("userId", res.data);
      //   sessionStorage.setItem("userNameText",_this.user.userName+'《点击退出》')
      //   _this.userNameText=sessionStorage.getItem('userNameText');
      //   console.log("="+sessionStorage.getItem('userId'))
      //   let redirect=decodeURIComponent(_this.$route.query.redirect || '/')
      //   _this.$router.push({path : redirect})
      //
      //   window.location.reload();
      // })
      }
      else {
        axios.get(this.url+'user/signOut').then(function (res) {
          console.log("111==="+JSON.stringify(res.data))
          sessionStorage.setItem("userId", res.data);
          sessionStorage.setItem("userNameText",'未登录')
          _this.userNameText=sessionStorage.getItem('userNameText');
          console.log("打印的id为："+sessionStorage.getItem('userId'));
          alert("退出成功")

          window.location.reload();

        })
      }
    },
    register(){
        this.$router.push('/register')
    }

  },
  created() {
    console.log(this.userNameText)
    if (this.userNameText === null) {
      this.userNameText = '未登录'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
