<template>
  <el-form :model="loginForm" :rules="loginFormRule" ref="loginForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { login } from '../common/auth';
  import { handleError } from '../common/services';

  export default {
    mounted() {
      this.CLEAR_LOGIN_INFO();
    },
    data() {
      return {
        loading: false,
        checked: true,
        loginForm: {
          account: '',
          password: '',
        },
        loginFormRule: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      ...mapMutations([
        'SET_LOGIN_INFO',
        'CLEAR_LOGIN_INFO',
      ]),
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            login({ name: this.loginForm.account, password: this.loginForm.password })
              .then((currentUser) => {
                this.loading = false;
                this.SET_LOGIN_INFO(currentUser);
                this.$message({
                  message: '成功',
                });
                let path = '/dashboard';
                if (this.$route.query.redirect) {
                  path = this.$route.query.redirect;
                }
                this.$router.push({ path });
              })
              .catch((err) => {
                this.loading = false;
                handleError(err, this.$message);
              });
            return true;
          }
          return false;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
