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
          :props="{ label: 'cat_name', value: 'cat_id'}"
          v-model="selectedOptions2"
          @change='handleChange'>
        </el-cascader>
      </el-col>
    </el-row>

    <!-- 选项卡切换 -->
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" :disabled="this.selectedOptions2.length !== 3">添加动态参数</el-button>
        <el-table
          border
          stripe
          :data="data"
          style="width: 100%">
          <el-table-column
            type="expand">
             <template slot-scope="scope">
              <el-tag
                :key="item"
                v-for="item in scope.row.params"
                closable
                @close="handleClose(item, scope.row)">
                {{ item }}
              </el-tag>
              <!-- 动态编辑标签 -->
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
        <el-button type="primary" :disabled="this.selectedOptions2.length !== 3">添加静态参数</el-button>
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
      data: [],
      // 动态编辑文本框的显示隐藏
      inputVisible: false,
      // 绑定动态文本框的值
      inputValue: ''
    };
  },
  created() {
    this.loadOptions();
  },
  methods: {
    // 加载多级下拉的数据
    async loadOptions() {
      const response = await this.$http.get('categories?type=3');
      console.log(response);
      this.options = response.data.data;
    },
    // 多级下拉选中内容改变之后
    handleChange() {
      this.loadData();
    },
    handleTabClick() {
      this.loadData();
    },
    // 加载表格数据
    async loadData() {
      // this.data.length = 0;
      if (this.selectedOptions2.length === 3) {
        const response = await this.$http.get(`categories/${this.selectedOptions2[2]}/attributes?sel=${this.activeName}`);
        // console.log(response);
        const { meta: { msg, status } } = response.data;

        if (status === 200) {
          this.data = response.data.data;

          if (this.activeName === 'many') {
            this.data.forEach((item) => {
              // 动态给对象添加成员
              const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');

              this.$set(item, 'params', arr);
            });
          }
          // this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      }
    },
    // 点击关闭
    handleClose(tag, param) {
      const index = param.params.findIndex((item) => {
        if (tag === item) {
          return true;
        }
      });
      param.params.splice(index, 1);
      // console.log(param);
    },
    // 点击按钮时显示文本框
    showInput() {
      this.inputVisible = true;
      // 下次dom更新时使文本框获取焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      // 获取文本框的值 发送请求
      let inputValue = this.inputValue;
      if(!inputValue) {
        return;
      }
      row.params.push(inputValue);

      this.inputVisible = false;
      this.inputValue = '';

      // if (inputValue) {
      //   this.dynamicTags.push(inputValue);
      // }
      // this.inputVisible = false;
      // this.inputValue = '';
    }
  }
};
</script>

<style>
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
