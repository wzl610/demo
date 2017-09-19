<template>
    <div>
        <form action="#">
            <div>
                <label>
                    用户名: <input type="text" name="username" v-model="username"/> 
                </label>
            </div>
            <div>
                <label>
                    密码: <input type="password" name="password" v-model="password"/> 
                </label>
            </div>
            <div v-show="!login">
                <label>
                    重复新密码: <input type="password" name="rePassword" v-model="rePassword"/> 
                </label>
            </div>
            <a @click="submit">{{ login ? '登录' : '注册' }}</a>
        </form>
        <div style="margin-top:300px;">
            <a @click="login = true;resetForm();">登录</a>
            <a @click="login = false;resetForm();">注册</a>
        </div>
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
                    alert('登录成功!');
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

<style lang="css">
   
</style>