// src/components/RegistrationForm/RegistrationForm.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/slice";
// import "./RegistrationForm.css";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsRefreshing);

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .catch((error) => {
        // You can display error via form
        actions.setFieldError("general", error);
      });
    actions.resetForm();
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

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
              {isLoading ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
