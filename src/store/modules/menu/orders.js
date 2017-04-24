import Order from '@/components/Order';

export default {
  name: 'Orders',
  meta: {
    icon: 'fa-cart-arrow-down',
    expanded: false,
  },
  children: [
    {
      name: 'OrderList',
      path: '/orders/list',
      meta: {
        label: 'All Orders',
        link: 'tables/Basic.vue',
      },
      component: Order,
    },
  ],
};
