import moment from 'moment';
import { ORDER_STATUS } from '../common/constants';

function dateFormatter(date) {
  return moment(date).format('YYYY-MM-DD hh:mm:ss');
}

function gender(ID) {
  if (ID) {
    const sexCode = ID.substr(-2, 1);
    if (!sexCode) {
      return '未知';
    }
    if (Number.parseInt(sexCode, 10) % 2 === 0) {
      return '女';
    }
    return '男';
  }
  return '未知';
}

function amount(value) {
  if (Number.isNaN(value)) {
    return value;
  }
  return (value / 100).toFixed(2);
}

const orderStatusArr = new Map(ORDER_STATUS);
function orderStatus(val) {
  const result = orderStatusArr.get(val);
  return result || '未知';
}

function orderTransStep(value) {
  if (!value) return '';
  return `${orderStatus(value.from_status_id_fk)} 到 ${orderStatus(value.to_status_id_fk)}`;
}

export {
  dateFormatter,
  gender,
  amount,
  orderStatus,
  orderTransStep,
};
