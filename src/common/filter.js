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
  const val = Number.parseInt(value, 10);
  if (Number.isNaN(val)) {
    return value;
  }
  return (val / 100).toFixed(0);
}

const orderStatusArr = new Map(ORDER_STATUS);
function orderStatus(val) {
  const result = orderStatusArr.get(val);
  return result || '未知';
}

function orderTransStep(value) {
  if (!value) {
    return '';
  }
  return `${orderStatus(value.from_status_id_fk)} 到 ${orderStatus(value.to_status_id_fk)}`;
}

function begRecordType(val) {
  switch (val) {
    case 0:
      return '人工';
    case 1:
      return '短信';
    case 2:
      return '联系人短信';
    default:
      return '未知';
  }
}

function paymentType(val) {
  switch (val) {
    case 0:
      return '新浪支付';
    case 100:
      return '支付宝';
    case 101:
      return '微信';
    case 102:
      return '网银';
    default:
      return '其他';
  }
}

export {
  dateFormatter,
  gender,
  amount,
  orderStatus,
  orderTransStep,
  begRecordType,
  paymentType,
};
