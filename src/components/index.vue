<template>
   <div>
       <el-table
               :data="tableData"
               border
               style="width: 100%">
           <el-table-column
                   prop="blogTitle"
                   label="博客标题"
                   width="120">
           </el-table-column>
           <el-table-column
                   prop="blogReleaseTime"
                   label="博客发布时间"
                   width="300">
           </el-table-column>
           <el-table-column
                   prop="blogUpdateTime"
                   label="博客更新时间"
                   width="120">
           </el-table-column>
           <el-table-column
                   fixed
                   prop="blogId"
                   label="博客ID"
                   width="150"
                   v-if="false">
           </el-table-column>
           <el-table-column
                   fixed="right"
                   label="操作"
                   width="200">
               <template slot-scope="scope">
                   <el-button @click="findIdBlog(scope.row)" type="text" size="small">
                       查看
                   </el-button>

               </template>
           </el-table-column>
       </el-table>


       <!--        抽屉展示内容-->
       <el-drawer
               :title="form.blogTitle"
               :visible.sync="drawer"
               :direction="direction"
               size=80%>
           <div class="markdown-body" v-html="form.blogContent"></div>
       </el-drawer>
   </div>
</template>

<script>
// import 'github-markdown-css'
    export default {
        name: "index",
        data() {
            return {
                tableData: [{
                    blogId: '',
                    blogContent: '',
                    blogTitle: '',
                    blogCode: '',
                    blogReleaseTime: '',
                    blogUpdateTime: '',
                    blogShare:'',
                    blogShareText:'',
                }],
                form: {
                    blogId: '',
                    blogTitle: '',
                    blogContent:'',
                    delivery: false,
                },
                // url:'http://localhost:8080/wuzhaojun/',
                url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
                drawer: false,
                direction: 'ttb',
            }
        },
        created() {
            let _this= this;
            axios.get(this.url+'blog/shareAllBlog').then(function (res) {
                _this.tableData = res.data;
                // window.location.reload();
                // console.log( _this.tableData)
            })
        },
        methods:{
            //查询博客内容(待优化后端要进行判断是否为分享在展示)
            findIdBlog(row){
                this.drawer = true;
                let _this= this;
                axios.get(this.url+'blog/shareIdBlog/'+row.blogId).then(function (res) {
                    _this.form.blogId = res.data.blogId;
                    _this.form.blogTitle = res.data.blogTitle;
                    var MardownIt = require("markdown-it")
                    var md = new  MardownIt;
                    var result = md.render(res.data.blogContent)
                    _this.form.blogContent = result;
                    console.log("==========="+res.data.blogId)
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.el-drawer__body {
    overflow: auto;
}
</style>