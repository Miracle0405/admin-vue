<template>
  <el-card class="row">
    <!-- 面包屑组件 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 添加商品信息 -->
    <el-row :span="24" class="info">
      <el-col>
        <el-alert
          title="消息提示的文案"
          type="info"
          center
          show-icon>
        </el-alert>
      </el-col>
    </el-row>
    <!-- 步骤条
    :active="active" 数值类型 表示已完成步骤
    -->
    <el-steps
      :active="active"
      align-center
      finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 选项卡切换
      @tab-click 点击tab栏时触发
    -->
    <el-tabs
      @tab-click="handleClickTab"
      tab-position="left"
      style="margin-top:20px">
      <el-tab-pane label="基本信息">
        <el-form
          label-position="top"
          label-width="80px"
          :model="form">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 下拉框
            :props 下拉框隐含的值
            :options 数据源
            -->
            {{ selectedOptions2 }}
            <el-cascader
              @change="handleChange"
              clearable
              expand-trigger="hover"
              :props="props"
              :options="options"
              v-model="selectedOptions2">
            </el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 激活的步骤条
      active: 0,
      // 绑定基本信息form表单的数据
      form: {
        // 添加商品的名称
        goods_name: '',
        // 添加商品的价格
        goods_price: '',
        // 商品的重量
        goods_weight: '',
        // 商品的数量
        goods_number: '',
        // 商品的分类
        goods_cat: ''
      },
      // 绑定下拉框的数据源
      options: [],
      // 下拉框的隐含值
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 绑定下拉框选中值
      selectedOptions2: []
    };
  },
  created() {
    this.selectionOption();
  },
  methods: {
    // 点击tab栏时 tab栏的选项卡与上面的步骤条要对应起来
    handleClickTab(tab, event) {
      // console.log(tab);  index: '1'
      // console.log(event);
      this.active = tab.index - 0;
    },
    // 多级下拉选中项变化的时候执行
    handleChange() {
      // 多级下拉只能选中第三项
      if (this.selectedOptions2.length !== 3) {
        // 提示请选择第三级选项
        this.$message.warning('请选择第三级选项');
        // 清空多级下拉框中的内容
        this.selectedOptions2.length = 0;
      }
    },
    // 加载下拉框的选项值
    async selectionOption() {
      const response = await this.$http.get('categories?type=3');
      // console.log(response);
      this.options = response.data.data;
    },
    // 加载商品参数的数据
    async shopParams() {
      // const response = await this.$http.
    }
  }
};
</script>

<style>
.info {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-step__title {
  font-size: 12px;
}
</style>
