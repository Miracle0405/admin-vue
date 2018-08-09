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
        <el-input placeholder="请输入内容" class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- stripe 加斑马线
      border 加带边框
      加序号
    -->
    <el-table
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间"
        width="180">
        <template slot-scope="scope">
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
  </el-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      list: []
    };
  },
  // 页面加载完毕发送请求,获取用户列表数据
  async created() {
    var token = sessionStorage.getItem('token');
    // 设置请求头携带token
    axios.defaults.headers.common['Authorization'] = token;

    var response = await axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
    console.log(response);
    if (response.data.meta.status === 200) {
      this.list = response.data.data.users;
    } else {
      this.$message.error(response.data.meta.msg);
    }
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
