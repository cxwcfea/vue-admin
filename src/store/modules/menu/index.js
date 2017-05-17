import Dashboard from '@/components/Dashboard';
import users from './users';
import orders from './orders';
import { currentUser } from '../../../common/auth';

function generateMenuItems(menu = [], user) {
  for (let i = 0, l = menu.length; i < l; i += 1) {
    const item = menu[i];

    if (user && item.meta.roles && user.role !== 'ADMIN' && !item.meta.roles.includes[user.role]) {
      console.log('hide menu item', item);
      item.meta.hidden = true;
    }
    if (!item.component) {
      generateMenuItems(item.children, user);
    }
  }
}

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
        label: 'Dashboard',
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
    generateMenuItems(state.items, currentUser());
    return state.items;
  },
};

export default {
  state: menuState,
  mutations,
  getters,
};
