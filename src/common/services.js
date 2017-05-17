import _ from 'lodash';
import axios from 'axios';
import calcOverdueDays from './utils';

export async function requestRiskCheck(loan) {
  const res = await axios.get(`/api/request_risk_check?uid=${loan.user_id_fk}&oid=${loan.id}`);
  return res.data;
}

export function getLoanDetail(loan) {
  return axios
    .all([axios.get(`/api/loan_trans?id=${loan.id}`), axios.get(`/api/loan_installments?id=${loan.id}`)])
    .then(axios.spread((loanTrans, subLoans) => { /* eslint arrow-body-style: ["error", "always"] */
      return { loanTrans: loanTrans.data, subLoans: subLoans.data };
    }));
}

export function approveToPay(loan) {
  return axios
    .post('/api/approve_to_pay', { oid: loan.id, approve: true })
    .then((res) => {
      return res.data;
    });
}

export async function getOrderDebt(loan) {
  const res = await axios.get(`/api/order_debt?oid=${loan.id}`);
  return res.data.data / 100;
}

export function eliminateOrder(data) {
  return axios
    .post('/api/order_eliminate', {
      order_id: data.oid,
      debt_amount: data.debtAmount,
      repaid_amount: data.repaidAmount,
      pay_way: data.payWay,
      force_over: data.forceOver,
    });
}

function getDebtOfOrders(orders) {
  return axios
    .all(orders.map((order) => {
      return axios.get(`/api/order_debt?oid=${order.os_loan_order.id}`);
    }))
    .then((result) => {
      return result.map((elem) => {
        return elem.data.data;
      });
    });
}

function getCollectorOfOrders(orders) {
  const ids = orders.map((elem) => {
    return elem.id;
  });
  return axios
    .post('/api/order_collectors', { ids })
    .then((res) => {
      const orderCollector = {};
      res.data.forEach((elem) => {
        orderCollector[elem.order_id] = elem.user;
      });
      return orderCollector;
    });
}

function getLoanOrderInstallment(data, pageSize, uri) {
  const page = data.page;
  let queryStr = '';
  _.forEach(data, (v, k) => {
    queryStr += `&${k}=${v}`;
  });
  const limit = pageSize;
  const offset = (page - 1) * limit;
  return axios.get(`${uri}?offset=${offset}&limit=${limit}${queryStr}`);
}

export async function getOverdueOrders(data, pageSize, uri) {
  const { data: response } = await getLoanOrderInstallment(data, pageSize, uri);
  const results =
    await axios.all([getDebtOfOrders(response.data), getCollectorOfOrders(response.data)]);
  const debt = results[0];
  const collectors = results[1];
  const vm = response.data;
  let index = 0;
  vm.forEach((elem) => {
    elem.name = elem.os_loan_order.us_user.name;
    elem.mobile = elem.os_loan_order.us_user.mobile;
    elem.ic_number = elem.os_loan_order.us_user.ic_number;
    elem.apply_date = elem.os_loan_order.apply_date;
    elem.pay_amount = elem.os_loan_order.pay_amount;
    elem.handling_fee = elem.os_loan_order.handling_fee;
    elem.overdueDays = calcOverdueDays(elem);
    elem.repayAmount = debt[index];
    elem.collector = collectors[elem.id] || '未分配';
    index += 1;
  });
  return { data: vm, count: response.count };
}

export async function getBegRecords(oid, uid) {
  return axios
    .all([axios.get(`/api/beg_record?oid=${oid}`), axios.get(`/api/paid_record?uid=${uid}`)])
    /* eslint arrow-body-style: ["error", "always"] */
    .then(axios.spread((records, repayRecords) => {
      return { records: records.data, repayRecords: repayRecords.data };
    }));
}

export async function getAllCollectors() {
  const collectors = await axios.get('/api/collectors');
  return collectors.data;
}

export async function assignCollectOrders(data) {
  const result = await axios.post('/api/assign_to_collector', data);
  return result;
}

export function handleError(error, showMsg) {
  let message = error.message;
  if (error.response) {
    message = error.response.data.msg || error.response.data;
  }
  console.error(message);
  if (showMsg) {
    showMsg({
      message,
      type: 'error',
    });
  }
}
