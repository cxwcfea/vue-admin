<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :rules="rules" :model="queryForm" ref="queryForm">
        <el-col :span="24">
          <el-form-item label="逾期类型">
            <el-select v-model="queryForm.type" @visible-change="onTypeSelectorVisibleChange">
              <el-option v-for="item in overdueTypes" :value="item[0]" :key="item[0]" :label="item[1]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="keyword">
            <el-input v-model="queryForm.keyword" placeholder="姓名/手机/身份证后4位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search" icon="search">查询</el-button>
          </el-form-item>
          <el-date-picker
            v-model="queryForm.date"
            type="daterange"
            align="right"
            placeholder="选择还款日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-form-item>
            <el-button type="primary" v-on:click="searchByDate">确定</el-button>
          </el-form-item>
          <el-button type="success" style="float: right" @click="refresh"><i class="fa fa-refresh"></i></el-button>
        </el-col>
      </el-form>
    </el-col>

    <el-table
      ref="dataTable"
      border
      highlight-current-row
      v-loading="tableMeta.isLoading"
      @row-click="onRowClick"
      @selection-change="onRowSelectionChange"
      :data="tableMeta.data"
      style="width: 100%"
    >
      <el-table-column type="selection" v-if="showAssign"></el-table-column>
      <el-table-column
        v-for="(item, index) in tableMeta.cols"
        :prop="item.prop"
        :label="item.label"
        :key="item.label"
        :formatter="item.filter"
      ></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button-group>
            <!--
            <el-tooltip class="item" effect="dark" content="发送短信" placement="top">
              <el-button type="primary" @click="sendSms(scope.row)"><i class="fa fa-envelope-o"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加记录" placement="top">
              <el-button type="primary" @click="addNote(scope.row)" icon="edit"></el-button>
            </el-tooltip>
            -->
            <el-tooltip class="item" effect="dark" content="查看记录" placement="top">
              <el-button type="primary" @click="viewNote(scope.row)"><i class="fa fa-eye"></i></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-button type="danger" v-on:click="assignOrder()" v-if="showAssign"><i class="fa fa-send"></i>分配订单</el-button>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :page-sizes="[15, 50, 100]"
        :page-size="tableMeta.pageSize"
        :total="tableMeta.total"
        :current-page="tableMeta.currentPage"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <el-dialog title="查看记录" v-model="viewNoteVisible">
      <el-tabs v-model="defaultTabForRecords" type="card">
        <el-tab-pane label="催收记录" name="note">
          <el-table :data="begRecords">
            <el-table-column property="content_type" label="类型" :formatter="begRecordType"></el-table-column>
            <el-table-column property="operator_name" label="操作员"></el-table-column>
            <el-table-column property="created_at" label="添加日期" :formatter="dateFormatter"></el-table-column>
            <el-table-column property="note" label="内容" width="310"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="还款记录" name="repay">
          <el-table :data="repayRecords">
            <el-table-column property="trade_way" label="还款方式" :formatter="paymentType"></el-table-column>
            <el-table-column property="create_time" label="日期" :formatter="dateFormatter"></el-table-column>
            <el-table-column property="amount" label="金额"></el-table-column>
            <el-table-column property="remark" label="备注"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="分配催收订单" v-model="assignFormVisible">
      <el-form :model="assignForm" label-width="120px" style="margin: 0 50px">
        <el-form-item label="请选择催收人员">
          <el-select v-model="assignForm.collector">
            <el-option v-for="item in collectors" :value="item.name" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAssignFormSubmit">确定</el-button>
          <el-button @click="assignFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { OVERDUE_TYPE } from '../common/constants';
  import { dateFormatter, begRecordType, paymentType } from '../common/filter';
  import {
    assignCollectOrders,
    getAllCollectors,
    getBegRecords,
    handleError,
  } from '../common/services';

  let query;
  let currentShowType = -1;

  export default {
    data() {
      return {
        queryForm: {
          keyword: '',
          date: '',
          type: -1,
        },
        rules: {
          keyword: [
            { required: true, message: '请输入查询内容', trigger: 'blur' },
          ],
        },
        overdueTypes: OVERDUE_TYPE,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
                picker.$emit('pick', [start, end]);
              },
            },
          ],
        },
        viewNoteVisible: false,
        begRecords: [],
        repayRecords: [],
        defaultTabForRecords: 'note',
        selectedOrders: [],
        assignFormVisible: false,
        assignForm: {
          collector: '',
        },
        collectors: [],
      };
    },
    computed: {
      ...mapGetters({
        tableMeta: 'overdueOrders',
        loginInfo: 'loginInfo',
      }),
      showAssign() {
        if (this.loginInfo && this.loginInfo.role === 'ADMIN') {
          return true;
        }
        return false;
      },
    },
    methods: {
      ...mapActions([
        'getOverdueOrders',
        'changeOverdueOrdersListSize',
      ]),
      dateFormatter(row, column) {
        return dateFormatter(row[column.property]);
      },
      begRecordType(row, column) {
        return begRecordType(row[column.property]);
      },
      paymentType(row, column) {
        return paymentType(row[column.property]);
      },
      search() {
        this.$refs.queryForm.validate((valid) => {
          if (valid) {
            query = {
              search: this.queryForm.keyword,
              page: 1,
            };
            this.fetchData();
            return true;
          }
          return false;
        });
      },
      searchByDate() {
        const startDate = this.queryForm.date[0];
        const endDate = this.queryForm.date[1];
        query.search = `${this.$moment(startDate).format('YYYY-MM-DD')}/${this.$moment(endDate).format('YYYY-MM-DD')}`;
        query.page = 1;
        this.fetchData();
      },
      assignOrder() {
        if (this.selectedOrders.length === 0) {
          this.$alert('请至少选择一笔订单!', '提示', {
            confirmButtonText: '确定',
          });
        } else {
          this.assignFormVisible = true;
        }
      },
      async viewNote(row) {
        this.viewNoteVisible = true;
        try {
          ({ records: this.begRecords, repayRecords: this.repayRecords } =
            await getBegRecords(row.order_id_fk, row.os_loan_order.us_user.id));
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      refresh() {
        this.queryForm.type = -1;
        query = { page: 1 };
        this.queryForm.keyword = '';
        this.queryForm.date = '';
        this.fetchData();
      },
      fetchData() {
        currentShowType = this.queryForm.type;
        this
          .getOverdueOrders(query)
          .catch((e) => {
            handleError(e, this.$message);
          });
      },
      onRowClick() {

      },
      onRowSelectionChange(val) {
        this.selectedOrders = val;
      },
      async onAssignFormSubmit() {
        if (this.assignForm.collector === '') {
          this.$message({
            showClose: true,
            message: '请选择一位催收人员',
            type: 'warning',
          });
          return;
        }

        const orders = this.selectedOrders.map(elem => elem.id);
        try {
          await assignCollectOrders({ collector: this.assignForm.collector, orders });
          this.$message({
            message: '成功',
          });
          this.selectedOrders.forEach((elem) => {
            elem.collector = this.assignForm.collector;
          });
          this.assignFormVisible = false;
          this.$refs.dataTable.clearSelection();
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      onTypeSelectorVisibleChange(visible) {
        if (visible === false) {
          if (currentShowType !== this.queryForm.type) {
            query.overdue_tag = this.queryForm.type;
            query.page = 1;
            this.fetchData();
          }
        }
      },
      onSizeChange(val) {
        query = {
          page: 1,
          pageSize: val,
          overdue_tag: currentShowType,
        };
        this
          .changeOverdueOrdersListSize(query)
          .catch((e) => {
            handleError(e, this.$message);
          });
      },
      onPageChange(currentPage) {
        query.page = currentPage;
        this.fetchData();
      },
      async getCollectors() {
        try {
          this.collectors = await getAllCollectors();
        } catch (err) {
          console.log('error when get collecots', err);
        }
      },
    },
    created() {
      // first time load the list, get initial data
      if (this.tableMeta.total < 0) {
        this.refresh();
      }
      this.getCollectors();
    },
  };
</script>

<style lang="scss" scoped></style>
