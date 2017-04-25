import Order from '@/components/Order';

export default {
  name: 'Orders',
  meta: {
    icon: 'fa-cart-arrow-down',
  },
  children: [
    {
      name: 'OrderList',
      path: '/orders/list',
      meta: {
        label: 'All Orders',
      },
      component: Order,
    },
  ],
};
