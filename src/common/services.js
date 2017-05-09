import axios from 'axios';

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
