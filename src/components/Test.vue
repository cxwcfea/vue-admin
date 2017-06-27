<template>
  <order-list :orders="tableMeta.data"></order-list>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import OrderList from './OrderList';
  import {
    handleError,
  } from '../common/services';

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters({
        tableMeta: 'allOrders',
      }),
    },
    components: {
      orderList: OrderList,
    },
    methods: {
      ...mapActions([
        'getAllOrders',
      ]),
    },
    mounted() {
      this
        .getAllOrders({ channel: 'jiaoyouweidai', status: 1 })
        .catch((e) => {
          handleError(e, this.$message);
        });
    },
  };
</script>

<style lang="scss" scoped>
</style>
