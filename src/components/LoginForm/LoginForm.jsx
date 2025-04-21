import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import styles from './LoginForm.module.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />
        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}
