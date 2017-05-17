import AllOrders from '@/components/AllOrders';
import OverdueOrders from '@/components/OverdueOrders';

export default {
  name: 'Orders',
  meta: {
    icon: 'fa-cart-arrow-down',
    label: '订单',
  },
  children: [
    {
      name: 'OrderList',
      path: '/orders/list',
      meta: {
        label: '订单列表',
        roles: ['USER', 'SUPPORT', 'F_SUPPORT', 'COLLECTOR'],
      },
      component: AllOrders,
    },
    {
      name: 'OverdueOrders',
      path: '/orders/overdue',
      meta: {
        label: '催收列表',
      },
      component: OverdueOrders,
    },
  ],
};
