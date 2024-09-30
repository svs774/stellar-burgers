import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeeds, getFeedsOrders } from '../../services/slices/feedSlice';
import { useAppSelector } from '../../utils/hooks';

const getOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(getFeedsOrders);
  const feed = useAppSelector(getFeeds);

  const readyOrders = getOrdersByStatus(orders, 'done');

  const pendingOrders = getOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
