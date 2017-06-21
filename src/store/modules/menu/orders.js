import AllOrders from '@/components/AllOrders';
import OverdueOrders from '@/components/OverdueOrders';
import WaitingPayOrders from '@/components/WaitingPayOrderList';
import LoansBecomeDue from '@/components/LoansBecomeDue';
import LoansRepaidInToday from '@/components/LoansRepaidInToday';
import RefundOrders from '@/components/RefundOrders';

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
      name: 'LoansBecomeDueByToday',
      path: '/orders/loansBecomeDue',
      meta: {
        label: '今日到期列表',
        roles: ['SUPPORT', 'F_SUPPORT'],
      },
      component: LoansBecomeDue,
    },
    {
      name: 'LoansRepaidInToday',
      path: '/orders/loansRepaidInToday',
      meta: {
        label: '今日还款列表',
        roles: ['SUPPORT', 'F_SUPPORT'],
      },
      component: LoansRepaidInToday,
    },
    {
      name: 'OverdueOrders',
      path: '/orders/overdue',
      meta: {
        label: '催收列表',
      },
      component: OverdueOrders,
    },
    {
      name: 'RefundOrders',
      path: '/orders/refund',
      meta: {
        label: '退款订单列表',
      },
      component: RefundOrders,
    },
  ],
};
