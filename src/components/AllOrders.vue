<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :rules="rules" :model="queryForm" ref="queryForm">
        <el-col :span="24">
          <el-form-item label="订单状态">
            <el-select v-model="queryForm.orderStatus" @change="onStatusChange" placeholder="请选择订单状态">
              <el-option :value="1" label="全部"></el-option>
              <el-option v-for="item in allStatus" :value="item[0]" :label="item[1]" :key="item[0]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放款日期">
            <el-col>
              <el-date-picker type="date" placeholder="选择日期" @change="onPaidDateChange" v-model="queryForm.paidDate" :picker-options="dateOptions" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item prop="serialNumber">
            <el-input v-model="queryForm.serialNumber" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="startSearch" icon="search">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户渠道">
            <el-select v-model="queryForm.channel" @change="onChannelChange" placeholder="请选择用户渠道">
              <el-option value="all" label="全部"></el-option>
              <el-option v-for="item in channel" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="还款日期">
            <el-col>
              <el-date-picker type="date" placeholder="选择日期" @change="onRepayDateChange" v-model="queryForm.repayDate" :picker-options="dateOptions" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-radio-group v-model="queryForm.userType" @change="onUserTypeChange">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="续贷"></el-radio-button>
          </el-radio-group>
          <el-button type="success" style="float: right" @click="refresh"><i class="fa fa-refresh"></i></el-button>
        </el-col>
      </el-form>
    </el-col>

    <el-table :data="tableMeta.data" highlight-current-row v-loading="tableMeta.isLoading" @row-click="onRowClick" style="width: 100%;">
      <el-table-column
        v-for="(item, index) in tableMeta.cols"
        :prop="item.prop"
        :label="item.label"
        :key="item.label"
        :formatter="item.filter"
      ></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="danger" @click="triggerRiskCheck(scope.row)" v-if="scope.row.status_id_fk === 1000">触发机审</el-button>
          <el-button size="small" type="success" @click="retryPay(scope.row)" v-if="scope.row.status_id_fk === 3300">重新放款</el-button>
          <el-button size="small" type="primary" @click="manualRepay(scope.row)" v-if="scope.row.status_id_fk === 3200 || scope.row.status_id_fk === 4000">手动还款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="onPageChange"
        :page-size="tableMeta.pageSize"
        :total="tableMeta.total"
        :current-page="tableMeta.currentPage"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <el-dialog title="订单详情" v-model="detailVisible">
      <el-steps :space="80" direction="vertical" :active="loanTransInfo.length">
        <el-step v-for="item in loanTransInfo" :key="item.id" :title="item | orderTransStep" :description="item.create_time | dateFormatter"></el-step>
      </el-steps>
      <br>
      <el-table :data="subLoans">
        <el-table-column prop="order_id_fk" label="订单号"></el-table-column>
        <el-table-column prop="principal" label="本金"></el-table-column>
        <el-table-column prop="period" label="贷款天数"></el-table-column>
        <el-table-column prop="overdue_date" label="应还款日期" :formatter="dateFormatter"></el-table-column>
        <el-table-column prop="repaid_date" label="还款日期" :formatter="dateFormatter"></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="subLoanState"></el-table-column>
        <el-table-column prop="overdueDays" label="逾期"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="处理用户手动还款的订单" v-model="repayFormVisible">
      <h4>订单ID: {{ repayForm.loan.id }} </h4>
      <el-form :model="repayForm" label-width="100px" :rules="rules" style="margin: 0 50px" ref="repayForm">
        <el-form-item label="应还金额(元)" prop="debtAmount">
          <el-input v-model.number="repayForm.debtAmount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="实还金额(元)" prop="repaidAmount">
          <el-input v-model.number="repayForm.repaidAmount"></el-input>
        </el-form-item>
        <el-form-item label="还款方式">
          <el-radio-group v-model="repayForm.payWay">
            <el-radio :label="100">支付宝</el-radio>
            <el-radio :label="101">微信</el-radio>
            <el-radio :label="102">网银转账</el-radio>
            <el-radio :label="103">APP还款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="强制销单">
          <el-switch
            v-model="repayForm.forceOver"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="是"
            off-text="否"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRepayFormSubmit">确定</el-button>
          <el-button @click="repayFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { CHANNEL, ORDER_STATUS } from '../common/constants';
  import { dateFormatter } from '../common/filter';
  import {
    requestRiskCheck,
    getLoanDetail,
    approveToPay,
    getOrderDebt,
    eliminateOrder,
    handleError,
  } from '../common/services';
  import calcOverdueDays from '../common/utils';

  let query = {
    channel: 'jiaoyouweidai',
    status: 1,
  };

  export default {
    data() {
      return {
        queryForm: {
          channel: query.channel || 'all',
          orderStatus: query.status,
          serialNumber: query.search || '',
          userType: query.oldUser ? '续贷' : '全部',
          paidDate: '',
          repayDate: '',
        },
        repayForm: {
          loan: {},
        },
        formLabelWidth: '120px',
        rules: {
          serialNumber: [
            { required: true, message: '请输入订单号', trigger: 'blur' },
          ],
          debtAmount: [
            { required: true, type: 'number', message: '必须输入应还金额', trigger: 'blur' },
          ],
          repaidAmount: [
            { required: true, min: 0, type: 'number', message: '必须输入实还金额', trigger: 'blur' },
          ],
        },
        dateOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        channel: CHANNEL,
        allStatus: ORDER_STATUS,
        detailVisible: false,
        repayFormVisible: false,
        loanTransInfo: [],
        subLoans: [],
      };
    },
    computed: {
      ...mapGetters({
        tableMeta: 'allOrders',
      }),
    },
    methods: {
      ...mapActions([
        'getAllOrders',
      ]),
      dateFormatter(row, column) {
        return dateFormatter(row[column.property]);
      },
      subLoanState(row) {
        return row.status === 0
          ? '进行中'
          : '完结';
      },
      refresh() {
        this.fetchData();
      },
      fetchData() {
        if (query.channel === 'all') {
          delete query.channel;
        }
        if (this.queryForm.userType === '续贷') {
          query.oldUser = 1;
        } else {
          delete query.oldUser;
        }
        this
          .getAllOrders(query)
          .catch((e) => {
            handleError(e, this.$message);
          });
      },
      onPaidDateChange(value) {
        query.dateType = 1;
        query.date = value;
        this.fetchData();
      },
      onRepayDateChange(value) {
        query.dateType = 2;
        query.date = value;
        this.fetchData();
      },
      onUserTypeChange() {
        delete query.date;
        delete query.dateType;
        query.page = 1;
        this.fetchData();
      },
      onStatusChange(status) {
        delete query.date;
        delete query.dateType;
        query.page = 1;
        query.status = status;
        this.fetchData();
      },
      onChannelChange(channel) {
        delete query.date;
        delete query.dateType;
        query.page = 1;
        query.channel = channel;
        this.fetchData();
      },
      onPageChange(currentPage) {
        query.page = currentPage;
        this.fetchData();
      },
      startSearch() {
        this.$refs.queryForm.validate((valid) => {
          if (valid) {
            query = {
              search: this.queryForm.serialNumber,
              page: 1,
            };
            this.fetchData();
            return true;
          }
          return false;
        });
      },
      onRowClick(row, event, column) {
        if (column.property === 'serial_number') {
          this.showLoanDetail(row);
        }
      },
      async showLoanDetail(loan) {
        try {
          ({ loanTrans: this.loanTransInfo, subLoans: this.subLoans } = await getLoanDetail(loan));
          this.subLoans.forEach((elem) => {
            elem.overdueDays = calcOverdueDays(elem);
          });
          this.detailVisible = true;
        } catch (error) {
          handleError(error, this.$message);
        }
      },
      triggerRiskCheck(loan) {
        this.$confirm('人工触发机器审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(
          () => requestRiskCheck(loan),
        ).then(() => {
          this.$message({
            type: 'success',
            message: '请求成功!',
          });
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作',
            });
          } else {
            handleError(err, this.$message);
          }
        });
      },
      retryPay(loan) {
        this.$confirm('确认对该贷款重新放款吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(
          () => approveToPay(loan),
        ).then((data) => {
          this.$message({
            type: 'success',
            message: data.msg,
          });
        }).catch((err) => {
          if (err === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消操作',
            });
          } else {
            handleError(err, this.$message);
          }
        });
      },
      async manualRepay(loan) {
        this.repayForm = {
          debtAmount: null,
          repaidAmount: null,
          payWay: 101,
          forceOver: false,
        };
        this.repayForm.loan = loan;
        this.repayFormVisible = true;
        try {
          this.repayForm.debtAmount = await getOrderDebt(loan);
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      onRepayFormSubmit() {
        this.$refs.repayForm.validate((valid) => {
          if (valid) {
            this.repayFormVisible = false;
            this.repayForm.oid = this.repayForm.loan.id;
            eliminateOrder(this.repayForm)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '请求成功',
                });
              })
              .catch((err) => {
                handleError(err, this.$message);
              });
            return true;
          }
          return false;
        });
      },
    },
    created() {
      // first time load the list, get initial data
      if (this.tableMeta.total < 0) {
        this.refresh();
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
