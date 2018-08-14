<template>
  <el-card>
    <!-- 面包屑组件 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-button @click="addOpenDialogForm" type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <!-- treegrid 表格的每一个列都改为el-table-tree-column
    treeKey 每一个列的一个标识
    levelKey 自分类相对于父分类有一个缩进
    childKey
    parentKe
    -->
    <el-table
      :data="data"
      style="width: 100%"
      border
      stripe
      v-loading="loading">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="300"
        treeKey="cat_id"
        levelKey="cat_level"
        childKey="children"
        parentKey="cat_pid">
      </el-table-tree-column>
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
    <!-- 添加分类的对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addOpenDialogFormVisible">
      <el-form
        :model="form"
        label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off" placeholder="请选择分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类列表">
          <!-- 级联选择器 -->
          <!-- expand-trigger="hover" hover触发子菜单
            @change 绑定的值发生变化时 触发事件
            options 绑定的数据
            v-model 数据双向绑定
            change-on-select 选择即改变 允许用户选择任意级选项
            props 设置下拉框中显示数据源中哪个属性的值-->
          <el-cascader
            placeholder="默认添加一级分类"
            clearable
            expand-trigger="hover"
            :options="options"
            v-model="catIds"
            :props="defaultProps"
            change-on-select>
          </el-cascader>
         <!--  <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOpenDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOpenDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 加载tree组件-局部组件
import ElTreeGrid from 'element-tree-grid';
export default {
  components: {
    'el-table-tree-column': ElTreeGrid
  },
  data() {
    return {
      data: [],
      // 绑定分页的页码
      pagenum: 1,
      // 绑定分页的每页几条
      pagesize: 5,
      // 一共有多少条数据
      total: 0,
      loading: true,
      // 添加商品分类对话框的显示 隐藏
      addOpenDialogFormVisible: false,
      // 添加商品分类对话框绑定的数据
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      // 绑定多级选择器需要的数据
      options: [],
      defaultProps: {
        // value 下拉框的隐含值
        value: 'cat_id',
        // label 下拉框要显示的值的属性名称
        label: 'cat_name',
        // children  多级下拉
        children: 'children'
      },
      catIds: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      this.loading = true;
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // 加载完数据 转圈消失
      this.loading = false;
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
    },
    // 点击添加商品分类的按钮
    async addOpenDialogForm() {
      // 打开对话框
      this.addOpenDialogFormVisible = true;
      // 获取下拉框中的数据
      const response = await this.$http.get('categories');
      this.options = response.data.data;
      // 请求参数
      // cat_pid 分类父id
      // cat_name 分类名称
      // cat_level 分类层级
      // const response = await this.$http.post('categories');
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
