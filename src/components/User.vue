<template>
  <section class="main" v-if="user">
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
        <el-row :gutter="15" style="margin-top: 5px">
          <el-col :span="8">
            <d-player :video="user.video"></d-player>
          </el-col>
          <el-col :span="16">
            <div class="amap-page-container">
              <el-amap vid="amapDemo" :zoom="user.map.zoom" :center="user.map.center" class="amap-demo">
                <el-amap-marker :position="user.map.marker.position" :visible="user.map.marker.visible" :draggable="user.map.marker.draggable"></el-amap-marker>
              </el-amap>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="支付信息">
        <el-row class="card-info">
          <el-col :span="12" :offset="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix card-header">
                <span style="line-height: 18px;">用户输入</span>
              </div>
              <el-col :span="6">
                <i class="fa fa-address-card fa-4x"></i>
              </el-col>
              <el-col :span="18">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="银行名称">
                    <span>{{ user.card.bank_card_name }}</span>
                  </el-form-item>
                  <el-form-item label="预留手机号">
                    <span>{{ user.card.mobile }}</span>
                  </el-form-item>
                  <el-form-item label="银行卡号">
                    <span>{{ user.card.bank_card_no }}</span>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix card-header">
                <span style="line-height: 18px;">Sina</span>
              </div>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="支付卡号">
                  <span>{{ user.payInfo.sina.bank_card_no }}</span>
                </el-form-item>
                <el-form-item label="实名认证">
                  <span>{{ user.payInfo.sina.is_real_named === 1 ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="已绑卡">
                  <span>{{ user.payInfo.sina.is_bound_card === 1 ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="设置密码">
                  <span>{{ user.payInfo.sina.is_set_password === 1 ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="委托扣款">
                  <span>{{ user.payInfo.sina.is_withhold_authority === 1 ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ user.payInfo.sina.create_time | dateFormatter }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ user.payInfo.sina.update_time | dateFormatter }}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix card-header">
                <span style="line-height: 18px;">宝付</span>
              </div>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ user.payInfo.bf.id_holder }}</span>
                </el-form-item>
                <el-form-item label="银行卡号">
                  <span>{{ user.payInfo.bf.acc_no }}</span>
                </el-form-item>
                <el-form-item label="证件号码">
                  <span>{{ user.payInfo.bf.id_card }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ user.payInfo.bf.mobile }}</span>
                </el-form-item>
                <el-form-item label="银行代码">
                  <span>{{ user.payInfo.bf.pay_code }}</span>
                </el-form-item>
                <el-form-item label="是否激活">
                  <span>{{ user.payInfo.bf.is_activated ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ user.payInfo.bf.create_time | dateFormatter }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ user.payInfo.bf.update_time | dateFormatter }}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="手机通讯录">
        <el-row style="margin-left: 8px">
          <el-form :inline="true" :model="contactQuery" :rules="rules" ref="contactSearchForm">
            <el-form-item prop="mobile">
              <el-input v-model="contactQuery.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="queryContact">查询</el-button>
              <el-button type="danger" @click="showCollector">疑似催收</el-button>
              <el-button type="success" @click="resetSearch"><i class="fa fa-refresh"></i></el-button>
            </el-form-item>
            <el-form-item style="float: right;">
              <span>共 {{ currentContacts.length }} 条</span>
            </el-form-item>
          </el-form>
        </el-row>
        <el-col :span="12" v-for="item in currentContacts" :key="item.mobile" class="contact">
          <contact :info="item"></contact>
        </el-col>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          手机短信记录 <el-badge class="mark" :value="showingSms.length" />
        </span>
        <el-col :span="24" class="toolbar">
          <el-tag type="danger" v-for="(value, keyword) in redKeywordsMap" :key="keyword"><span @click="onKeySelected(keyword)">{{keyword}}</span></el-tag>
          <el-button type="success" size="small" @click="resetSearch"><i class="fa fa-refresh"></i></el-button>
        </el-col>
        <el-table
          :data="showingSms"
          style="width: 100%">
          <el-table-column
            prop="mobile"
            label="号码"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="通讯录姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="count"
            sortable
            label="条数"
            width="90">
          </el-table-column>
          <el-table-column
            label="方向"
            width="80">
            <template scope="scope">
              <span>{{ scope.row.direction | smsDirection }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容">
          </el-table-column>
          <el-table-column
            label="发生时间"
            prop="send_time"
            sortable
            :formatter="dateFormatter"
            width="180">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="运营商数据">

      </el-tab-pane>
    </el-tabs>

    <el-dialog title="照片查看" v-model="dialogPhotoVisible">
      <photo-viewer :images="[user.ic_photo_handhold, user.ic_photo_front, user.ic_photo_back]"></photo-viewer>
    </el-dialog>

  </section>
</template>

<script>
  import VueDPlayer from 'vue-dplayer';
  import PhotoViewer from './PhotoViewer';
  import Contact from './Contact';
  import { collectNums, redKeywords } from '../common/constants';
  import { dateFormatter } from '../common/filter';
  import { buildSmsKeywordMap } from '../common/utils';
  import {
    getUserInfo,
    handleError,
  } from '../common/services';

  const collectNumSet = new Set(collectNums);
  const contactMap = {};

  export default {
    components: {
      photoViewer: PhotoViewer,
      contact: Contact,
      'd-player': VueDPlayer,
    },
    data() {
      return {
        dialogPhotoVisible: false,
        contactQuery: {
          mobile: '',
        },
        contactMobile: '',
        onlyCollector: false,
        rules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { len: 11, message: '长度11个字符', trigger: 'blur' },
          ],
        },
        showingSms: [],
        redKeywordsMap: {},
        user: null,
        userContacts: [],
      };
    },
    computed: {
      modelSearchLink() {
        return `https://www.baidu.com/s?wd=${this.user.model}`;
      },
      currentContacts() {
        if (this.onlyCollector === true) {
          return this.userContacts.filter(elem => collectNumSet.has(elem.mobile));
        }
        if (this.contactMobile) {
          return this.userContacts.filter(elem => elem.mobile === this.contactMobile);
        }

        return this.userContacts;
      },
    },
    methods: {
      dateFormatter(row, column) {
        return dateFormatter(row[column.property]);
      },
      prepareUserContactData(addressBook, callRecords, sms) {
        addressBook.forEach((elem) => {
          const contact = contactMap[elem.mobile];
          if (contact) {
            if (elem.name !== contact.name) {
              contact.name += ` | ${elem.name}`;
            }
          } else {
            contactMap[elem.mobile] = {
              name: elem.name,
              mobile: elem.mobile,
              call: [],
              sms: [],
              totalCallTime: 0,
              tags: [],
            };
          }
        });
        callRecords.forEach((elem) => {
          const contact = contactMap[elem.mobile];
          if (contact) {
            contact.call.push(elem);
            contact.totalCallTime += elem.duration;
          } else {
            contactMap[elem.mobile] = {
              name: '',
              mobile: elem.mobile,
              call: [elem],
              sms: [],
              totalCallTime: elem.duration,
              tags: [],
            };
          }
        });
        sms.forEach((elem) => {
          const contact = contactMap[elem.mobile];
          if (contact) {
            contact.sms.push(elem);
          } else {
            contactMap[elem.mobile] = {
              name: '',
              mobile: elem.mobile,
              call: [],
              sms: [elem],
              totalCallTime: 0,
              tags: [],
            };
          }
        });
        this.userContacts = this
          .$_(contactMap)
          .values()
          .sortBy(elem => elem.totalCallTime)
          .reverse()
          .value();
        this.userContacts.forEach((elem) => {
          if (collectNumSet.has(elem.mobile)) {
            elem.tags.push('催收');
          }
        });
      },
      queryContact() {
        this.$refs.contactSearchForm.validate((valid) => {
          if (valid) {
            this.contactMobile = this.contactQuery.mobile;
            return true;
          }

          return false;
        });
      },
      resetSearch() {
        this.contactMobile = '';
        this.contactQuery.mobile = '';
        this.onlyCollector = false;
        this.showingSms = this.user.sms;
      },
      showCollector() {
        this.onlyCollector = true;
      },
      onKeySelected(keyword) {
        this.showingSms = this.redKeywordsMap[keyword];
      },
    },
    async mounted() {
      const uid = this.$route.params.id;
      try {
        const user = await getUserInfo(uid);
        this.user = user;
        this.prepareUserContactData(
          user.us_address_books, user.callRecords, user.sms,
        );
        this.showingSms = user.sms.map((elem) => {
          elem.count = contactMap[elem.mobile].sms.length;
          elem.name = contactMap[elem.mobile].name;
          return elem;
        });
        this.redKeywordsMap = buildSmsKeywordMap(this.showingSms, redKeywords);
        console.log(user);
      } catch (err) {
        handleError(err, this.$message);
      }
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

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .amap-demo {
    height: 530px;
  }

  .contact {
    padding: 8px;
  }

  .main {
    .el-tag {
      height: 30px;
      line-height: 28px;
      font-size: 20px;
      margin-right: 5px;
    }
  }

  .toolbar {
    margin-top: 0;
  }
</style>
