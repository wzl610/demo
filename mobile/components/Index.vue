<template>
    <div>
        <form action="#">
            <div>
                <label>
                    <input type="text" name="username" v-model="username" placeholder="登录"/> 
                </label>
            </div>
            <div>
                <label>
                    <input type="password" name="password" v-model="password" placeholder="密码"/> 
                </label>
            </div>
            <div v-show="!login">
                <label>
                    <input type="password" name="rePassword" v-model="rePassword" placeholder="重复密码"/> 
                </label>
            </div>
            <a class="btn" @click="submit">{{ login ? '立即登录' : '立即注册' }}</a>
            <div class="link-wrap">
                <a v-if="!login" @click="login = true;resetForm();">已有账号?登录</a>
                <a v-else @click="login = false;resetForm();">暂无账号？注册</a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('http://localhost:8360/personal/index/index',{
    
        }).then(response => {
            if (!response.data.errno) {
                location.href = '/#/chat'
            }
        }).catch(e => {
            console.log(e);
        })
    },
    data() {
        return {
            login: true,
            username: '',
            password: '',
            rePassword: ''
        }
    },
    methods: {
        submit() {
            if (this.login) {
                this.loginFn();
            } else {
                this.register();
            }
        },
        loginFn() {
            this.$axios.post('http://localhost:8360/personal/index/login',{
                'username': this.username,
                'password': this.password
            }).then(response => {
                if (response.data.errno) {
                    alert('用户名或者密码错误!');
                } else {
                    location.href = '/#/chat'
                }
            }).catch(e => {
                console.log(e);
            })
        },
        register() {
            if (this.username == '' || this.password == '') {
                alert('请填写资料');
                return;
            }
            if (this.password !== this.rePassword) {
                alert('两次密码输入不一致');
                return;
            }
            this.$axios.post('http://localhost:8360/personal/index/register',{
                'username': this.username,
                'password': this.password
            }).then(response => {
                if (response.data.errno != 1001) {
                    alert('注册成功！');
                } else {
                    alert('用户名已存在!');
                }
            }).catch(e => {
                console.log(e);
            })
        },
        resetForm() {
            this.username = '';
            this.password = '';
            this.rePassword = '';
        }
    }
}

</script>

<style scoped>
   body{
       background: linear-gradient(to  bottom right, #6dcab5, #3879c9);
    }
    form{
        text-align:center;
        position: absolute;
        top: 8.0267rem;
        width: 100%;
    }
   input{
       border: 1px solid #a4e3ff;
       background-color: transparent;
       color: #baf0fa;
       height: 1.2667rem;
       border-radius: 1.2667rem;
       text-indent: 0.5733rem;
       line-height: 1.2667rem;
       margin-bottom: 0.48rem;
   }
   input::placeholder{
       color: #baf0fa;
   }
   form .btn{
       display: inline-block;
       width: 7.7333rem;
       height: 1.2267rem;
       line-height: 1.2267rem;
       text-align: center;
       background-color: #56b4f4;
       color: #fff;
       border-radius: 1.2267rem;
   }
   .link-wrap{
       width:100%;
       margin-top: 0.2667rem;
       text-align: center;
   }
   .link-wrap a{
       color: #fff;
   }
</style>