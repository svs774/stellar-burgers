import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeedsThunk, getFeedsOrders } from '../../services/slices/feedSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const Feed: FC = () => {
  const orders = useAppSelector(getFeedsOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
