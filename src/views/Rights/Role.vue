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
              <el-tag
                closable
                @close="handleClose(scope.row, level1.id)">
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
                    type="success"
                    @close="handleClose(scope.row, level2.id)">
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
                    closable
                    @close="handleClose(scope.row, level3.id)">
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
            icon="el-icon-check"
            @click="OpenRoleDialogRights(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="RoleDialogVisible"
      width="30%">
      <!-- 树形控件
        :data表示树形绑定的数据-->
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedList">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRights">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      data: [],
      // 绑定分配权限对话框的显示与隐藏
      RoleDialogVisible: false,
      // 树形图绑定的数据
      treeData: [],
      defaultProps: {
        // 设置节点对象上显示的对象
        label: 'authName',
        // 设置数的子节点的属性
        children: 'children'
      },
      // 当前角色id
      currentRoleId: -1,
      // 给数绑定当前角色的权限
      checkedList: []
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
    },
    // 当点击动态编辑标签的关闭按钮时,删除角色指定权限
    async handleClose(role, rightId) {
      // 角色Id role.id
      // 权限Id rightId
      const response1 = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // console.log(response1);
      if (response1.data.meta.status === 200) {
        // 提示删除权限成功
        this.$message.success(response1.data.meta.msg);
        // this.loadData(); 重新调用loadData()用户体验不好 展开行会关闭
        // 所以只需要将当前绑定的数据重新赋值即可
        role.children = response1.data.data;
      } else {
        this.$message.error(response1.data.meta.msg);
      }
    },
    // 当点击分配角色按钮时 获取角色权限列表
    async OpenRoleDialogRights(role) {
      // console.log(role);
      // 清空数组
      this.checkedList = [];

      this.RoleDialogVisible = true;
      const response2 = await this.$http.get(`rights/tree`);
      this.treeData = response2.data.data;
      // 为当前角色id赋值
      this.currentRoleId = role.id;

      // 帮当前角色的Id存储到checkedList中
      role.children.forEach((level1) => {
        level1.children.forEach((level2) => {
          level2.children.forEach((level3) => {
            this.checkedList.push(level3.id);
          });
        });
      });
    },
    // 当点击确定按钮时分配角色
    async handleSetRights() {
      this.RoleDialogVisible = false;
      // 角色id  this.currentRoleId
      // 权限列表id
      // 全选的节点的id
      const checkedList = this.$refs.tree.getCheckedKeys();
      // 半选的节点的id
      const halfCheckedList = this.$refs.tree.getHalfCheckedKeys();

      const arr = [...checkedList, ...halfCheckedList];

      // 发送请求
      const response = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: arr.join(',')
      });
      // console.log(response);
      // 判断是否成功
      // const { meta: { status, msg } } = response.data;
      if (response.data.meta.status === 200) {
        // 提示分配成功信息
        this.$message.success(response.data.meta.msg);
        // 关闭对话框
        this.RoleDialogVisible = false;
        // 重新加载数据
        this.loadData();
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
