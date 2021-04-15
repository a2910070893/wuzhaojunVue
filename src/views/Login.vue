<template>
    <div>
<!--        <button @click="login()" width="30px">deng</button>-->

<!--        <button width="30px" @click="signOut()">bu</button>-->

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
                <el-button type="primary" @click="submitForm('loginValidateForm')">登录</el-button>
<!--                <el-button @click="resetForm('loginValidateForm')">重置</el-button>-->
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // user: {
                //     userName: 'wuzhaojun',
                //     password: '123456'
                // },
                // url: 'http://localhost:8080/wuzhaojun/',
                url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
                loginValidateForm: {
                    userName: '',
                    password:''
                }

            }
        },
        created() {
        },
        methods: {
            // login() {
            //     let _this = this;
            //
            //     axios.post(this.url + 'user/login', this.user).then(function (res) {
            //
            //         console.log(JSON.stringify(res.data) + "=====================")
            //         sessionStorage.setItem("userId", res.data);
            //         sessionStorage.setItem("userNameText", _this.user.userName)
            //         console.log("=" + sessionStorage.getItem('userId'))
            //         let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
            //         _this.$router.push({path: redirect})
            //
            //         window.location.reload();
            //     })
            // },
            // signOut() {
            //
            //     axios.get(this.url + 'user/signOut').then(function (res) {
            //         console.log("111===" + JSON.stringify(res.data))
            //         sessionStorage.setItem("userId", res.data);
            //         sessionStorage.setItem("userNameText", '未登录')
            //         console.log("打印的id为：" + sessionStorage.getItem('userId'));
            //         alert("退出成功")
            //
            //         window.location.reload();
            //     })
            // },
            submitForm() {
                let _this = this;
                axios.post(this.url + 'user/login', this.loginValidateForm).then(function (res) {


                    console.log(JSON.stringify(res.data) + "=====================")
                    if (JSON.stringify(res.data) === 'false') {
                        alert('账户名或密码错误')
                    } else {
                        console.log(JSON.stringify(res.data) + "=====================")
                        sessionStorage.setItem("userId", res.data);
                        sessionStorage.setItem("userNameText", _this.loginValidateForm.userName+'《点击退出》')
                        console.log("=" + sessionStorage.getItem('userId'))
                        let redirect = decodeURIComponent(_this.$route.query.redirect || '/')
                        _this.$router.push({path: redirect})

                        window.location.reload();
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>