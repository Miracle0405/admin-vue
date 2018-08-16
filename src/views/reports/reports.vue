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
    return {
    };
  },
  // dom挂载到vue实例上后
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 初始化echarts
      const myCharts = echarts.init(this.$refs.chart);

      const response = await this.$http.get('reports/type/1');
      // console.log(response);
      let option = response.data.data;
      const data = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      };

      option = { ...data, ...option };
      option.xAxis[0].boundaryGap = false;
      myCharts.setOption(option);
    }
  }
};
</script>

<style>

</style>
