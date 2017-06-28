<template>
  <section style="margin-top: 5px;">
    <el-table :data="data" border highlight-current-row v-loading="isLoading" style="width: 100%;">
      <el-table-column
        label="贷款单号">
        <template scope="scope">
          <span style=""><a :href="`/loan/${scope.row.order_id_fk}`">{{ scope.row.order_id_fk }}</a></span>
        </template>
      </el-table-column>
      <el-table-column label="用户id">
        <template scope="scope">
          <span style=""><a :href="`/user/${scope.row.user_id_fk}`">{{ scope.row.user_id_fk }}</a></span>
        </template>
      </el-table-column>
      <el-table-column label="输入金额">
        <template scope="scope">
          <span style="">{{ scope.row.pay_amount | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实付金额">
        <template scope="scope">
          <span style="">{{ scope.row.paid_amount | amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template scope="scope">
          <span style="">{{ scope.row.pay_way | paymentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">
          <span style="">{{ scope.row.status | paymentOrderStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column width="180" label="创建日期">
        <template scope="scope">
          <span style="">{{ scope.row.create_time | dateFormatter }}</span>
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
    getRefundOrders,
    handleError,
  } from '../common/services';

  export default {
    data() {
      return {
        currentPage: 1,
        itemCount: 0,
        data: [],
        itemPerPage: 15,
      };
    },
    methods: {
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.fetchItems();
      },
      async fetchItems() {
        const offset = (this.currentPage - 1) * this.itemPerPage;

        try {
          this.isLoading = true;
          const { count, data } = await getRefundOrders(offset, this.itemPerPage);
          this.itemCount = count;
          this.data = data;
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

<style scoped>

</style>
