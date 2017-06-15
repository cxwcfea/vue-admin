import Dashboard from '@/components/Dashboard';
import Finance from '@/components/Finance';
import RiskControlList from '@/components/RiskControlList';
import Test from '@/components/Test';
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
    {
      name: 'RiskControlList',
      path: '/risk_control_list',
      meta: {
        icon: 'fa-user-secret',
        label: '待审核列表',
        roles: ['F_SUPPORT', 'SUPPORT'],
      },
      component: RiskControlList,
    },
    {
      name: 'Finance',
      path: '/finance',
      meta: {
        icon: 'fa-money',
        label: '财务',
        roles: ['F_SUPPORT', 'FINANCE'],
      },
      component: Finance,
    },
    users,
    orders,
    {
      name: 'Test',
      path: '/test',
      meta: {
        icon: 'fa-money',
        label: '测试',
      },
      component: Test,
    },
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
