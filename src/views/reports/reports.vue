<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <!-- eaharts 报表 -->

    <!-- 要求有宽高的容器 -->
    <div ref="chart" style="width: 800px; height: 600px; margin-top: 20px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {

  },
  // dom挂载到vue实例上后
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化echarts
      const myCharts = echarts.init(this.$refs.chart);
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
      myCharts.setOption(option);
    }
  }
};
</script>

<style>

</style>
