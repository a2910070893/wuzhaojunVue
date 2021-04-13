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
   </div>
</template>

<script>
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
                    blogShareText:''
                }],
                // url:'http://localhost:8080/wuzhaojun/',
                url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
            }
        },
        created() {
            let _this= this;
            axios.get(this.url+'blog/shareAllBlog').then(function (res) {
                _this.tableData = res.data;
                // window.location.reload();
                // console.log( _this.tableData)
            })
        }
    }
</script>

<style scoped>

</style>