<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
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
      <el-table-column type="expand">
      <!-- 展开行 scope.row当前展开行数据 id roleDesc roleName children-->
        <template slot-scope="scope">
          <!-- 一级权限 -->
          <el-row
            class="elRow"
            v-for="level1 in scope.row.children"
            :key="level1.id">
            <el-col :span="4">
              <!-- 显示一级权限的名称 -->
              <el-tag closable>
                {{ level1.authName}}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row
                v-for="level2 in level1.children"
                :key="level2.id">
                <el-col :span="4">
                  <!-- 显示二级权限的名称 -->
                  <el-tag
                    closable
                    type="success">
                    {{ level2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                    class="level3"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    type="warning"
                    closable>
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 加序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-edit">
          </el-button>
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-delete">
          </el-button>
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-check">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // 获取角色列表数据
      const response = await this.$http.get('roles');
      // console.log(response);
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
.table {
  margin-top: 10px;
  margin-bottom: 10px;
}
.level3 {
  margin-right: 5px;
  margin-bottom: 5px;
}
.elRow {
  margin-bottom: 10px;
}
</style>
