<template>
    <div>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
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
                    <el-button @click="shareBlog(scope.row)" type="text" size="small">{{scope.row.blogShareText}}</el-button>
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
<!--                <el-input-->
<!--                        type="textarea"-->
<!--                        :autosize="{ minRows: 2, maxRows: 4}"-->
<!--                        placeholder="请输入内容"-->
<!--                        v-model="form.blogContent">-->
<!--                </el-input>-->
                <mavon-editor  :ishljs="true" ref="md" v-model="form.blogContent"  :toolbars="toolbars"/>
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

<!--            <div  v-html="form.blogContent"></div>-->
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
const userNameText = sessionStorage.getItem('userNameText');
import 'github-markdown-css'
    export default {
        inject:['reload'],
        toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: false, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true // 预览
        },
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
                    blogUpdateTime: '',
                    blogShare:'',
                    blogShareText:'',
                    blogUser:userNameText
                }],
                url:'http://localhost:8080/wuzhaojun/',
                // url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
                drawer: false,
                direction: 'ttb',
                userNameText:userNameText,
                total:null
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
                    axios.delete(this.url+'blog/deleteBlog/'+row.blogId).then(function (res) {
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
            },
            //分享
            shareBlog(row){
                let _this= this;

                this.$confirm('是否<'+row.blogShareText+'>这篇博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    if (row.blogShare === '1') {
                        row.blogShare = '0'
                    }else {
                        row.blogShare = '1'
                    }
                    axios.get(this.url+'blog/shareBlog/'+row.blogId+'/'+row.blogShare).then(function (res) {
                        _this.reload();
                    })
                    this.$message({
                        type: 'success',
                        message: '<'+row.blogShareText+'>成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消<'+row.blogShareText+'>'
                    });
                });
            },
            page(currentPage ){
                const _this= this;
                axios.get(this.url+'blog/findAllBlog'+'/'+userNameText+'/'+currentPage).then(function (res) {
                    console.log(JSON.stringify(res)+"----------99")
                    _this.tableData = res.data.blogEntities;
                    _this.total = JSON.parse(res.data.total)
                    // alert(_this.total)
                    // window.location.reload();
                    //  console.log( _this.total)
                })
            }
        },
        //查询全部内容
        created(){

            // this.$store.commit('setUserId','wuzhaojun');
            // sessionStorage.setItem("userId", 'false');
            // console.log("打印的id为："+sessionStorage.getItem('userId'));
            console.log("======dddddddddddddd===========",userNameText)
            let _this= this;
            axios.get(this.url+'blog/findAllBlog'+'/'+userNameText+'/1').then(function (res) {
                console.log("=================",_this.userNameText)
                _this.tableData = res.data.blogEntities;
                _this.total = JSON.parse(res.data.total)
                // window.location.reload();
                // console.log( _this.tableData)
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.el-drawer__body
  {
    overflow: auto;
}
</style>