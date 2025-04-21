import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import styles from './RegistrationForm.module.css';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" />
        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />
        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
