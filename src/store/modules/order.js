import { getUserOrders } from '../../common/services';

const orderState = {
  userOrders: {},
};

const mutations = {
  SET_USER_ORDER(state, info) {
    const { uid, orders } = info;
    state.userOrders[uid] = orders;
  },
};

const actions = {
  async loadUserOrders({ commit }, uid) {
    const orders = await getUserOrders(uid);
    commit('SET_USER_ORDER', { uid, orders });
    return orders;
  },
};

// const getters = {
// };

export default {
  state: orderState,
  mutations,
  actions,
  // getters,
};
