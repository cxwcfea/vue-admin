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
        <user-score-list :uid="1"></user-score-list>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 22px;">风控审核</span>
        </div>
        <user-risk-check :uid="1" @submitUserCheckResult="onSubmitUserCheckResult"></user-risk-check>
      </el-card>
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
    data() {
      return {
        currentOrder: null,
      };
    },
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
          mobile: '13439695920',
          user_id_fk: 1,
          order_serial_num: this.currentOrder.id,
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
          uid: 1,
          mobile: '13439695920',
          approve,
          order: this.currentOrder.id,
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
    mounted() {
      this
        .loadUserOrders(1)
        .then((data) => {
          this.currentOrder = data[0];
          console.log(this.currentOrder);
          // console.log(this.$store.state.order.userOrders);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  };
</script>

<style lang="scss" scoped>
  .box-card {
    margin-top: 8px;
  }
</style>
