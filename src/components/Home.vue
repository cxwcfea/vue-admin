<template>
  <el-row class="container">
    <app-header v-on:collapse="onSiderChange"></app-header>
    <el-col :span="24" class="main">
      <app-sider :collapsed="siderBarCollapsed"></app-sider>
      <app-container></app-container>
    </el-col>
  </el-row>
</template>

<script>
  import Header from './Header';
  import Sider from './Sider';
  import Container from './ContentContainer';

  export default {
    data() {
      return {
        siderBarCollapsed: false,
      };
    },
    components: {
      appHeader: Header,
      appSider: Sider,
      appContainer: Container,
    },
    methods: {
      onSiderChange(collapsed) {
        this.siderBarCollapsed = collapsed;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
    }
  }
</style>
