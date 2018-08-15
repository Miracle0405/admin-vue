<template>
  <el-card>
    <!-- 面包屑组件 -->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <!-- 警告框 -->
    <el-alert
      style="margin-top: 20px; margin-bottom: 20px"
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon>
    </el-alert>
    <!-- 下拉框 -->
    <el-row>
      <el-col>
        请选择商品分类:
        <el-cascader
          expand-trigger="hover"
          :options="options"
          :props="{ label: 'attr_name', value: 'attr_id'}"
          v-model="selectedOptions2"
          @change='handleChange'>
        </el-cascader>
      </el-col>
    </el-row>

    <!-- 选项卡切换 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">动态参数</el-tab-pane>
      <el-tab-pane label="静态参数" name="only">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 多级下拉绑定的数据
      options: [],
      selectedOptions2: [],
      // tab绑定的数据
      activeName: 'many'
    };
  },
  created() {

  },
  methods: {
    async loadData() {
      // const response = await this.$http.get()
    },
    // 多级下拉选中内容改变之后
    handleChange() {

    }
  }
};
</script>

<style>

</style>
