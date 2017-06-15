import AllOrders from '@/components/AllOrders';
import OverdueOrders from '@/components/OverdueOrders';
import WaitingPayOrders from '@/components/WaitingPayOrderList';

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
      name: 'WaitingPayOrders',
      path: '/orders/waitingPay',
      meta: {
        label: '待放款列表',
        roles: ['F_SUPPORT', 'FINANCE'],
      },
      component: WaitingPayOrders,
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
