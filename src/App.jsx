import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { RestrictedRoute } from './routes/RestrictedRoute';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<RestrictedRoute />}>
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
