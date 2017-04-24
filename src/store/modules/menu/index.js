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
        link: 'dashboard/index.vue',
      },
      component: Dashboard,
    },
    users,
    orders,
  ],
};

const mutations = {
  EXPAND_MENU(state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded;
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded;
    }
  },
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
