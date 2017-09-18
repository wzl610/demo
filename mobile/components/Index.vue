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
            <a @click="login = true;">登录</a>
            <a @click="login = false">注册</a>
        </div>
    </div>
</template>    

<script>
export default {
    data() {
        return {
            login: false,
            username: '',
            password: '',
            rePassword: ''
        }
    },
    methods: {
        submit() {
            if (login) {
                this.login();
            } else {
                this.register();
            }
        }
        login() {

        }
        register() {
            if ()
        }
    }
}

</script>

<style lang="css">
   
</style>