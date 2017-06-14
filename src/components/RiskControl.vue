<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <user-review @submitReview="onReviewSubmit"></user-review>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 22px;">历史记录</span>
        </div>
        <user-score-list :uid="user.id"></user-score-list>
      </el-card>
      <el-card class="box-card" v-if="user.currentOrder && user.currentOrder.status_id_fk === 1210">
        <div slot="header" class="clearfix">
          <span style="line-height: 22px;">风控审核</span>
        </div>
        <user-risk-check :uid="user.id" @submitUserCheckResult="onSubmitUserCheckResult"></user-risk-check>
      </el-card>
      <el-alert
        style="margin-top: 8px"
        v-else
        title="无风控信息"
        type="error"
        description="用户没有待审核的订单"
        show-icon>
      </el-alert>
    </el-col>
  </el-row>
</template>

<script>
  import { mapActions } from 'vuex';
  import UserReview from './UserReview';
  import UserScoreList from './UserScoreList';
  import UserRiskCheck from './UserRiskCheck';
  import {
    reviewUser,
    checkUser,
    handleError,
  } from '../common/services';

  export default {
    props: {
      user: {
        required: true,
      },
    },
    data() {},
    components: {
      userReview: UserReview,
      userScoreList: UserScoreList,
      userRiskCheck: UserRiskCheck,
    },
    methods: {
      ...mapActions([
        'loadUserOrders',
      ]),
      onReviewSubmit(data) {
        reviewUser({
          mobile: this.user.mobile,
          user_id_fk: this.user.id,
          order_serial_num: this.user.currentOrder.id,
          score: data.score,
          reason: data.reason,
        }).then(() => {
          this.$message({
            type: 'success',
            message: '请求成功',
          });
        }).catch((err) => {
          handleError(err, this.$message);
        });
      },
      onSubmitUserCheckResult(data) {
        const { approve, reason } = data;
        const body = {
          uid: this.user.id,
          mobile: this.user.mobile,
          approve,
          order: this.user.currentOrder.id,
        };
        if (reason) {
          body.reason = reason;
        }
        checkUser(body)
          .then((result) => {
            this.$message({
              type: 'success',
              message: result.msg,
            });
          })
          .catch((err) => {
            handleError(err, this.$message);
          });
      },
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  .box-card {
    margin-top: 8px;
  }
</style>
