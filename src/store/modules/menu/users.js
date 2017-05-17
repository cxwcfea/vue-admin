import UserList from '@/components/UserList';

export default {
  name: 'Users',
  meta: {
    icon: 'fa-user-o',
    label: '用户',
  },
  children: [
    {
      name: 'UserList',
      path: '/users/list',
      meta: {
        label: '用户列表',
      },
      component: UserList,
    },
  ],
};
