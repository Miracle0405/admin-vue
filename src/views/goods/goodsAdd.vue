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
    :active 设置当前激活步骤 0
    -->
    <el-steps :active="0" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
  </el-card>
</template>

<script>

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
