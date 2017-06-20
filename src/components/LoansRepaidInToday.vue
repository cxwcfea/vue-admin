<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="类型">
          <el-radio-group v-model="loanType" @change="onLoanTypeChange">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="逾期还款"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="loans" border highlight-current-row v-loading="isLoading" style="width: 100%;">
      <el-table-column
        prop="order_id_fk"
        label="订单号"
      ></el-table-column>
      <el-table-column label="本金">
        <template scope="scope">
          <span style="">{{ scope.row.principal | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款金额">
        <template scope="scope">
          <span style="">{{ scope.row.repaid_amount | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="period"
        label="周期"
      ></el-table-column>
      <el-table-column width="180" label="应还日期">
        <template scope="scope">
          <span style="">{{ scope.row.repay_date | dateFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" label="还款日期">
        <template scope="scope">
          <span style="">{{ scope.row.repaid_date | dateFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逾期">
        <template scope="scope">
          <span style="">{{ scope.row.overdue_tag | loanOverdueTag }}</span>
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
  import {
    getSubLoanList,
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
        loanType: '全部',
        query: { todayPaid: true },
      };
    },
    methods: {
      onLoanTypeChange(status) {
        this.currentPage = 1;
        if (status === '逾期还款') {
          this.query.overDue = 1;
        } else {
          delete this.query.overDue;
        }
        this.fetchItems();
      },
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.fetchLoan();
      },
      async fetchItems() {
        const offset = (this.currentPage - 1) * this.itemPerPage;

        try {
          this.isLoading = true;
          const { count, data } = await getSubLoanList(offset, this.itemPerPage, this.query);
          this.itemCount = count;
          this.loans = data;
          this.isLoading = false;
        } catch (err) {
          handleError(err, this.$message);
          this.isLoading = false;
        }
      },
    },
    created() {
      this.fetchItems();
    },
  };
</script>

<style lang="scss" scoped>

</style>
