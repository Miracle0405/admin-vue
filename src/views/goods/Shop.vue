<template>
  <el-card>
    <!-- 面包屑组件 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="data"
      style="width: 100%"
      border
      stripe>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="300">
      </el-table-column>
      <el-table-column
        label="级别"
        width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="200">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted === false ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      // 绑定分页的页码
      pagenum: 1,
      // 绑定分页的每页几条
      pagesize: 5,
      // 一共有多少条数据
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.data = response.data.data.result;
        // 为总页数赋值
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 当每页条数发生变化时
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    // 当页码数发生变化时
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    }
  }
};
</script>

<style>
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
