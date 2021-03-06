import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import menu from '@/store/modules/menu';
import table from '@/store/modules/table';
import order from '@/store/modules/order';

Vue.use(Vuex);

const state = {
};

export default new Vuex.Store({
  state,
  modules: {
    auth,
    menu,
    table,
    order,
  },
});
