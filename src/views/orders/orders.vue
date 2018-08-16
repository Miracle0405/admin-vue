<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="250">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === '1'">已付款</el-tag>
          <el-tag v-else type="danger">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="150">
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD hh-mm-ss') }}
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
            @click="handleEdit">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 修改订单地址的对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="addOpenDialogFormVisible">
      <el-form
        label-width="100px">
        <el-form-item label="省市区/县">
          <!-- 级联选择器 -->
          <!-- expand-trigger="hover" hover触发子菜单
            @change 绑定的值发生变化时 触发事件
            options 绑定的数据
            v-model 数据双向绑定
            change-on-select 选择即改变 允许用户选择任意级选项
            props 设置下拉框中显示数据源中哪个属性的值-->
            <!-- {{ catIds }} 绑定的选中的id的集合-->
          <el-cascader
            placeholder="请选择"
            clearable
            expand-trigger="hover"
            :options="options"
            change-on-select>
          </el-cascader>
         <!--  <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOpenDialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import City from './city_data2017_element';
export default {
  data() {
    return {
      // 绑定表格的值
      tableData: [],
      // 绑定分页的数据
      pagenum: 1,
      pagesize: 5,
      total: 0,
      addOpenDialogFormVisible: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.goods;
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 当点击编辑按钮时
    handleEdit() {
      this.addOpenDialogFormVisible = true;

      this.options = City;
    }
  }
};
</script>

<style>

</style>
