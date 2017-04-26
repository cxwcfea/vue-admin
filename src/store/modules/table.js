import axios from 'axios';
import { dateFormatter, gender } from '@/common/filter';

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
};

const getters = {
  userList: state => state.userList,
};

export default {
  state: tableState,
  mutations,
  actions,
  getters,
};
