import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/slice";
// import './LoginForm.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsRefreshing);

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .catch((error) => {
        actions.setFieldError("general", error);
      });
    actions.resetForm();
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {errors.general && <div className="error">{errors.general}</div>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
