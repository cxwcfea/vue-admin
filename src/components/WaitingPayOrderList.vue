<template>
  <section>
    <el-col :span="24" class="toolbar">
    </el-col>

    <el-table :data="loans" border highlight-current-row v-loading="isLoading" style="width: 100%;">
      <el-table-column
        label="用户">
        <template scope="scope">
          <span style=""><a :href="`/user/${scope.row.us_user.id}`" target="_blank">{{ scope.row.us_user.name }}</a></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="serial_number"
        label="编号"
        width="180">
      </el-table-column>
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
      <el-table-column width="150" label="操作">
        <template scope="scope">
          <el-button size="small" type="success" @click="approveToPay(scope.row)">放款</el-button>
          <el-button size="small" type="danger" @click="refuse(scope.row)">拒绝</el-button>
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
    getLoanList,
    approveToPayUser,
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
      };
    },
    methods: {
      async fetchLoan(query) {
        const offset = (this.currentPage - 1) * this.itemPerPage;

        const req = Object.assign({}, query, { status: 3000 });
        try {
          this.isLoading = true;
          const { count, data } = await getLoanList(offset, this.itemPerPage, req);
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
        this.fetchLoan();
      },
      approveToPay(loan) {
        this.$confirm('此操作将立即打款给用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(
          () => approveToPayUser({ oid: loan.id, approve: true }),
        ).then((data) => {
          this.$message({
            type: 'success',
            message: data.msg,
          });
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '操作已取消',
            });
          } else {
            handleError(err, this.$message);
          }
        });
      },
      refuse(loan) {
        this.$prompt('拒绝对该用户放款吗? 可填写拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const data = { oid: loan.id, approve: false };
          if (value) {
            data.reason = value;
          }
          return approveToPayUser(data);
        }).then((data) => {
          this.$message({
            type: 'success',
            message: data.msg,
          });
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '操作已取消',
            });
          } else {
            handleError(err, this.$message);
          }
        });
      },
    },
    mounted() {
      this.fetchLoan();
    },
  };
</script>

<style lang="scss" scoped>

</style>
