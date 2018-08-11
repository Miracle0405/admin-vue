<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <!-- 栅格 -->
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="">
        </el-col>
        <el-col :span="19">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col :span="1" class="logout">
          <a href="#" @click.prevent="loginOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">
        <!-- default-active 可以让某一个menu-item选中,值时menu-item的index值
        unique-opened 是否只保持一个子菜单的展开 默认false
        unique-opened = true 只能一个子菜单展开
        router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
        -->
        <el-menu
          default-active="user"
          unique-opened
          router
          class="aside-menu">
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="roles">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="rights">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="goods">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="params">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="shop">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="dingdan">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="num">
                <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
       </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断是否登录
  beforeCreate() {
    var token = sessionStorage.getItem('token');
    if (!token) {
      // 提示
      this.$message.warning('请先登录');
      // 没有token跳转到登录页
      this.$router.push('/login');
    }
  },
  methods: {
    loginOut() {
      this.$message.success('退出登录成功');
      // 退出登录 清除token
      sessionStorage.clear();
      // 跳转到登录页
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}

.header .title {
  text-align: center;
  color: white;
  font-size: 24px;
  line-height: 60px;
}
.header .logout {
  line-height: 60px;
}
.header .logout a {
  color: #fff;
  text-decoration: none;
}
.aside-menu {
  height: 100%;
}
</style>
