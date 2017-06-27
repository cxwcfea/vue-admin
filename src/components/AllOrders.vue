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

    <order-list :orders="tableMeta.data" :cols="tableMeta.cols" :isLoading="tableMeta.isLoading"></order-list>

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
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { CHANNEL, ORDER_STATUS } from '../common/constants';
  import { dateFormatter } from '../common/filter';
  import { handleError } from '../common/services';
  import OrderList from './OrderList';

  let query = {
    channel: 'jiaoyouweidai',
    status: 1,
  };

  export default {
    components: {
      orderList: OrderList,
    },
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
