<template>
    <div>hh<h1>这个是测试1</h1>
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
        </el-dialog></div>

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
                formLabelWidth: '120px'
            };
        },
        methods:{
            test(){
                this.dialogFormVisible = false
        console.log(this.form)
        }
        }
    }
</script>

<style scoped>

</style>