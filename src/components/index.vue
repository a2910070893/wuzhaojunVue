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
                   prop="blogAuthor"
                   label="博客作者"
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
                   <el-button @click="blogCollection(scope.row)" type="text" size="small">
                       {{scope.row.blogCodeText}}
                   </el-button>

               </template>
           </el-table-column>
       </el-table>
       <!--分页查询-->
       <el-pagination
               background
               layout="prev, pager, next"
               page-size="5"
               :total="total"
               @current-change="page"
               >
       </el-pagination>

       <!--   @current-change     抽屉展示内容-->
       <el-drawer
               :title="form.blogTitle"
               :visible.sync="drawer"
               :direction="direction"
               size=80%>

           <mavon-editor
                   class="md"
                   :value="form.blogContent"
                   codeStyle="androidstudio"
                   :subfield = "false"
                   :defaultOpen = "'preview'"
                   :toolbarsFlag = "false"
                   :editable="false"
                   :scrollStyle="true"
                   :ishljs = "true"/>
       </el-drawer>
   </div>
</template>

<script>
import 'github-markdown-css'

const userNameText = sessionStorage.getItem('userNameText');
    export default {
        inject:['reload'],
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
                    blogUser:'',
                    blogCode:'',
                    blogCodeText:''
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
                total:null
            }
        },
        created() {
            const _this= this;
            axios.get(this.url+'blog/shareAllBlog/1/5/'+userNameText).then(function (res) {
                console.log(JSON.stringify(res)+"----------99")
                _this.tableData = res.data.blogEntities;
                 _this.total = JSON.parse(res.data.total)
                  // alert(_this.total)
                 //window.location.reload();
                 //console.log( _this.total)
            })
             // console.log(JSON.stringify(_this.tableData)+"--------------jj")
             //  alert(JSON.parse(this.total))
        },
        methods:{
            //查询博客内容(待优化后端要进行判断是否为分享在展示)
            findIdBlog(row){
                this.drawer = true;
                let _this= this;
                axios.get(this.url+'blog/shareIdBlog/'+row.blogId).then(function (res) {
                    _this.form.blogId = res.data.blogId;
                    _this.form.blogTitle = res.data.blogTitle;
                    _this.form.blogContent = res.data.blogContent;
                    console.log("==========="+res.data.blogId)
                })
            },
            page(currentPage ){
                const _this= this;
                axios.get(this.url+'blog/shareAllBlog/'+currentPage+'/5/'+userNameText).then(function (res) {
                    console.log(JSON.stringify(res)+"----------99")
                    _this.tableData = res.data.blogEntities;
                    _this.total = JSON.parse(res.data.total)
                    // alert(_this.total)
                    // window.location.reload();
                    //  console.log( _this.total)
                })
            },
            blogCollection(row) {
                let _this = this;

                if (window.sessionStorage.getItem('userId') === "true") {
                this.$confirm('是否<' + row.blogCodeText + '>这篇博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    if (row.blogCode === '1') {
                        row.blogCode = '0'
                    } else {
                        row.blogCode = '1'
                    }
                    axios.get(this.url + 'blog/blogCollection/' + row.blogCode + '/' + userNameText + '/' + row.blogId).then(function (res) {
                        _this.reload();
                    })
                    this.$message({
                        type: 'success',
                        message: '<' + row.blogCodeText + '>成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消<' + row.blogCodeText + '>'
                    });
                });
            }else {
                    alert("没有登录不可以收藏，请先登录")
                    _this.$router.push({path: "login"})
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.el-drawer__body {
    overflow: auto;
}
</style>