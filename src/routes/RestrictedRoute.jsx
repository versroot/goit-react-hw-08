import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const RestrictedRoute = ({ redirectTo = '/contacts' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};
