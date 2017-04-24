<template>
  <aside :class="collapsed ? 'menu-collapsed': 'menu-expanded'">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      unique-opened
      v-show="!collapsed"
      router
    >
      <template v-for="(item, index) in menu">
        <el-submenu :index="index+''" v-if="item.children && item.children.length">
          <template slot="title"><i :class="['fa', item.meta.icon]"></i>{{ item.name }}</template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{ child.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path"><i :class="['fa', item.meta.icon]"></i>{{ item.name }}</el-menu-item>
      </template>
    </el-menu>
    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
      <li v-for="(item, index) in menu" class="el-submenu item">
        <template v-if="item.children && item.children.length">
          <div class="el-submenu__title menu-group" @mouseover="showMenu(index, true)" @mouseout="showMenu(index, false)">
            <i :class="['fa', item.meta.icon]"></i>
          </div>
          <ul class="el-menu submenu" :class="'submenu-hook-' + index" @mouseover="showMenu(index, true)" @mouseout="showMenu(index, false)">
            <li
              class="el-menu-item"
              style="padding-left: 40px;"
              v-for="child in item.children"
              @click="$router.push(child.path)"
              :key="child.path"
              :class="$route.path === child.path ? 'is-active' : ''">
              {{ child.name }}
            </li>
          </ul>
        </template>
        <template v-else>
          <li class="el-submenu">
            <div
              class="el-submenu__title el-menu-item menu-single"
              :class="$route.path === item.path ? 'is-active' : ''"
              @click="$router.push(item.path)"
            >
              <i :class="['fa', item.meta.icon]"></i>
            </div>
          </li>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['collapsed'],
    computed: {
      ...mapGetters({
        menu: 'menuItems',
      }),
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      handleSelect() {

      },
      showMenu(i, status) {
        const menuItem = this.$refs.menuCollapsed.getElementsByClassName(`submenu-hook-${i}`)[0];
        menuItem.style.display = status ? 'block' : 'none';
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
  .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
    .menu-single {
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
    }
    .menu-group {
      padding-left: 20px;
    }
  }
  .menu-expanded {
    flex: 0 0 230px;
    width: 230px;
  }
</style>
