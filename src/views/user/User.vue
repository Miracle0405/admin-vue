<template>
  <!-- <div>User</div> -->
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="用户管理" level2="用户列表"></my-bread>
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
            inactive-color="#ff4949"
            @change="handleUserStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editAdddialogSearch(scope.row)">
          </el-button>
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)">
          </el-button>
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-check"
            @click="handleJuese(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页
      layout 分页布局
      :total 查询的数据总数

      @size-change 当搜索的条数发生改变是执行handleSizeChange函数
      @current-change当搜索页码数发生改变是执行handleCurrentChange函数

      :current-page="currentPage4" 当前页码数
      :page-size="100" 每页多少条数据

      :page-sizes="[100, 200, 300, 400]" 可以选择的每页多少条
      pager-count 页码按钮的数量，当总页数超过该值时会折叠,大于等于 5 且小于等于 21 的奇数
    -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        :pager-count="9"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="UserAdddialogFormVisible">
      <el-form
        :model="form"
        label-width="100px"
        :rules="rules"
        ref="ruleForm">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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
        <!-- 点击确定时执行handleAdd函数 -->
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editAdddialogFormVisible" @close="handleCancel">
      <el-form
        :model="form"
        label-width="100px"
        :rules="rules"
        ref="editForm">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdddialogFormVisible = false">取 消</el-button>
        <!-- 点击确定时执行handleEdit函数 -->
        <el-button type="primary" @click="handleEdit(form.id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form label-width="100">
        <el-form-item label="当前用户">{{ currentName }}</el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="currentRoleId">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
              v-for="item in juese"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleJueseMake">确 定</el-button>
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
      // 绑定添加用户对话框表单
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 绑定添加用户对话框的显示隐藏
      UserAdddialogFormVisible: false,
      // 每页多少条数据
      pagesize: 2,
      // 当前页码
      pagenum: 1,
      // 总条数
      count: 0,
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'blur' }
        ]
      },
      // 绑定修改用户对话框的显示隐藏
      editAdddialogFormVisible: false,
      // 分配角色的对话框
      dialogFormVisible: false,
      // 当前用户
      currentName: '',
      // 当前用户id
      currentUserId: -1,
      // 分配角色的列表
      juese: [],
      // 角色id
      currentRoleId: -1
    };
  },
  // 页面加载完毕发送请求,获取用户列表数据
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // var token = sessionStorage.getItem('token');
      // // 设置请求头携带token
      // this.$http.defaults.headers.common['Authorization'] = token;

      var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchKey}`);
      // console.log(response);
      // response => { data: { data: { users: [] }, meta: { status: [] } }}
      var { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.count = response.data.data.total;
        this.list = response.data.data.users;
      } else {
        this.$message.error(msg);
      }
    },
    // 搜索功能
    handleSerch() {
      this.loadData();
    },
    // 当分页的  每页多少条数据发生变化时 发送请求
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 当分页的 页码发生变化时发送请求
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 用户添加的功能
    async handleAdd() {
      // 添加的对话框显示
      this.UserAdddialogFormVisible = true;
      // 验证表单规则是否通过
      // console.log(this.$refs['ruleForm']); 获取自定义元素
      this.$refs.ruleForm.validate(async (valid) => {
        // alert(valid);
        // valid === false 验证没通过
        if (!valid) {
          // 验证没通过
          this.$message.error('请输入规范的用户信息');
        }
      });
      // 获取表单数据  发送请求
      var response = await this.$http.post('/users', this.form);
      // console.log(response);
      if (response.data.meta.status === 201) {
        // 提示添加成功
        this.$message.success(response.data.meta.msg);
        // 添加对话框隐藏
        this.UserAdddialogFormVisible = false;
        // 重新加载用户页
        this.loadData();
        // 清空数据
        for (var item in this.form) {
          this.form[item] = '';
        }
      } else {
        // 添加失败
        this.$message.error('添加失败');
      }
    },
    // 当点击编辑按钮时
    async editAdddialogSearch(user) {
      // 显示编辑对话框
      this.editAdddialogFormVisible = true;
      // 发送请求 显示用户当前点击编辑的这条数据
      const response = await this.$http.get(`users/${user.id}`);
      console.log(response.data.data);
      if (response.data.meta.status === 200) {
        this.form = response.data.data;
      }
    },
    // 用户点击编辑对话框的确认按钮时
    async handleEdit(id) {
      // console.log(id);
      // 发送请求
      const response = await this.$http.put(`users/${id}`, this.form);
      if (response.data.meta.status === 200) {
        // 提示修改成功
        this.$message.success(response.data.meta.msg);
        // 重新加载页面
        this.loadData();
        // 编辑用户的对话框隐藏
        this.editAdddialogFormVisible = false;
        // // 清空表单数据
        // for (var item in this.form) {
        //   this.form[item] = '';
        // }
      }
    },
    // 当用户点击编辑对话框的取消按钮时
    handleCancel() {
      // 编辑用户的对话框隐藏
      this.editAdddialogFormVisible = false;
      // 清空表单内容
      for (var item in this.form) {
        this.form[item] = '';
      }
    },
    // 当用户点击编辑对话框的X按钮时
    // 当用户点击删除按钮时
    async handleDelete(user) {
      this.$confirm('确认要删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await this.$http.delete(`users/${user.id}`);
        // console.log(response);
        if (response.data.meta.status === 200) {
          // 判断当前页数据是不是只有一条 并且 不是第一页
          if (this.list.length === 1 && this.pagenum !== 1) {
            // 如果是 就pagenum--
            this.pagenum--;
            this.loadData();
          }

          // 提示删除成功
          this.$message.success(response.data.meta.msg);
          this.loadData();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // console.log(user);
    },
    // 当开关点击时 修改用户状态
    async handleUserStatus(user) {
      // console.log(user);
      const response = await this.$http.put(`users/${user.id}/state/${user.status}`);
      console.log(response);
      if (response.data.meta.status === 200) {
        // 提示修改状态成功
        this.$message.success(response.data.meta.msg);
      }
    },
    // 当用户点击角色分配时
    async handleJuese(user) {
      this.dialogFormVisible = true;
      // console.log(user);
      this.currentName = user.username;
      // 请求角色列表
      this.currentUserId = user.id;
      // console.log(user.id);

      // 显示角色列表（下拉框）
      const response = await this.$http.get('/roles');
      // 获取成功
      this.juese = response.data.data;
      console.log(response);

      // 角色id
      // 根据id查询用户信息
      const rolResponse = await this.$http.get(`users/${user.id}`);
      // console.log(rolResponse);
      this.currentRoleId = rolResponse.data.data.rid;
    },
    // 当用户点击分配角色确定按钮时
    async handleJueseMake() {
      // this.dialogFormVisible = false;
      const response = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      });
      console.log(response);
      if (response.data.meta.status === 200) {
        // 提示分配成功
        this.$message.success(response.data.meta.msg);
        // 关闭分配角色对话框
        this.dialogFormVisible = false;
      } else {
        this.$message.error(response.data.meta.msg);
      }
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
