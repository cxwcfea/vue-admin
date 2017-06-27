<template>
  <section class="dashboard-container">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true">
          <el-form-item label="注册渠道">
            <el-select v-model="channel" @change="onChannelChange" placeholder="请选择注册渠道">
              <el-option value="all" label="全部"></el-option>
              <el-option v-for="item in channels" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-date-picker
            v-model="queryDateRange"
            type="daterange"
            align="right"
            placeholder="选择查询日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-form-item>
            <el-button type="primary" v-on:click="onRangeSelected">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="4" v-for="item in showList" :key="item.key">
        <div class="demo-color-box bg-blue-light">
          {{ item.label }}: <span class="num-value">{{ item.value }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin: 15px 0;">
      <el-radio-group v-model="chartName" @change="prepareChartMeta">
        <el-radio-button v-for="item in showList" :label="item.label" :key="item.key"></el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row style="margin: 10px 0;">
      <statistics-chart
        :type="chartType"
        :label="chartName"
        :statistics="showingData"
        :startDay="startDay"
        :endDay="endDay">
      </statistics-chart>
    </el-row>
  </section>
</template>

<script>
  import StatisticsChart from './StatisticsChart';
  import { dateRangePickerOptions } from '../common/utils';
  import { CHANNEL } from '../common/constants';
  import {
    getPlatformStatisticsData,
    handleError,
  } from '../common/services';

  const chartDataMap = {};

  export default {
    components: {
      statisticsChart: StatisticsChart,
    },
    data() {
      return {
        queryDateRange: [],
        pickerOptions: dateRangePickerOptions,
        chartName: '注册数',
        startDay: '',
        endDay: '',
        channels: CHANNEL,
        channel: 'jiaoyouweidai',
        showList: [
          { label: '注册数', key: 1, value: 0, type: 'line' },
          { label: '提交订单数', key: 2, value: 0, type: 'bar' },
          { label: '放款笔数', key: 3, value: 0, type: 'bar' },
          { label: '还款笔数', key: 4, value: 0, type: 'bar' },
          { label: '逾期笔数', key: 5, value: 0, type: 'bar' },
          { label: 'M0<催回笔数', key: 6, value: 0, type: 'line' },
        ],
        chartType: 'line',
        showingData: [],
      };
    },
    methods: {
      onRangeSelected() {
        this.startDay = this.queryDateRange[0];
        this.endDay = this.queryDateRange[1];
        this.prepareStatisticsData();
      },
      onChannelChange() {
        this.prepareStatisticsData();
      },
      async prepareStatisticsData() {
        try {
          const data = await getPlatformStatisticsData(this.channel, this.startDay, this.endDay);
          console.log(data);
          this.showList.forEach((elem) => {
            switch (elem.key) {
              case 1:
                elem.value = data.userData.num;
                chartDataMap[elem.label] = data.userData.data;
                break;
              case 2:
                elem.value = data.orderData.num;
                chartDataMap[elem.label] = data.orderData.data;
                break;
              case 3:
                elem.value = data.payData.num;
                chartDataMap[elem.label] = data.payData.data;
                break;
              case 4:
                elem.value = data.backData.num;
                chartDataMap[elem.label] = data.backData.data;
                break;
              case 5:
                elem.value = data.overdueData.num;
                chartDataMap[elem.label] = data.overdueData.data;
                break;
              case 6:
                elem.value = data.overdueBackData.num;
                chartDataMap[elem.label] = data.overdueBackData.data;
                break;
              default:
                break;
            }
          });
          this.prepareChartMeta();
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      prepareChartMeta() {
        this.showingData = chartDataMap[this.chartName];
        for (let i = 0; i < this.showList.length; i += 1) {
          if (this.showList[i].label === this.chartName) {
            this.chartType = this.showList[i].type;
            break;
          }
        }
      },
    },
    async created() {
      const start = this.$moment().subtract(1, 'months').format('YYYY-MM-DD');
      const end = this.$moment().format('YYYY-MM-DD');
      this.startDay = start;
      this.endDay = end;
      this.queryDateRange = [start, end];
      this.prepareStatisticsData();
    },
  };
</script>

<style lang="scss" scoped="">
  .dashboard-container {
    .bg-blue-light {
      margin-top: 8px;
      background-color: #58b7ff;
    }
    .demo-color-box {
      border-radius: 6px;
      padding: 10px;
      height: 70px;
      line-height: 70px;
      /*box-sizing: border-box;*/
      color: #fff;
      font-size: 14px;
      text-align: center;
      .num-value {
        font-size: 20px;
        font-weight: bold;
        color: lightgoldenrodyellow;
      }
    }
  }
</style>
