<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 表格 -->
    <el-table
      :data="data"
      style="width: 100%"
      class="table">
      <!-- 加序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <template  slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      // 请求全新列表参数
      type: 'list'
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // 发送权限列表的请求
      const response = await this.$http.get(`rights/${this.type}`);
      console.log(response);
      if (response.data.meta.status === 200) {
        this.data = response.data.data;
      } else {
        this.$message.error(response.data.meta.msg);
      }
    }
  }
};
</script>

<style>
.card {
  overflow: hidden;
}
.table {
  /*overflow: hidden;*/
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
