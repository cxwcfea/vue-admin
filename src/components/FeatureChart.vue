<template>
  <chart :options="chartOption" auto-resize></chart>
</template>

<script>
  import ECharts from 'vue-echarts';

  const defaultOption = {
    title: {
      text: '通话次数趋势',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['总次数', '主叫', '被叫'],
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['第六月', '第五月', '第四月', '第三月', '第两月', '最近一月'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '总次数',
        type: 'bar',
        data: [],
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
      },
      {
        name: '主叫',
        type: 'bar',
        stack: '主被叫',
        data: [],
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
      },
      {
        name: '被叫',
        type: 'bar',
        stack: '主被叫',
        data: [],
        label: {
          normal: {
            show: true,
            position: 'inside',
          },
        },
      },
    ],
    animationDuration: 1000,
  };
  export default {
    props: ['type', 'statistics'],
    components: {
      chart: ECharts,
    },
    data() {
      return {
        chartOption: {},
      };
    },
    mounted() {
      let option;
      if (this.type === 'cnt') {
        option = Object.assign(defaultOption, {
          title: {
            text: '通话次数趋势',
          },
          legend: {
            data: ['总次数', '主叫', '被叫'],
          },
        });
        option.series[0].name = '总次数';
      } else {
        option = Object.assign(defaultOption, {
          title: {
            text: '通话时长趋势',
          },
          legend: {
            data: ['总时长', '主叫', '被叫'],
          },
        });
        option.series[0].name = '总时长';
      }
      option.series[0].data = this.statistics[0];
      option.series[1].data = this.statistics[1];
      option.series[2].data = this.statistics[2];
      this.chartOption = option;
    },
  };
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    min-width: 0;
    height: 260px;
  }
</style>
