<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :rules="rules" :model="query" ref="queryForm">
        <el-form-item prop="mobile">
          <el-input v-model="query.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="startSearch" icon="search">查询</el-button>
        </el-form-item>
        <el-form-item label="注册渠道">
          <el-select v-model="query.channel" @change="onChannelChange" placeholder="请选择注册渠道">
            <el-option value="all" label="全部"></el-option>
            <el-option value="jiaoyouweidai"></el-option>
            <el-option value="loan"></el-option>
            <el-option value="newloan"></el-option>
            <el-option value="jizhihui1"></el-option>
            <el-option value="ios_weidai"></el-option>
            <el-option value="tui"></el-option>
            <el-option value="tui_sms"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="query.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-button type="success" style="float: right" @click="refresh"><i class="fa fa-refresh"></i></el-button>
      </el-form>
    </el-col>

    <el-table :data="tableMeta.data" highlight-current-row v-loading="tableMeta.isLoading" style="width: 100%;">
      <el-table-column
        v-for="(item, index) in tableMeta.cols"
        :prop="item.prop"
        :label="item.label"
        :key="item.label"
        :formatter="item.filter"
      ></el-table-column>
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
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  function checkMobile(rule, value, callback) {
    const message = '请输入有效的手机号';
    if (!value) {
      callback(new Error(message));
    } else if (!/^1[3|4|5|7|8|][0-9]{9}$/.test(value)) {
      callback(new Error(message));
    } else {
      callback();
    }
  }

  export default {
    data() {
      return {
        query: {
          mobile: '',
          channel: 'jiaoyouweidai',
          date: '',
        },
        rules: {
          mobile: [
            { validator: checkMobile, message: '请输入有效的手机号', trigger: 'blur' },
          ],
        },
      };
    },
    computed: {
      ...mapGetters({
        tableMeta: 'userList',
      }),
    },
    methods: {
      ...mapActions([
        'getUserList',
      ]),
      refresh() {
        this.query.mobile = '';
        this.query.channel = 'jiaoyouweidai';
        this.fetchData({ page: 1, channel: this.query.channel });
      },
      fetchData(query) {
        if (query.channel === 'all') {
          delete query.channel;
        }
        this
          .getUserList(query)
          .catch((e) => {
            this.$message({
              message: e.message,
              type: 'error',
            });
          });
      },
      onChannelChange(channel) {
        this.fetchData({ page: 1, channel });
      },
      onPageChange(currentPage) {
        this.fetchData({ page: currentPage, channel: this.query.channel });
      },
      startSearch() {
        this.$refs.queryForm.validate((valid) => {
          if (valid) {
            this.fetchData({ page: 1, search: this.query.mobile });
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
