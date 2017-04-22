const authState = {
  loginInfo: null,
};

const mutations = {
  SET_LOGIN_INFO(state, info) {
    state.loginInfo = info;
  },
  CLEAR_LOGIN_INFO(state) {
    state.loginInfo = null;
  },
};

const getters = {
  loginInfo: state => state.loginInfo,
};

export default {
  state: authState,
  mutations,
  getters,
};
