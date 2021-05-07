<template>
    <div>
        <div style="text-align: center;color: red"><h1>注册界面</h1></div>
        <el-form :model="loginValidateForm" ref="loginValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                    label="账号"
                    prop="userName"
                    :rules="[
                        { required: true, message: '账号不能为空'}
                       ]"
            >

                <el-input type="text" v-model.number="loginValidateForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                    label="密码"
                    prop="password"
                    :rules="[
                        { required: true, message: '密码不能为空'}
                       ]"
            >
                <el-input type="text" v-model.number="loginValidateForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginValidateForm')">注册</el-button>
                <!--                <el-button @click="resetForm('loginValidateForm')">重置</el-button>-->
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                url: 'http://localhost:8080/wuzhaojun/',
                // url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
                loginValidateForm: {
                    userName: '',
                    password:''
                }

            }
        },
        created() {
        },
        methods: {

            submitForm() {
                let _this = this;
                axios.post(this.url + 'user/register', this.loginValidateForm).then(function (res) {


                    console.log(JSON.stringify(res.data) + "+=====================")
                    if (JSON.stringify(res.data) === 'false') {
                        alert('账户已经存在')
                    } else {
                        // let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
                        _this.$router.push({path: "login"})

                        window.location.reload();
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>