<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="注册渠道">
          <el-select v-model="channel" @change="onChannelChange" placeholder="请选择注册渠道">
            <el-option value="all" label="全部"></el-option>
            <el-option v-for="item in channels" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="userType" @change="onUserTypeChange">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="续贷"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="loans" border highlight-current-row v-loading="isLoading" style="width: 100%;">
      <el-table-column
        label="用户">
        <template scope="scope">
          <span style=""><a :href="`/user/${scope.row.us_user.id}`" target="_blank">{{ scope.row.us_user.name }}</a></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="us_user.order_count"
        label="贷款次数"
      ></el-table-column>
      <el-table-column
        prop="serial_number"
        label="编号"
      ></el-table-column>
      <el-table-column label="本金">
        <template scope="scope">
          <span style="">{{ scope.row.principal | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费">
        <template scope="scope">
          <span style="">{{ scope.row.handling_fee | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际借出">
        <template scope="scope">
          <span style="">{{ scope.row.pay_amount | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="period"
        label="周期"
      ></el-table-column>
      <el-table-column label="申请日期">
        <template scope="scope">
          <span style="">{{ scope.row.apply_date | dateFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="us_user.channel"
        label="渠道"
      ></el-table-column>
      <el-table-column width="100" label="操作">
        <template scope="scope">
          <el-button size="small" type="success" @click="gotoCheck(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="onPageChange"
        :page-size="itemPerPage"
        :total="itemCount"
        :current-page="currentPage"
        style="float:right;"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
  import { CHANNEL } from '../common/constants';
  import {
    getRiskControlList,
    handleError,
  } from '../common/services';

  export default {
    data() {
      return {
        currentPage: 1,
        itemCount: 0,
        loans: [],
        itemPerPage: 15,
        isLoading: false,
        channel: '',
        channels: CHANNEL,
        userType: '全部',
        query: {},
      };
    },
    methods: {
      gotoCheck(order) {
        // this.$router.push({ path: `/user/${order.us_user.id}`, query: { tab: 'checkInfo' } });
        window.open(`/user/${order.us_user.id}?tab=checkInfo`, '_blank');
      },
      onChannelChange(channel) {
        this.currentPage = 1;
        this.query.channel = channel;
        this.fetchItems();
      },
      onUserTypeChange(type) {
        this.currentPage = 1;
        if (type === '续贷') {
          this.query.oldUser = 1;
        } else {
          this.query.oldUser = 0;
        }
        this.fetchItems();
      },
      async fetchItems() {
        const offset = (this.currentPage - 1) * this.itemPerPage;

        try {
          this.isLoading = true;
          const { count, data } = await getRiskControlList(offset, this.itemPerPage, this.query);
          this.itemCount = count;
          this.loans = data;
          this.isLoading = false;
        } catch (err) {
          handleError(err, this.$message);
          this.isLoading = false;
        }
      },
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.fetchItems();
      },
    },
    mounted() {
      this.fetchItems();
    },
  };
</script>

<style lang="scss" scoped>

</style>
