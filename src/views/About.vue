<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    99999999999999999
    <router-view></router-view>

  </div>
</template>

<script>
  // import Home from './Home.vue'
  //
  // export default {
  //   name: 'about',
  //   components: {
  //     Home
  //   }
  // }
</script>

