import AllOrders from '@/components/AllOrders';

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
      component: AllOrders,
    },
  ],
};
