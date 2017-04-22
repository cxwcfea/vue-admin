<template>
  <section class="content-container">
    <router-view></router-view>
  </section>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" scoped>
  .content-container {
    flex:1;
    overflow-y: scroll;
    padding: 20px;
    .breadcrumb-container {
      .title {
        width: 200px;
        float: left;
        color: #475669;
      }
      .breadcrumb-inner {
        float: right;
      }
    }
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
</style>
