<template>
  <el-form ref="form" :rules="rules" :model="form">
    <el-form-item label="评分标准">
      <el-radio-group v-model="scoreLabel" @change="onScoreLabelChange">
        <el-radio-button v-for="(score, label) in scoreMap" :key="score" :label="label"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户评分" prop="score">
      <el-input-number v-model="form.score" :min="0" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item label="评分理由">
      <el-checkbox-group v-model="checkList" @change="onScoreReasonChange">
        <el-checkbox v-for="(tag, index) in scoreReason" :key="index" :label="tag"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item prop="reason">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入评分理由"
        v-model="form.reason">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { ScoreMap, ScoreReason } from '../common/constants';

  export default {
    data() {
      return {
        form: {
          score: 0,
          reason: '',
        },
        rules: {
          score: [
            { required: true, type: 'number', min: 0, max: 100, message: '请填写评分', trigger: 'blur' },
          ],
          reason: [
            { required: true, message: '请填写评分理由', trigger: 'blur' },
          ],
        },
        scoreLabel: '',
        checkList: [],
        scoreReason: ScoreReason,
      };
    },
    computed: {
      scoreMap() {
        return ScoreMap;
      },
    },
    methods: {
      onScoreLabelChange(label) {
        this.form.score = ScoreMap[label];
      },
      onScoreReasonChange(reasons) {
        this.form.reason = reasons.join(';');
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('submitReview', this.form);
            return true;
          }
          return false;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
