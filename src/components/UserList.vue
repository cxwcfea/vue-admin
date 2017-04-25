<template>
  <el-table :data="tableMeta.data" highlight-current-row v-loading="tableMeta.isLoading" @selection-change="onSelectChange" style="width: 100%;">
    <el-table-column
      v-for="(item, index) in tableMeta.cols"
      :prop="item.prop"
      :label="item.label"
      :key="item.label"
      :formatter="item.filter"
    ></el-table-column>
  </el-table>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        tableMeta: 'userList',
      }),
    },
    methods: {
      ...mapActions([
        'getUserList',
      ]),
      onSelectChange(selected) {
        console.log(selected);
      },
    },
    created() {
      this
        .getUserList({ page: 1 })
        .catch((e) => {
          this.$message({
            message: e.message,
            type: 'error',
          });
        });
    },
  };
</script>

<style lang="scss" scoped>

</style>
