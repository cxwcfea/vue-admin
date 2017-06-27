<template>
  <chart :options="chartOption" auto-resize></chart>
</template>

<script>
  import ECharts from 'vue-echarts';
  import { getDayArray } from '../common/utils';

  function getNewUserRatio(newUserCount, oldUserCount) {
    const ratio = [];
    if (newUserCount.length !== oldUserCount.length) {
      throw new Error('newUserCount and oldUserCount not match');
    }
    for (let i = 0; i < newUserCount.length; i += 1) {
      const totali = newUserCount[i] + oldUserCount[i];
      ratio[i] = (newUserCount[i] / totali) * 100;
      ratio[i] = Math.floor(ratio[i] * 100) / 100;
    }
    return ratio;
  }

  const defaultOption = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      /*
      axisPointer: {
        type: 'shadow',
      },
      */
    },
    legend: {
      right: 20,
      selectedMode: false,
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      /*
      axisTick: {
        alignWithLabel: true,
      },
      */
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
      },
    ],
    series: [],
    animationDuration: 1000,
  };

  export default {
    props: ['type', 'label', 'statistics', 'startDay', 'endDay'],
    components: {
      chart: ECharts,
    },
    data() {
      return {
        chartOption: {},
      };
    },
    watch: {
      statistics() {
        this.prepareChartData();
      },
    },
    methods: {
      prepareChartData() {
        const dayArray = getDayArray(this.startDay, this.endDay);
        defaultOption.xAxis.data = dayArray;

        const dataForTotal = [];
        const dataForOldUser = [];
        const dataForNewUser = [];
        dayArray.forEach((elem) => {
          if (this.statistics.total && (elem in this.statistics.total)) {
            dataForTotal.push(this.statistics.total[elem]);
          } else {
            dataForTotal.push(0);
          }
          if (this.statistics.new && (elem in this.statistics.new)) {
            dataForNewUser.push(this.statistics.new[elem]);
          } else {
            dataForNewUser.push(0);
          }
          if (this.statistics.old && (elem in this.statistics.old)) {
            dataForOldUser.push(this.statistics.old[elem]);
          } else {
            dataForOldUser.push(0);
          }
        });
        const newUserRatio = getNewUserRatio(dataForNewUser, dataForOldUser);

        let option;
        if (this.type === 'line') {
          option = Object.assign(defaultOption, {
            title: {
              text: this.label,
            },
            series: [],
          });
          option.series.push({
            name: '数量',
            type: 'line',
            data: dataForTotal,
          });
        } else {
          option = Object.assign(defaultOption, {
            title: {
              text: this.label,
            },
            legend: Object.assign(defaultOption.legend, {
              data: ['老用户', '新用户', '总数', '新用户占比'],
            }),
            series: [],
          });
          option.yAxis.push({
            type: 'value',
            name: '比例',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %',
            },
          });
          option.series = [
            {
              name: '新用户',
              type: 'bar',
              stack: 'add',
              barWidth: 10,
              data: dataForNewUser,
            },
            {
              name: '老用户',
              type: 'bar',
              stack: 'add',
              barWidth: 10,
              data: dataForOldUser,
            },
            {
              name: '总数',
              type: 'bar',
              barWidth: 0,
              data: dataForTotal,
            },
            {
              name: '新用户占比',
              type: 'line',
              yAxisIndex: 1,
              data: newUserRatio,
            },
          ];
        }

        this.chartOption = option;
      },
    },
    mounted() {
      // this.prepareChartData();
    },
  };
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    min-width: 0;
    height: 380px;
  }
</style>
