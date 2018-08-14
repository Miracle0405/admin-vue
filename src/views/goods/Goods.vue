<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchRow">
      <el-col :span="24">
        <!-- 实现搜索功能 给表单绑定数据-->
        <el-input placeholder="请输入内容" v-model="searchKey" class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 点击添加时 弹出对话框 实现添加功能-->
        <el-button type="success" plain>添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="400">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="150">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="150">
        <template slot-scope="scope">
          {{ add_time | fmtDate('YYYY-MM-DD') }}
        </template>
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[7, 14, 20, 22]"
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
      // 给搜索框绑定值
      searchKey: '',
      // 给表格绑定数据
      tableData: [],
      pagenum: 1,
      pagesize: 7,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      const response = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchKey}`);
      console.log(response);
      this.tableData = response.data.data.goods;
      this.total = response.data.data.total;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
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
.searchInput {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
