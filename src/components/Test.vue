<template>
  <el-row>
    <el-col :span="12">
      <my-chart type="cnt" :statistics="features" v-if="features"></my-chart>
    </el-col>
    <el-col :span="12">
      <my-chart type="time" :statistics="features" v-if="features"></my-chart>
    </el-col>
  </el-row>
</template>

<script>
  import Chart from './FeatureChart';
  import {
    handleError,
  } from '../common/services';

  export default {
    data() {
      return {
        features: null,
        type: 'detail',
      };
    },
    components: {
      myChart: Chart,
    },
    async mounted() {
      const uid = 1;
      try {
        const { data } = await this.axios.get(`/api/feature/userFeatures?uid=${uid}`);
        // const userFeatures = this.$_.groupBy(data.data, elem => elem.name.split('_')[0]);
        const callcntAggData = this.$_.fill(Array(6), 0);
        const callcntAggDataOut = this.$_.fill(Array(6), 0);
        const callcntAggDataIn = this.$_.fill(Array(6), 0);
        const calltimeAggData = this.$_.fill(Array(6), 0);
        const calltimeAggDataOut = this.$_.fill(Array(6), 0);
        const calltimeAggDataIn = this.$_.fill(Array(6), 0);
        data.data.forEach((elem) => {
          if (elem.name === 'last1m_callcnt_agg') {
            callcntAggData[5] = elem.value;
          }
          if (elem.name === 'second_m_callcnt_agg') {
            callcntAggData[4] = elem.value;
          }
          if (elem.name === 'third_m_callcnt_agg') {
            callcntAggData[3] = elem.value;
          }
          if (elem.name === 'fourth_m_callcnt_agg') {
            callcntAggData[2] = elem.value;
          }
          if (elem.name === 'fifth_m_callcnt_agg') {
            callcntAggData[1] = elem.value;
          }
          if (elem.name === 'sixth_m_callcnt_agg') {
            callcntAggData[0] = elem.value;
          }
          if (elem.name === 'last1m_callcnt_agg_out') {
            callcntAggDataOut[5] = elem.value;
          }
          if (elem.name === 'second_m_callcnt_agg_out') {
            callcntAggDataOut[4] = elem.value;
          }
          if (elem.name === 'third_m_callcnt_agg_out') {
            callcntAggDataOut[3] = elem.value;
          }
          if (elem.name === 'fourth_m_callcnt_agg_out') {
            callcntAggDataOut[2] = elem.value;
          }
          if (elem.name === 'fifth_m_callcnt_agg_out') {
            callcntAggDataOut[1] = elem.value;
          }
          if (elem.name === 'sixth_m_callcnt_agg_out') {
            callcntAggDataOut[0] = elem.value;
          }
          if (elem.name === 'last1m_callcnt_agg_in') {
            callcntAggDataIn[5] = elem.value;
          }
          if (elem.name === 'second_m_callcnt_agg_in') {
            callcntAggDataIn[4] = elem.value;
          }
          if (elem.name === 'third_m_callcnt_agg_in') {
            callcntAggDataIn[3] = elem.value;
          }
          if (elem.name === 'fourth_m_callcnt_agg_in') {
            callcntAggDataIn[2] = elem.value;
          }
          if (elem.name === 'fifth_m_callcnt_agg_in') {
            callcntAggDataIn[1] = elem.value;
          }
          if (elem.name === 'sixth_m_callcnt_agg_in') {
            callcntAggDataIn[0] = elem.value;
          }
          if (elem.name === 'last1m_calltime_agg') {
            calltimeAggData[5] = elem.value;
          }
          if (elem.name === 'second_m_calltime_agg') {
            calltimeAggData[4] = elem.value;
          }
          if (elem.name === 'third_m_calltime_agg') {
            calltimeAggData[3] = elem.value;
          }
          if (elem.name === 'fourth_m_calltime_agg') {
            calltimeAggData[2] = elem.value;
          }
          if (elem.name === 'fifth_m_calltime_agg') {
            calltimeAggData[1] = elem.value;
          }
          if (elem.name === 'sixth_m_calltime_agg') {
            calltimeAggData[0] = elem.value;
          }
          if (elem.name === 'last1m_calltime_agg_out') {
            calltimeAggDataOut[5] = elem.value;
          }
          if (elem.name === 'second_m_calltime_agg_out') {
            calltimeAggDataOut[4] = elem.value;
          }
          if (elem.name === 'third_m_calltime_agg_out') {
            calltimeAggDataOut[3] = elem.value;
          }
          if (elem.name === 'fourth_m_calltime_agg_out') {
            calltimeAggDataOut[2] = elem.value;
          }
          if (elem.name === 'fifth_m_calltime_agg_out') {
            calltimeAggDataOut[1] = elem.value;
          }
          if (elem.name === 'sixth_m_calltime_agg_out') {
            calltimeAggDataOut[0] = elem.value;
          }
          if (elem.name === 'last1m_calltime_agg_in') {
            calltimeAggDataIn[5] = elem.value;
          }
          if (elem.name === 'second_m_calltime_agg_in') {
            calltimeAggDataIn[4] = elem.value;
          }
          if (elem.name === 'third_m_calltime_agg_in') {
            calltimeAggDataIn[3] = elem.value;
          }
          if (elem.name === 'fourth_m_calltime_agg_in') {
            calltimeAggDataIn[2] = elem.value;
          }
          if (elem.name === 'fifth_m_calltime_agg_in') {
            calltimeAggDataIn[1] = elem.value;
          }
          if (elem.name === 'sixth_m_calltime_agg_in') {
            calltimeAggDataIn[0] = elem.value;
          }
        });
        this.type = 'time';
        this.features = [calltimeAggData, calltimeAggDataIn, calltimeAggDataOut];
//        callcntAggData = [128, 74, 65, 97, 231, 38];
//        callcntAggDataIn = [64, 30, 25, 37, 111, 18];
//        callcntAggDataOut = [64, 44, 40, 60, 120, 20];
      } catch (err) {
        handleError(err, this.$message);
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>
