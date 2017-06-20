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

function mobileOS(val) {
  switch (val) {
    case 1:
      return 'Android';
    case 2:
      return 'iOS';
    case 3:
      return 'H5';
    default:
      return '未知';
  }
}

function callDirection(val) {
  switch (val) {
    case 1:
      return '呼出';
    case 2:
      return '呼入';
    case '0':
      return '呼出';
    case '1':
      return '呼入';
    default:
      return '未知';
  }
}

function smsDirection(val) {
  switch (val) {
    case 1:
      return '接收';
    case 2:
      return '发出';
    case 6:
      return '草稿';
    default:
      return '未知';
  }
}

function linkmanRelation(val) {
  switch (val) {
    case 101:
      return '父母';
    case 102:
      return '配偶';
    case 103:
      return '兄妹';
    case 201:
      return '同学';
    case 202:
      return '同事';
    case 203:
      return '朋友';
    default:
      return '未知';
  }
}

function loanOverdueTag(val) {
  switch (val) {
    case 0:
      return '未逾期';
    case 1:
      return '3天以内';
    case 2:
      return '4-30天';
    case 3:
      return '31-60天';
    case 4:
      return '61-90天';
    case 5:
      return '90以上';
    default:
      return '未知';
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
  mobileOS,
  callDirection,
  smsDirection,
  linkmanRelation,
  loanOverdueTag,
};
