import UserList from '@/components/UserList';

export default {
  name: 'Users',
  meta: {
    icon: 'fa-user-o',
  },
  children: [
    {
      name: 'UserList',
      path: '/users/list',
      meta: {
        label: 'All Register Users',
      },
      component: UserList,
    },
  ],
};
