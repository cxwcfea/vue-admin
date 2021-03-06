export const CHANNEL = [
  'jiaoyouweidai',
  'loan',
  'newloan',
  'jizhihui1',
  'ios_weidai',
  'tui',
  'tui_sms',
  'yingweinuo',
  '58',
  'v6',
  'sina',
];

export const ORDER_STATUS = [
  [1000, '审核中'],
  [1201, '身份审核失败'],
  [1202, '信用审核失败'],
  [1203, '实名认证失败'],
  [1210, '信审成功'],
  [1300, '审核通过'],
  [2100, '绑卡失败'],
  [2000, '绑卡签约'],
  [2200, '设置支付密码'],
  [2300, '授权代扣'],
  [2400, '绑卡签约成功'],
  [2800, '确认打款'],
  [3000, '等待放款'],
  [3100, '放款中'],
  [3200, '放款成功'],
  [3300, '放款失败'],
  [3400, '不放款'],
  [4000, '逾期'],
  [4500, '还款提交成功'],
  [4600, '还款成功'],
  [4700, '还款失败'],
  [5000, '已还款'],
  [10000, '订单终结'],
];

export const OVERDUE_TYPE = [
  [-1, '全部'],
  [2, 'M0 (4-30)'],
  [3, 'M1 (31-60)'],
  [4, 'M2 (60-90)'],
  [5, 'M3 (>90)'],
];

export const collectNums = [
  '185276755',
  '02586288569',
  '02988187020',
  '02988187024',
  '02180356344',
];

export const collectNumSet = new Set(collectNums);

export const redKeywords = [
  '微贷',
  '恶意',
  '催告',
  '黑名单',
  '情节严重',
  '诉讼',
  '严重违约',
  '征信受损',
  '金融贷款诈骗',
  '长期拒接电话',
  '累计应还',
  '长期拖欠',
  '行为恶劣',
  '催收',
  '立即还款',
  '善意提醒',
  '产生罚息',
  '避免影响个人征信',
  '过时录入',
  '中国银行个人征信系统',
  '人民银行征信系统',
  '中央银行征信库',
  '央行征信库',
  '中国人民银行系统',
  '征信平台',
  '征信问题',
  '征信记录',
  '协商结清账单',
  '以免影响',
  '欠款人',
  '移交法务部',
  '催促还款',
  '处理欠款',
  '欠款拖欠恶劣',
  '催缴函',
  '法律责任',
  '外催',
  '轰炸骚扰',
  '毫无还款诚意',
  '逃避债务',
  '未结清欠款',
  '催缴',
  '信用诈骗',
  '速还',
  '追究刑事责任',
  '金融诈骗',
  '信用卡',
  '拒不还款',
  '已过最后还款日',
  '个人名誉',
  '违约金',
  '逾期',
  '刑法',
  '户籍地',
  '立案',
  '后果自负',
  '我方',
  '协商',
  '公安机关',
  '罚金',
  '拖欠',
  '协助',
  '尚未还款成功',
];

export const ScoreMap = {
  典型骗贷用户: 1,
  恶意逾期用户: 5,
  疑似资料造假用户: 10,
  一般逾期用户: 15,
  信息未授权用户: 20,
  信息量太少: 30,
  运营商爬取失败: 40,
  信息填写错误: 40,
  '非白名单,可放贷用户': 45,
  '运营商爬取失败,但可放贷': 50,
  '续贷用户,短信偏少': 60,
  '续贷用户,运营商爬取失败': 80,
};

export const ScoreReason = [
  '骗贷用户',
  '资料明显作假嫌疑',
  '同行',
  '办贷款用户',
  '逾期严重',
  '恶意拖欠',
  '拒不还款',
  '被催收记录',
  '运营商通话记录存疑',
  '无能力偿还',
  '负债太多用户',
  '通讯录未授权',
  '手机通话记录未授权',
  '手机短信记录未授权',
  '通讯录偏少',
  '手机通话记录偏少',
  '手机短信记录偏少',
  '运营商爬取失败未授权',
  '可放贷用户',
  '短信偏少',
  '续贷用户',
  '运营商爬取失败',
  '信息填写错误',
  '非白名单',
];
