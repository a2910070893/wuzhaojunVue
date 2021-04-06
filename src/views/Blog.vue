<template>
  <div class="about">

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" router>
          <el-submenu index="1" v-for="(item,index) in this.$router.options.routes"
                      :key="index" v-if="!item.hidden">
            <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
            <el-menu-item :index="children.path" v-for="(children,indexj) in item.children">{{children.name}}{{children.path}}</el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item >

                <!--        隐藏的表单标签-->
                <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

              </el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

      <!--      表单标签      -->
        <el-dialog title="博客" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-input v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="test()">确 定</el-button>
          </div>
        </el-dialog>


        <el-main>
<!--                    <el-table :data="tableData">-->

<!--                      <el-table-column prop="date" label="日期" width="140">-->
<!--                      </el-table-column>-->
<!--                      <el-table-column prop="name" label="姓名" width="120">-->
<!--                      </el-table-column>-->
<!--                      <el-table-column prop="address" label="地址">-->
<!--                      </el-table-column>-->
<!--                    </el-table>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      // const item = {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // };
      return {
        // tableData: Array(20).fill(item),
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          delivery: false,
        },
        formLabelWidth: '120px',
      }
    },
    methods:{
      test(){
        this.dialogFormVisible = false
        console.log(this.form)
      },
    },
  };
</script>
