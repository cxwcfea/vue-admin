import axios from 'axios';
import _ from 'lodash';
import { dateFormatter, gender, amount, orderStatus } from '../../common/filter';
import { getOverdueOrders } from '../../common/services';

const tableState = {
  userList: {
    cols: [
      {
        label: '手机号',
        prop: 'mobile',
      },
      {
        label: '身份证号',
        prop: 'ic_number',
      },
      {
        label: '性别',
        prop: 'gender',
        filter(row) {
          return gender(row.ic_number);
        },
      },
      {
        label: '渠道',
        prop: 'channel',
      },
      {
        label: '注册时间',
        prop: 'create_time',
        filter(row) {
          return dateFormatter(row.create_time);
        },
      },
    ],
    data: [],
    isLoading: false,
    currentPage: 1,
    pageSize: 15,
    total: -1,
    path: '/api/users',
  },
  allOrders: {
    cols: [
      {
        label: '本金',
        prop: 'principal',
        filter(row) {
          return amount(row.principal);
        },
      },
      {
        label: '实际出借',
        prop: 'pay_amount',
        filter(row) {
          return amount(row.pay_amount);
        },
      },
      {
        label: '手续费',
        prop: 'handling_fee',
        filter(row) {
          return amount(row.handling_fee);
        },
      },
      {
        label: '贷款天数',
        prop: 'period',
      },
      {
        label: '申请时间',
        prop: 'apply_date',
        filter(row) {
          return dateFormatter(row.apply_date);
        },
      },
      {
        label: '放款日期',
        prop: 'paid_date',
        filter(row) {
          return dateFormatter(row.paid_date);
        },
      },
      {
        label: '状态',
        prop: 'status_id_fk',
        filter(row) {
          return orderStatus(row.status_id_fk);
        },
      },
      {
        label: '渠道',
        prop: 'channel',
      },
      {
        label: '贷款次数',
        prop: 'order_count',
      },
    ],
    data: [],
    isLoading: false,
    currentPage: 1,
    pageSize: 15,
    total: -1,
    path: '/api/loans',
  },
  overdueOrders: {
    cols: [
      {
        label: '手机号',
        prop: 'mobile',
      },
      {
        label: '身份证',
        prop: 'ic_number',
      },
      {
        label: '申请日',
        prop: 'apply_date',
        filter(row, column) {
          return dateFormatter(row[column.property]);
        },
      },
      {
        label: '借款',
        prop: 'principal',
        filter(row, column) {
          return amount(row[column.property]);
        },
      },
      {
        label: '实付',
        prop: 'pay_amount',
        filter(row, column) {
          return amount(row[column.property]);
        },
      },
      {
        label: '服务费',
        prop: 'handling_fee',
        filter(row, column) {
          return amount(row[column.property]);
        },
      },
      {
        label: '待还',
        prop: 'repayAmount',
        filter(row, column) {
          return amount(row[column.property]);
        },
      },
      {
        label: '周期',
        prop: 'period',
      },
      {
        label: '应还日',
        prop: 'repay_date',
        filter(row, column) {
          return dateFormatter(row[column.property]);
        },
      },
      {
        label: '逾期天数',
        prop: 'overdueDays',
      },
      {
        label: '催收员',
        prop: 'collector',
      },
    ],
    data: [],
    isLoading: false,
    currentPage: 1,
    pageSize: 15,
    total: -1,
    path: '/api/overdue_sub_loans',
  },
};

const mutations = {
  SET_LIST_DATA(state, payload) {
    const tag = payload.tag;
    state[tag].data = payload.content;
    state[tag].total = payload.count;
    state[tag].currentPage = payload.currentPage;
  },
  SET_LIST_SIZE(state, payload) {
    state[payload.tag].pageSize = payload.pageSize;
  },
  UPDATE_LIST_DATA(state, payload) {
    state[payload.tag].data = payload.data;
  },
  SET_LOADING(state, tag) {
    state[tag].isLoading = true;
  },
  CLEAR_LOADING(state, tag) {
    state[tag].isLoading = false;
  },
};

const actions = {
  async getUserList({ commit, state }, data) {
    commit('SET_LOADING', 'userList');
    const page = data.page;
    let queryStr = '';
    if (data.search) {
      queryStr += `&search=${data.search}`;
    }
    if (data.channel) {
      queryStr += `&channel=${data.channel}`;
    }
    const limit = state.userList.pageSize;
    const offset = (page - 1) * limit;
    try {
      commit('CLEAR_LOADING', 'userList');
      const { data: response } = await axios.get(`${state.userList.path}?offset=${offset}&limit=${limit}${queryStr}`);
      commit('SET_LIST_DATA', { tag: 'userList', count: response.count, content: response.data, currentPage: page });
    } catch (error) {
      commit('CLEAR_LOADING', 'userList');
      let message = error.message;
      if (error.response.data.msg) {
        message = error.response.data.msg;
      }
      throw new Error(message);
    }
  },
  async getAllOrders({ commit, state }, data) {
    commit('SET_LOADING', 'allOrders');
    const page = data.page;
    let queryStr = '';
    _.forEach(data, (v, k) => {
      queryStr += `&${k}=${v}`;
    });
    const limit = state.allOrders.pageSize;
    const offset = (page - 1) * limit;
    try {
      commit('CLEAR_LOADING', 'allOrders');
      const { data: response } = await axios.get(`${state.allOrders.path}?offset=${offset}&limit=${limit}${queryStr}`);
      const vm = response.data;
      vm.forEach((elem) => {
        elem.userName = elem.us_user.name;
        elem.channel = elem.us_user.channel;
        elem.order_count = elem.us_user.order_count;
      });
      commit('SET_LIST_DATA', { tag: 'allOrders', count: response.count, content: vm, currentPage: page });
    } catch (error) {
      commit('CLEAR_LOADING', 'allOrders');
      throw error;
    }
  },
  async getOverdueOrders({ commit, state }, data) {
    try {
      commit('SET_LOADING', 'overdueOrders');
      const page = data.page;
      const result =
        await getOverdueOrders(data, state.overdueOrders.pageSize, state.overdueOrders.path);
      commit('CLEAR_LOADING', 'overdueOrders');
      commit('SET_LIST_DATA', { tag: 'overdueOrders', count: result.count, content: result.data, currentPage: page });
    } catch (error) {
      commit('CLEAR_LOADING', 'overdueOrders');
      throw error;
    }
  },
  changeOverdueOrdersListSize({ dispatch, commit }, data) {
    commit('SET_LIST_SIZE', { tag: 'overdueOrders', pageSize: data.pageSize });
    dispatch('getOverdueOrders', data);
  },
};

const getters = {
  userList: state => state.userList,
  allOrders: state => state.allOrders,
  overdueOrders: state => state.overdueOrders,
};

export default {
  state: tableState,
  mutations,
  actions,
  getters,
};
