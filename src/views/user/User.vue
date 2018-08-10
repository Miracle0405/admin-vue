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
    <el-dialog title="收货地址" :visible.sync="UserAdddialogFormVisible">
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
      }
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
