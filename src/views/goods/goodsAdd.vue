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
    <el-form label-position="top" label-width="80px" v-model="form">
      <el-tabs
        @tab-click="handleClickTab"
        tab-position="left"
        style="margin-top:20px">
        <el-tab-pane label="基本信息">
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
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item
            v-for="item in dynamicParams"
            :label="item.attr_name"
            :key="item.attr_id">
            {{ item.params }}
            <el-checkbox-group v-model="item.params">
              <el-checkbox
              v-for="param in item.params"
              :key="param"
              :label="param"
              border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item
            v-for="item1 in staicParams"
            :key="item1.attr_id"
            :label="item1.attr_name">
            <el-input v-model="item1.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- 上传图片
            action 上传图片的地址 此处必须写上全部地址
            这是用element-ui上传图片的 需要设置请求头token --- 属性headers 对象形式
            :on-success 图片上传成功执行的方法 有三个参数 response file fileList
            :on-remove  图片移除执行的方法 file fileList
          -->
          <el-upload
            :headers="headers"
            action="http://localhost:8888/api/private/v1/upload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      </el-tabs>
    </el-form>
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
      selectedOptions2: [],
      // 动态参数
      dynamicParams: [],
      // 静态参数
      staicParams: [],
      // 设置token
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
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

      // 判断当前点击的tab栏是不是商品参数，商品属性
      if (tab.index === '1' || tab.index === '2') {
        // 判断基本信息中的多级菜单是不是选择了3级分类
        if (this.selectedOptions2.length !== 3) {
          this.$message.warning('请选择第3级分类');
          // 加载商品参数的数据
        } else {
          // 只有选择了第3级分类 才加载动态参数
          // 由于下面需要判断index === 2 时加载静态属性 所以以实参的形式传过去
          this.loadParams(tab.index);
        }
      }
    },
    // 多级下拉选中项变化的时候执行
    handleChange() {
      // 多级下拉只能选中第三项
      if (this.selectedOptions2.length !== 3) {
        // 提示请选择第三级选项
        this.$message.warning('请选择第3级选项');
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
    // 加载动态参数
    async loadParams(index) {
      // 当index === '1' 时动态参数  index === '2' 时静态参数
      const sel = index === '1' ? 'many' : 'only';
      // :id 分类id
      // attr_sel [only,many] only-->静态 many --> 动态
      const response = await this.$http.get(`categories/${this.selectedOptions2[2]}/attributes?sel=${sel}`);
      // console.log(response);
      console.log(sel);
      // 判断如果是动态参数 给动态参数赋值
      if (sel === 'many') {
        // 动态参数
        // 给动态参数赋值
        this.dynamicParams = response.data.data;
        // 由于多选框中的值在 attr_vals:'aa,bb,cc';
        // 需要把attr_vals的值变为数组 挂载到动态参数dynamicParams上
        this.dynamicParams.map((item) => {
          // 给对象添加一个属性
          // 判断attr_vals中是否有值 有值的话以，分隔为数组

          // 动态给属性添加成员 无法做双向绑定
          // item.params = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');

          const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');

          this.$set(item, 'params', arr);
        });
      } else if (sel === 'only') {
        // 给静态参数赋值
        this.staicParams = response.data.data;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
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
