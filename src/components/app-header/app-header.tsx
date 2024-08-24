import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserData } from '../../services/slices/userSlice';
import { useAppSelector } from '../../utils/hooks';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useAppSelector(getUserData).name} />
);
