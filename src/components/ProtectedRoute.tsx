import {
  getUserIsAuthChecked,
  getUserIsAuthenticated,
  getUserIsLoading
} from '../services/slices/userSlice';
import { Navigate } from 'react-router-dom';
import { Preloader } from './ui/preloader';
import { useAppSelector } from '../utils/hooks';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const userIsAuthenticated = useAppSelector(getUserIsAuthenticated);
  const userIsLoading = useAppSelector(getUserIsLoading);
  const userIsAuthChecked = useAppSelector(getUserIsAuthChecked);

  if (!onlyUnAuth && !userIsAuthenticated && userIsAuthChecked) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && userIsAuthenticated) {
    return <Navigate replace to='/' />;
  }

  if (userIsLoading || !userIsAuthChecked) {
    return <Preloader />;
  }

  return children;
};
