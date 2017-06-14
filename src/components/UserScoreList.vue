<template>
  <el-collapse>
    <el-collapse-item v-for="(item, index) in list" :key="item.id" :title="item.created_at | dateFormatter" :name="index">
      <p>评分: {{ item.score }}</p>
      <p>审核: {{ item.auditor }}</p>
      <p>订单号: {{ item.order_serial_num }}</p>
      <p>内容: {{ item.reasons }}</p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import { getUserScoreList, handleError } from '../common/services';

  export default {
    props: {
      uid: {
        required: true,
      },
    },
    data() {
      return {
        list: [],
      };
    },
    mounted() {
      getUserScoreList(this.uid)
        .then((data) => {
          this.list = data;
        })
        .catch((e) => {
          handleError(e, this.$message);
        });
    },
  };
</script>

<style lang="scss" scoped>

</style>
