<template>

    <div><h1>这个是测试2</h1>
    <button @click="login()" width="30px">deng</button>

        <button width="30px" @click="signOut()">bu</button>

    </div>
</template>

<script>
    // import Home from './views/Home.vue';
    export default {
        data(){
            return{
                user:{
                    userName:'wuzhaojun',
                    password:'123456'
                },
                url:'http://localhost:8080/wuzhaojun/',
                // url:'https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/',
            }
        },
        // name:'test2',
        // components: {
        //     Home
        // }

        // methods:{
        //     login(){
        //         this.$store.commit('setUserId',"wuzhaojun");
        //     }
        // }
        created() {
            // window.location.reload();
            // sessionStorage.setItem("userId", 'false');
            //
            // console.log("打印的id为："+sessionStorage.getItem('userId'));
        },
        methods:{
            login(){
                // sessionStorage.setItem("userId", 'true');
                //
                // console.log("打印的id为："+sessionStorage.getItem('userId'));
                // let redirect=decodeURIComponent(this.$route.query.redirect || '/')
                // this.$router.push({path : redirect})
                let _this=this;

                axios.post(this.url+'user/login',this.user).then(function (res) {

                    console.log(JSON.stringify(res.data)+"=====================")
                    sessionStorage.setItem("userId", res.data);
                    console.log("="+sessionStorage.getItem('userId'))
                    let redirect=decodeURIComponent(_this.$route.query.redirect || '/')
                    _this.$router.push({path : redirect})

                    window.location.reload();
                })
            },
            signOut(){

                axios.get(this.url+'user/signOut').then(function (res) {
                    console.log("111==="+JSON.stringify(res.data))
                    sessionStorage.setItem("userId", res.data);
                    console.log("打印的id为："+sessionStorage.getItem('userId'));
                    alert("退出成功")

                    window.location.reload();

                })



            }

        }

    };
</script>

<style scoped>

</style>