import User from '@/components/User';

export default {
  name: 'Users',
  meta: {
    icon: 'fa-user-o',
    expanded: false,
  },
  children: [
    {
      name: 'UserList',
      path: '/users/list',
      meta: {
        label: 'All Register Users',
        link: 'tables/Basic.vue',
      },
      component: User,
    },
  ],
};
