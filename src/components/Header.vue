<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
      <img src="../assets/logo.png">{{ collapsed ? '' : brand }}
    </el-col>
    <el-col :span="10">
      <div class="tools" @click.prevent="collapse">
        <i class="fa fa-align-justify"></i>
      </div>
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner">
          <img :src="userAvatar">{{ loginInfo.name }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePassword">更改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="onLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { logout } from '../common/auth';

  export default {
    data() {
      return {
        collapsed: false,
        userAvatar: 'http://tpl.amazeui.org/template/21/admin/assets/img/user04.png',
        brand: '后台管理系统',
      };
    },
    computed: {
      ...mapGetters([
        'loginInfo',
      ]),
    },
    methods: {
      collapse() {
        this.collapsed = !this.collapsed;
        this.$emit('collapse', this.collapsed);
      },
      onLogout() {
        logout();
        this.$router.push({ path: '/login' });
      },
      changePassword() {
        console.log('click');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    line-height: 60px;
    background: #20a0ff;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 45px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 20px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 10px;
      padding-right: 20px;
      border-right: 1px solid rgba(238,241,146,0.3);
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 0px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
</style>
