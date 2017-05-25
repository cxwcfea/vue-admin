<template>
  <section class="main">
    <el-tabs type="border-card">
      <el-tab-pane label="基本资料">
        <el-row :gutter="30">
          <el-col :sm="12" :md="6">
            <el-card :body-style="{ padding: '0px' }">
              <img @click="dialogPhotoVisible = true" :src="user.ic_photo_handhold" class="image">
              <div style="padding: 14px;">
                <el-row :gutter="5">
                  <el-col :span="12">
                    <img style="width: 100%" :src="user.ic_photo_front">
                  </el-col>
                  <el-col :span="12">
                    <img style="width: 100%" :src="user.ic_photo_back">
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="12" :md="18">
            <el-card class="box-card">
              <div slot="header" class="clearfix card-header">
                <span style="line-height: 18px;">基本资料</span>
                <!--
                <el-button style="float: right;" type="primary">操作按钮</el-button>
                -->
              </div>
              <el-row class="detail">
                <el-col :span="12" class="item">
                  <span class="key">姓名</span>: {{user.name}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">手机号</span>: {{user.mobile}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">身份证号</span>: {{user.ic_number}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">注册日期</span>: {{user.create_time | dateFormatter}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">家庭住址</span>: {{user.address}},{{user.city}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">工作地址</span>: {{user.company_address}},{{user.company_city}}
                </el-col>
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix card-header">
                <span style="line-height: 18px;">设备信息</span>
                <!--
                <el-button style="float: right;" type="primary">操作按钮</el-button>
                -->
              </div>
              <el-row class="detail">
                <el-col :span="12" class="item">
                  <span class="key">操作系统</span>: {{user.os | mobileOS}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">手机型号</span>: <a target="_blank" :href="modelSearchLink">{{user.model}}</a>
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">IMEI</span>: {{user.imei}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">IP</span>: {{user.IP}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">渠道</span>: {{user.channel}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">包名</span>: {{user.package_name}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">App ID</span>: {{user.app_id}}
                </el-col>
                <el-col :span="12" class="item">
                  <span class="key">App version</span>: {{user.app_version}}
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-dialog title="照片查看" v-model="dialogPhotoVisible">
      <photo-viewer :images="[user.ic_photo_handhold, user.ic_photo_front, user.ic_photo_back]"></photo-viewer>
    </el-dialog>

  </section>
</template>

<script>
  import PhotoViewer from './PhotoViewer';

  export default {
    components: {
      photoViewer: PhotoViewer,
    },
    data() {
      return {
        dialogPhotoVisible: false,
        user: {
          IP: '192.168.31.79',
          address: '广东省梅州市丰顺县黄金镇金山下',
          app_id: 2,
          app_version: '2.1.0',
          birthday: '1981-08-04T00:00:00.000Z',
          channel: 'loan',
          city: '浙江,杭州',
          city_code: '2',
          city_name: '北京',
          company_address: '广东省梅州市丰顺县黄金镇金山下',
          company_city: '湖北,武汉',
          create_time: '2017-02-23T01:00:00.000Z',
          ic_number: '620102198108041833',
          ic_photo_front: 'http://cdnqiniu.caifuhanshu.com/image_88612_d56d38f2b0bc4338997f9aa6732ab353bd3a9661cf1df8b3cd028d8cfbe5978f_*&_640multiply480',
          ic_photo_back: 'http://cdnqiniu.caifuhanshu.com/image_88612_f638e60a79f5400c8c6e98e3aaab1fa11d2ec587fb595d927d8195817c38fad0_*&_634multiply476',
          ic_photo_handhold: 'http://cdnqiniu.caifuhanshu.com/image_88612_dd366d20e9ce4d1894e8bbd62c27c31020f473e4a1876d92ef616eb3308e8b8e_*&_677multiply1201',
          ic_status: 0,
          ic_status_reason: null,
          id: 1,
          imei: '861468030847401',
          level: 2,
          location: '116.359903,40.007432,',
          mobile: '13439695920',
          model: 'GN5003',
          name: '程翔',
          order_count: 1,
          os: 1,
          os_version: '1.0',
          package_name: 'com.weidai.loan',
          sex: 1,
          tencentScore: -1,
          ts_account_cards: [],
          update_time: null,
          us_address_books: [],
          us_auth_video: {},
          us_contacts: [],
        },
      };
    },
    computed: {
      modelSearchLink() {
        return `https://www.baidu.com/s?wd=${this.user.model}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    margin: 10px 0px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    font-size: 22px;
    margin-bottom: 5px;
    .card-header {
      font-size: 18px;
    }
  }

  .detail {
    .key {
      color: #99a9bf;
      font-weight: bold;
    }
    .item {
      padding: 10px;
    }
  }

  .demo-table-expand label {
    width: 90px;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
