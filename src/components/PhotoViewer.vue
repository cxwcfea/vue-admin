<template>
  <section class="body">
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-button-group>
          <el-button type="primary" icon="arrow-left" @click="prev">上一页</el-button>
          <el-button type="primary" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button type="primary" @click="rotate"><i class="fa fa-repeat"></i></el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="20" :offset="2">
        <img :src="images[activeIndex]" class="img-thumbnail" v-bind:style="{ transform: rotateArray[rotateIndex] }" style="transform-origin: center center;">
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    props: ['images'],
    data() {
      return {
        activeIndex: 0,
        rotateIndex: 0,
        rotateArray: ['rotate(0.0turn)', 'rotate(0.25turn)', 'rotate(0.5turn)', 'rotate(0.75turn)'],
      };
    },
    methods: {
      next() {
        this.rotateIndex = 0;
        this.activeIndex = (this.activeIndex + 1) % 3;
      },
      prev() {
        this.rotateIndex = 0;
        let index = this.activeIndex - 1;
        if (index < 0) {
          index = 2;
        }
        this.activeIndex = index;
      },
      rotate() {
        this.rotateIndex = (this.rotateIndex + 1) % 4;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .img-thumbnail {
    display: inline-block;
    max-width: 100%;
    height: auto;
    padding: 2px;
    line-height: 1.6;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  img {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
  }
</style>
