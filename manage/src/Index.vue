<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-form label-position="right" label-width="80px" :model="formData" ref="loginForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      onLogin() {
        var that = this;
        this.$axios.post('http://localhost:8360/admin/index/login',{
            username: this.formData.username,
            password: this.formData.password
        }).then(response => {
            that.$refs['loginForm'].resetFields();
            if (response.data.errno == 1003) {
              this.$message({
                showClose: true,
                message: '账号密码错误',
                type: 'error'
              });
            } else {
              location.href = '/manage';
            }
        }).catch(e => {
            console.log(e);
        })
      }
    },
    computed: {
      
    }
  }
</script>

<style lang="css" scoped>
  form{
    margin-top: 300px;
  }
</style>