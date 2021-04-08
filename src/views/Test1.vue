<template>
    <div>hh<h1>这个是测试1</h1>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="blogId"
                    label="博客ID"
                    width="150">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="blogContent"-->
<!--                    label="博客内容"-->
<!--                    width="120">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="blogTitle"
                    label="博客标题"
                    width="120">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="blogCode"-->
<!--                    label="博客code"-->
<!--                    width="120">-->
<!--            </el-table-column>-->
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
                    fixed="right"
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <el-button @click="deleteBlog(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="editIdBlog(scope.row)">
                        编辑
                        <!--        隐藏的表单标签-->
<!--                        <el-button type="text" @click="dialogFormVisible = true">编辑</el-button>-->

                    </el-button>
                    <el-button @click="findIdBlog(scope.row)" type="text" size="small">
                        查看
<!--                        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">-->
<!--                            查看-->
<!--                        </el-button>-->
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


<!--        <el-dialog title="博客" :visible.sync="dialogFormVisible">-->
<!--            <el-form :model="form">-->
<!--                <el-form-item label="博客Id" :label-width="formLabelWidth" v-if="false">-->
<!--                    <el-input v-model="form.blogId" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="博客标题" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.blogTitle" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="updateBlog()">确 定</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->


<!--        博客内容详情-->
        <el-dialog title="博客" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入Id"
                        v-model="form.blogId"
                        v-if="false">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBlog()">确 定</el-button>
            </div>
        </el-dialog>


<!--        抽屉展示内容-->
        <el-drawer
                :title="form.blogTitle"
                :visible.sync="drawer"
                :direction="direction"
                size=80%>
            <span>{{form.blogContent}}</span>
        </el-drawer>

    </div>

</template>

<script>
    export default {
        inject:['reload'],
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    blogId: '',
                    blogTitle: '',
                    blogContent:'',
                    delivery: false,
                },
                formLabelWidth: '120px',

                tableData: [{
                    blogId: '',
                    blogContent: '',
                    blogTitle: '',
                    blogCode: '',
                    blogReleaseTime: '',
                    blogUpdateTime: ''
                }],
                // url:'http://localhost:8080/wuzhaojun',
                url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
                drawer: false,
                direction: 'ttb',
                // userId:''
            };
        },
        methods:{
            //更新博客
            updateBlog(){
                this.dialogFormVisible = false
                let _this = this;
                axios.post(this.url+'blog/updateBlog',this.form).then(function (res) {

                    if (res.data === true) {
                        console.log("=============")
                        axios.get(_this.url+'blog/findAllBlog').then(function (res) {
                            _this.tableData = res.data;
                        })
                    }

                })
                console.log(this.form)
            },
            //查找单条数据显示在隐藏表单上
            editIdBlog(row){
                this.dialogFormVisible = true;
                let _this= this;
                axios.get(this.url+'blog/findIdBlog/'+row.blogId).then(function (res) {
                    _this.form.blogId = res.data.blogId;
                    _this.form.blogTitle = res.data.blogTitle;
                    _this.form.blogContent = res.data.blogContent;
                    console.log(res.data.blogId)
                })
            },
            //删除博客
            deleteBlog(row){
                let _this= this;

                this.$confirm('是否删除这篇博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8080/wuzhaojun/blog/deleteBlog/'+row.blogId).then(function (res) {
                        _this.reload();
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //查询博客内容
            findIdBlog(row){
                this.drawer = true;
                let _this= this;
                axios.get(this.url+'blog/findIdBlog/'+row.blogId).then(function (res) {
                    _this.form.blogId = res.data.blogId;
                    _this.form.blogTitle = res.data.blogTitle;
                    _this.form.blogContent = res.data.blogContent;
                    console.log(res.data.blogId)
                })
            }
        },
        //查询全部内容
        created(){

            // this.$store.commit('setUserId','wuzhaojun');
            // sessionStorage.setItem("userId", 'false');
            // console.log("打印的id为："+sessionStorage.getItem('userId'));

            let _this= this;
            axios.get(this.url+'blog/findAllBlog').then(function (res) {
                _this.tableData = res.data;
                // console.log( _this.tableData)
            })
        }
    }
</script>

<style scoped>

</style>