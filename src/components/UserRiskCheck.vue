<template>
  <section>
    <el-row>
      <p>完成贷款次数: <span class="detail">19</span></p>
      <p>创建时间: <time class="time">{{ createdAt | dateFormatter }}</time></p>
      <p>信用分: <span class="detail">{{ creditScore }}</span></p>
    </el-row>
    <el-row>
      <p>机器建议:</p>
      <el-table
        :data="creditStatus"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="检查项">
        </el-table-column>
        <el-table-column
          prop="value"
          label="结论">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col :offset="8" style="margin-top: 5px">
        <el-button type="success" @click="approve">通过认证</el-button>
        <el-button type="danger" @click="confirmRejectUser">拒绝通过</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import {
    userHasWaitingLoans,
    getUserCreditProfile,
    handleError,
  } from '../common/services';

  export default {
    props: {
      uid: {
        required: true,
      },
    },
    data() {
      return {
        creditScore: '',
        creditStatus: [],
        createdAt: '',
      };
    },
    methods: {
      tableRowClassName(row) {
        if (row.name === 'checkInWhite') {
          return 'danger-row';
        }
        return '';
      },
      async approve() {
        try {
          const hasWaitingLoan = await userHasWaitingLoans({ uid: this.uid });
          if (!hasWaitingLoan) {
            throw new Error('该用户没有待审核订单');
          }
          this.$emit('submitUserCheckResult', { approve: true });
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      confirmRejectUser() {
        this.$prompt('请添加拒绝理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (!value) {
            this.$message({
              type: 'error',
              message: '请填写拒绝理由',
            });
          } else {
            this.$emit('submitUserCheckResult', { approve: false, reason: value });
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '操作已取消',
          });
        });
      },
    },
    mounted() {
      getUserCreditProfile(this.uid, true)
        .then((data) => {
          const creditProfileData = data.shift();
          if (!creditProfileData) {
            return;
          }
          this.creditScore = creditProfileData.credit_score;
          const creditStatus = JSON.parse(creditProfileData.credit_status);
          this.creditStatus = Object.keys(creditStatus).map((elem) => {
            const o = { name: elem, value: creditStatus[elem] };
            return o;
          });
          this.createdAt = creditProfileData.create_time;
        })
        .catch((e) => {
          handleError(e, this.$message);
        });
    },
  };
</script>

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #1D8CE0;
  }
  p {
    font-size: 18px;
  }
  .detail {
    font-weight: bold;
    color: #1D8CE0;
  }
</style>
