import moment from 'moment';
import _ from 'lodash';

export function calcOverdueDays(subLoan) {
  let repayDay = moment();
  if (subLoan.status === 1) {
    repayDay = moment(subLoan.repaid_date).subtract(8, 'hours').startOf('day');
  }

  let overdueDays = repayDay.diff(moment(subLoan.repay_date).subtract(8, 'hours').startOf('day'), 'days');
  if (overdueDays < 0) {
    overdueDays = 0;
  }
  return overdueDays;
}

export function buildSmsKeywordMap(sms, keywords) {
  const keywordMap = {};

  keywords.forEach((elem) => {
    const matched = [];
    sms.forEach((item) => {
      if (_.includes(item.content, elem)) {
        matched.push(item);
      }
    });
    if (matched.length > 0) {
      keywordMap[elem] = matched;
    }
  });

  return keywordMap;
}

export function extractCallStatistics(features) {
  const callcntAggData = _.fill(Array(6), 0);
  const callcntAggDataOut = _.fill(Array(6), 0);
  const callcntAggDataIn = _.fill(Array(6), 0);
  const calltimeAggData = _.fill(Array(6), 0);
  const calltimeAggDataOut = _.fill(Array(6), 0);
  const calltimeAggDataIn = _.fill(Array(6), 0);
  features.forEach((elem) => {
    if (elem.name === 'last1m_callcnt_agg') {
      callcntAggData[5] = elem.value;
    }
    if (elem.name === 'second_m_callcnt_agg') {
      callcntAggData[4] = elem.value;
    }
    if (elem.name === 'third_m_callcnt_agg') {
      callcntAggData[3] = elem.value;
    }
    if (elem.name === 'fourth_m_callcnt_agg') {
      callcntAggData[2] = elem.value;
    }
    if (elem.name === 'fifth_m_callcnt_agg') {
      callcntAggData[1] = elem.value;
    }
    if (elem.name === 'sixth_m_callcnt_agg') {
      callcntAggData[0] = elem.value;
    }
    if (elem.name === 'last1m_callcnt_agg_out') {
      callcntAggDataOut[5] = elem.value;
    }
    if (elem.name === 'second_m_callcnt_agg_out') {
      callcntAggDataOut[4] = elem.value;
    }
    if (elem.name === 'third_m_callcnt_agg_out') {
      callcntAggDataOut[3] = elem.value;
    }
    if (elem.name === 'fourth_m_callcnt_agg_out') {
      callcntAggDataOut[2] = elem.value;
    }
    if (elem.name === 'fifth_m_callcnt_agg_out') {
      callcntAggDataOut[1] = elem.value;
    }
    if (elem.name === 'sixth_m_callcnt_agg_out') {
      callcntAggDataOut[0] = elem.value;
    }
    if (elem.name === 'last1m_callcnt_agg_in') {
      callcntAggDataIn[5] = elem.value;
    }
    if (elem.name === 'second_m_callcnt_agg_in') {
      callcntAggDataIn[4] = elem.value;
    }
    if (elem.name === 'third_m_callcnt_agg_in') {
      callcntAggDataIn[3] = elem.value;
    }
    if (elem.name === 'fourth_m_callcnt_agg_in') {
      callcntAggDataIn[2] = elem.value;
    }
    if (elem.name === 'fifth_m_callcnt_agg_in') {
      callcntAggDataIn[1] = elem.value;
    }
    if (elem.name === 'sixth_m_callcnt_agg_in') {
      callcntAggDataIn[0] = elem.value;
    }
    if (elem.name === 'last1m_calltime_agg') {
      calltimeAggData[5] = elem.value;
    }
    if (elem.name === 'second_m_calltime_agg') {
      calltimeAggData[4] = elem.value;
    }
    if (elem.name === 'third_m_calltime_agg') {
      calltimeAggData[3] = elem.value;
    }
    if (elem.name === 'fourth_m_calltime_agg') {
      calltimeAggData[2] = elem.value;
    }
    if (elem.name === 'fifth_m_calltime_agg') {
      calltimeAggData[1] = elem.value;
    }
    if (elem.name === 'sixth_m_calltime_agg') {
      calltimeAggData[0] = elem.value;
    }
    if (elem.name === 'last1m_calltime_agg_out') {
      calltimeAggDataOut[5] = elem.value;
    }
    if (elem.name === 'second_m_calltime_agg_out') {
      calltimeAggDataOut[4] = elem.value;
    }
    if (elem.name === 'third_m_calltime_agg_out') {
      calltimeAggDataOut[3] = elem.value;
    }
    if (elem.name === 'fourth_m_calltime_agg_out') {
      calltimeAggDataOut[2] = elem.value;
    }
    if (elem.name === 'fifth_m_calltime_agg_out') {
      calltimeAggDataOut[1] = elem.value;
    }
    if (elem.name === 'sixth_m_calltime_agg_out') {
      calltimeAggDataOut[0] = elem.value;
    }
    if (elem.name === 'last1m_calltime_agg_in') {
      calltimeAggDataIn[5] = elem.value;
    }
    if (elem.name === 'second_m_calltime_agg_in') {
      calltimeAggDataIn[4] = elem.value;
    }
    if (elem.name === 'third_m_calltime_agg_in') {
      calltimeAggDataIn[3] = elem.value;
    }
    if (elem.name === 'fourth_m_calltime_agg_in') {
      calltimeAggDataIn[2] = elem.value;
    }
    if (elem.name === 'fifth_m_calltime_agg_in') {
      calltimeAggDataIn[1] = elem.value;
    }
    if (elem.name === 'sixth_m_calltime_agg_in') {
      calltimeAggDataIn[0] = elem.value;
    }
  });

  return {
    callcnt: [callcntAggData, callcntAggDataIn, callcntAggDataOut],
    calltime: [calltimeAggData, calltimeAggDataIn, calltimeAggDataOut],
  };
}
