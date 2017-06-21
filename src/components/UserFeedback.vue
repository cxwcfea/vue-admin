<template>
  <section>
    <el-card class="box-card" v-for="comment in data" :key="comment.id">
      <div slot="header" class="clearfix">
        <span style="line-height: 14px;">用户 <a :href="`/user/${comment.user_id_fk}`">{{ comment.user_id_fk }}</a> 评论于 <time class="time">{{ comment.create_time | dateFormatter }}</time> </span>
      </div>
      <div class="text item">
        {{ comment.content }}
      </div>
    </el-card>

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
    getUserFeedback,
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
          const { count, data } = await getUserFeedback(offset, this.itemPerPage);
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

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-card {
    margin-bottom: 5px;
    .text {
      font-size: 18px;
    }
  }
  section:first-child {
    margin-top: 5px;
  }
</style>
