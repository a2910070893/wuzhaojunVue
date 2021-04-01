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
            <el-table-column
                    prop="blogContent"
                    label="博客内容"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="blogTitle"
                    label="博客标题"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="blogCode"
                    label="博客code"
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
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>




<!--        隐藏的表单标签-->
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

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
    </div>

</template>

<script>
    // import Home from './views/Home.vue';
    // export default {
    //     name:'test1',
    //     components: {
    //         Home
    //     }
    // };
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
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
                }]
            };
        },
        methods:{
            test(){
                this.dialogFormVisible = false
                console.log(this.form)
            },
        },
        created(){
            let _this= this;
            axios.get('http://localhost:8080/wuzhaojun/blog/findAllBlog').then(function (res) {
                _this.tableData = res.data;
                console.log( _this.tableData)
            })
        }
    }
</script>

<style scoped>

</style>