<template>
  <div class="about">

    <el-container style="height: 800px; border: 1px solid #eee">

        <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
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
              <el-dropdown-item >
                <!--        隐藏的表单标签-->
                <el-button type="text" @click="dialogFormVisible = true">新增内容</el-button>

              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>


        <el-main width="85%">
          <router-view></router-view>
        </el-main>

      </el-container>

    </el-container>



      <!--      表单标签      -->

      <el-dialog title="博客" :visible.sync="dialogFormVisible">
          <el-form :model="form">
              <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入Id"
                      v-model="form.blogId"
              >
                  <!--              v-if="false"-->
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入标题"
                      v-model="form.blogTitle">
              </el-input>
              <div style="margin: 20px 0;"></div>
              <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="form.blogContent">
              </el-input>
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-itemlabel="活动区域" :label-width="formLabelWidth">
              <el-input v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="insertBlog()">确 定</el-button>
          </div>
      </el-dialog>

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
    inject:['reload'],
    data() {
      // https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/blog/findAllBlog
      return {
        // tableData: Array(20).fill(item),
        dialogFormVisible: false,
        form: {
          blogId: '',
          blogTitle: '',
          blogContent: '',
          delivery: false,
        },
        formLabelWidth: '120px',
          // url:'http://localhost:8080/wuzhaojun',
          url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
      }
    },
    methods:{
      //新增博客
      insertBlog(){
        this.dialogFormVisible = false;

        let _this = this;
        axios.post(this.url+'blog/insertBlog',this.form).then(function (res) {

          if (res.data === true) {
            _this.reload();
          }

        })
      },
    },
  };
</script>
