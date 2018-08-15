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
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary">添加动态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              demo
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="商品参数"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain>
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button type="primary">添加静态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="商品参数"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain>
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
      activeName: 'many',
      // 表格绑定的数据
      data: []
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
