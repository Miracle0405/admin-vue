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
      @tab-click="handleClick"
      tab-position="left"
      style="margin-top:20px">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 激活的步骤条
      active: 0
    };
  },
  methods: {
    // 点击tab栏时 tab栏的选项卡与上面的步骤条要对应起来
    handleClick(tab, event) {
      // console.log(tab);  index: '1'
      // console.log(event);
      this.active = tab.index - 0;
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
