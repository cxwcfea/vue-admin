import moment from 'moment';

export default function calcOverdueDays(subLoan) {
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
