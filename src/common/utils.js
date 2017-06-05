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
