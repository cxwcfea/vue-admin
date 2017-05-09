import axios from 'axios';
import _ from 'lodash';
import { dateFormatter, gender, amount, orderStatus } from '../../common/filter';

const tableState = {
  userList: {
    cols: [
      {
        label: '姓名',
        prop: 'name',
      },
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
        label: '订单号',
        prop: 'serial_number',
      },
      {
        label: '用户名',
        prop: 'userName',
      },
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
};

const mutations = {
  SET_LIST_DATA(state, payload) {
    const tag = payload.tag;
    state[tag].data = payload.content;
    state[tag].total = payload.count;
    state[tag].currentPage = payload.currentPage;
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
};

const getters = {
  userList: state => state.userList,
  allOrders: state => state.allOrders,
};

export default {
  state: tableState,
  mutations,
  actions,
  getters,
};
