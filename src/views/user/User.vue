<template>
  <!-- <div>User</div> -->
  <el-card class="card">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchRow">
      <el-col :span="24">
        <!-- 实现搜索功能 给表单绑定数据-->
        <el-input placeholder="请输入内容" v-model="searchKey" class="searchInput">
          <el-button slot="append" @click="handleSerch" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 点击添加时 弹出对话框 实现添加功能-->
        <el-button type="success" @click="UserAdddialogFormVisible = true" plain>添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 stripe 加斑马线 border 加带边框 加序号-->
    <el-table
      border
      stripe
      :data="list"
      style="width: 100%">
      <!-- 加序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="<18></18>0">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间"
        width="180">
        <template slot-scope="scope">
          <!-- 过滤器只可以在 插值表达式 和 v-bind 中使用 -->
          <!-- {{ scope.row }} 当前这行绑定的数据-->
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="80">
        <template slot-scope="scope">
          <!-- {{ scope.row.mg_state }} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
          plain
          size="mini"
          type="primary" icon="el-icon-edit"></el-button>
          <el-button
          plain
          size="mini"
          type="primary" icon="el-icon-share"></el-button>
          <el-button
          plain
          size="mini"
          type="primary" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="UserAdddialogFormVisible">
      <el-form
        :model="form"
        label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UserAdddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UserAdddialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
      list: [],
      // 绑定搜索框
      searchKey: '',
      // 绑定对话框表单
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 绑定对话框的显示隐藏
      UserAdddialogFormVisible: false
    };
  },
  // 页面加载完毕发送请求,获取用户列表数据
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      var token = sessionStorage.getItem('token');
      // 设置请求头携带token
      this.$http.defaults.headers.common['Authorization'] = token;

      var response = await this.$http.get(`users?pagenum=1&pagesize=10&query=${this.searchKey}`);
      // console.log(response);
      // response => { data: { data: { users: [] }, meta: { status: [] } }}
      var { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.list = response.data.data.users;
      } else {
        this.$message.error(msg);
      }
    },
    // 搜索功能
    handleSerch() {
      this.loadData();
    }
    // 添加功能
    // handleAdd() {

    // }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.searchInput {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
