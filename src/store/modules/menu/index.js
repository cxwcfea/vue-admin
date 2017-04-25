import Dashboard from '@/components/Dashboard';
import users from './users';
import orders from './orders';

// show: meta.label -> name
// name: component name
// meta.label: display label
const menuState = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer',
      },
      component: Dashboard,
    },
    users,
    orders,
  ],
};

const mutations = {
};

const getters = {
  menuItems(state) {
    return state.items;
  },
};

export default {
  state: menuState,
  mutations,
  getters,
};
