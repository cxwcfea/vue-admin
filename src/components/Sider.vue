<template>
  <aside :class="collapsed ? 'menu-collapsed': 'menu-expanded'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      v-show="!collapsed"
      router
    >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-submenu>
      <el-menu-item index="/user"><i class="el-icon-menu"></i>用户</el-menu-item>
      <el-menu-item index="/order"><i class="el-icon-setting"></i>订单</el-menu-item>
    </el-menu>
    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
      <li class="el-submenu item">
        <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(1,true)" @mouseout="showMenu(1,false)"><i class="el-icon-message"></i></div>
        <ul class="el-menu submenu submenu-hook-1" @mouseover="showMenu(1,true)" @mouseout="showMenu(1,false)">
          <li class="el-menu-item" style="padding-left: 40px;">选项1</li>
        </ul>
      </li>
      <li class="el-submenu">
        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;">
          <i class="el-icon-menu"></i>
        </div>
      </li>
      <li class="el-submenu">
        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;">
          <i class="el-icon-setting"></i>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    props: ['collapsed'],
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
    },
  };
</script>

<style lang="scss" scoped>
  aside {
    flex: 0 0 230px;
    width: 230px;
    .el-menu {
      height: 100%
    }
    .collapsed {
      width: 60px;
      .item {
        position: relative;
      }
      .submenu {
        position: absolute;
        top: 0px;
        left: 60px;
        z-index: 99999;
        height: auto;
        display: none;
      }
    }
  }
  .menu-collapsed{
    flex: 0 0 60px;
    width: 60px;
  }
  .menu-expanded{
    flex: 0 0 230px;
    width: 230px;
  }
</style>
