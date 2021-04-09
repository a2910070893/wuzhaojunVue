<template>

    <div><h1>这个是测试2</h1>
    <button @click="tt()" width="30px">deng</button>

        <button width="30px" @click="kk()">bu</button>

    </div>
</template>

<script>
    // import Home from './views/Home.vue';
    export default {
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
            // sessionStorage.setItem("userId", 'false');
            //
            // console.log("打印的id为："+sessionStorage.getItem('userId'));
        },
        methods:{
            tt(){
                // sessionStorage.setItem("userId", 'true');
                //
                // console.log("打印的id为："+sessionStorage.getItem('userId'));
                // let redirect=decodeURIComponent(this.$route.query.redirect || '/')
                // this.$router.push({path : redirect})
                let _this=this;

                axios.get('https://wuzhaojun.cn:2443/wuzhaojun-0.0.1-SNAPSHOT/blog/findIdBlog/dfa').then(function (res) {

                    console.log(JSON.stringify(res.data)+"=====================")
                    sessionStorage.setItem("userId", res.data);
                    console.log("="+sessionStorage.getItem('userId'))
                    let redirect=decodeURIComponent(_this.$route.query.redirect || '/')
                    _this.$router.push({path : redirect})
                })
            },
            kk(){
                sessionStorage.setItem("userId", 'false');

                console.log("打印的id为："+sessionStorage.getItem('userId'));
            }

        }

    };
</script>

<style scoped>

</style>