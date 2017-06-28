<template>
  <section>
    <order-list :orders="loan"></order-list>
  </section>
</template>

<script>
  import OrderList from './OrderList';
  import { getLoanInfo, handleError } from '../common/services';

  export default {
    components: {
      orderList: OrderList,
    },
    data() {
      return {
        loan: [],
      };
    },
    async mounted() {
      const oid = this.$route.params.id;
      try {
        const loans = await getLoanInfo(oid);
        loans.forEach((elem) => {
          elem.userName = elem.us_user.name;
          elem.channel = elem.us_user.channel;
          elem.order_count = elem.us_user.order_count;
        });
        this.loan = loans;
      } catch (err) {
        handleError(err, this.$message);
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
