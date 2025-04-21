import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ContactsPage from "../../pages/ContactPage/ContactPage";
import PrivateRoute from "../routes/PrivateRoute";
import RestrictedRoute from "../routes/RestrictedRoute";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <RegistrationPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <LoginPage />
            </RestrictedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login">
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}
