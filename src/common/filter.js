import moment from 'moment';

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

export {
  dateFormatter,
  gender,
};
