import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrders, getOrdersThunk } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector(getOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
