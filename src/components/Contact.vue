<template>
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header" class="clearfix">
      通讯录姓名: <span style="line-height: 36px; font-size: 18px;">{{ info.name }}</span>
      <span style="line-height: 36px; font-size: 18px; float: right">{{ info.mobile }}</span>
    </div>
    <div style="padding: 14px;">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            通信记录 <el-tag type="success">{{ info.call ? info.call.length : 0 }}</el-tag> 总时长 <el-tag>{{ info.totalCallTime }}</el-tag>
          </template>
          <el-table
            :data="info.call"
            style="width: 100%">
            <el-table-column
              label="方向">
              <template scope="scope">
                <span style="">{{ scope.row.direction | callDirection }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="持续时间">
            </el-table-column>
            <el-table-column
              label="发生时间">
              <template scope="scope">
                <span style="">{{ scope.row.creat_time | dateFormatter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            短信记录 <el-tag type="success">{{ info.sms ? info.sms.length : 0 }}</el-tag>
          </template>
          <div v-for="item in info.sms" class="sms-text">
            {{ item.content }}
            <el-tag>{{ item.send_time | dateFormatter }}</el-tag>
            <el-tag>{{ item.direction | smsDirection }}</el-tag>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="bottom clearfix">
        <el-tag type="danger" v-for="(tag, index) in info.tags" :key="index">{{ tag }}</el-tag>
        <el-button type="text" class="button">短信记录</el-button>
        <el-button type="text" class="button">通话记录</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: ['info'],
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 20px;
    height: 20px;
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

  .badge-item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .sms-text {
    font-size: 16px;
    border: 1px solid #13ce66;
    border-radius: 6px;
    margin: 5px 0;
    padding: 0 5px;
  }
</style>
