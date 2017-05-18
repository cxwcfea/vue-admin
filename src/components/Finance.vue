<template>
  <section>
    <el-row :gutter="8" class="box">
      <el-col :lg="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">保证金余额</span>
            <el-button style="float: right;" type="primary" @click="queryCompanyBalance">查询</el-button>
          </div>
          <div>
            <span class="text">{{ companyBalance }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">平台余额</span>
            <el-button style="float: right;" type="primary" @click="queryBalanceAccount">查询</el-button>
          </div>
          <div>
            <span class="text">{{ balance }}</span>
          </div>
          <div class="bottom clearfix">
            <el-form :inline="true" :model="form1" :rules="rules" ref="form1" class="inputForm">
              <el-form-item required prop="amount">
                <el-input v-model.number="form1.amount" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="银行卡->余额" placement="top">
                  <el-button type="danger" @click="deposit">充值</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="用户还款->余额" placement="top">
                  <el-button type="danger" @click="pay">代付</el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">放贷中间账户</span>
            <el-button style="float: right;" type="primary" @click="queryLoanAccount">查询</el-button>
          </div>
          <div>
            <span class="text">{{ loanBalance }}</span>
          </div>
          <div class="bottom clearfix">
            <el-form :inline="true" :model="form2" :rules="rules" ref="form2" class="inputForm">
              <el-form-item prop="amount">
                <el-input v-model.number="form2.amount" placeholder="请输入金额"></el-input>
              </el-form-item>
              <el-form-item>
                <el-tooltip class="item" effect="dark" content="余额->放贷户" placement="top">
                  <el-button type="danger" @click="collect">代收</el-button>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">还款中间账户</span>
            <el-button style="float: right;" type="primary" @click="queryPayAccount">查询</el-button>
          </div>
          <div>
            <span class="text">{{ payBalance }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import {
    queryCompanyAccount,
    queryCompanyPayAccount,
    queryCompanyLoanAccount,
    queryBalanceAccount,
    companyDeposit,
    companyCollect,
    companyPay,
    handleError,
  } from '../common/services';

  export default {
    data() {
      return {
        companyBalance: '',
        balance: '',
        loanBalance: '',
        payBalance: '',
        form1: {
          amount: '',
        },
        form2: {
          amount: '',
        },
        rules: {
          amount: [
            { required: true, type: 'number', min: 0, message: '请输入金额', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      async queryCompanyBalance() {
        try {
          this.companyBalance = await queryCompanyAccount();
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      async queryBalanceAccount() {
        try {
          this.balance = await queryBalanceAccount('20020');
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      async queryLoanAccount() {
        try {
          this.loanBalance = await queryCompanyLoanAccount();
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      async queryPayAccount() {
        try {
          this.payBalance = await queryCompanyPayAccount();
        } catch (err) {
          handleError(err, this.$message);
        }
      },
      deposit() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            companyDeposit(this.form1.amount)
              .then((url) => {
                window.open(url, '_blank');
              })
              .catch((err) => {
                handleError(err, this.$message);
              });
            return true;
          }

          return false;
        });
      },
      collect() {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            companyCollect(this.form2.amount)
              .then((url) => {
                window.open(url, '_blank');
              })
              .catch((err) => {
                handleError(err, this.$message);
              });
            return true;
          }

          return false;
        });
      },
      pay() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            companyPay(this.form1.amount)
              .then(() => {
                this.$message({
                  message: '成功',
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
  };
</script>

<style lang="scss" scoped>
  .box {
    margin: 10px 0px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin: 10px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .el-form-item {
    margin-top: 10px;
    margin-bottom: 0;
  }
  .fa {
    margin-right: 3px;
  }
  .inputForm {
    float: right;
  }
  .text {
    font-weight: bold;
    font-size: 20px;
  }
</style>
