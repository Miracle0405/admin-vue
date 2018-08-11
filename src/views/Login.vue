<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input type="text" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <!-- 组件,有自己的事件机制,用的是vue事件机制实现的keyup事件
        想用DOM中的keyup事件 native是告诉组件,我要使用原生的事件机制
        -->
        <el-input type="password" @keyup.enter.native="handleLogin" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" @click="handleLogin" type="primary">登录</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
// 导入axios
// import axios from 'axios';

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
    handleLogin() {
      this.$http
        .post('login', this.formData)
        .then((response) => {
          // console.log(response);
          if (response.data.meta.status === 200) {
            // 登录成功
            // 记录token
            var token = response.data.data.token;
            sessionStorage.setItem('token', token);
            // 提示信息
            this.$message.success('登录成功');
            // 跳转到后台首页
            this.$router.push('/');
          } else {
            // 登录失败
            this.$message.error(response.data.meta.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/*
scoped 是html5中提供的属性
会给当前页面的所有标签，添加一个data-v-xxx的一个属性作为标识
当前页面的样式只为当前页面的元素服务
*/
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-form .btn {
  width: 100%;
}
</style>
