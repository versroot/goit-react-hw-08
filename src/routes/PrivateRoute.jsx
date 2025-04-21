import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

export const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  if (isRefreshing) return null;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
