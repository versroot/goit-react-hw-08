import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import css from './ContactForm.module.css';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required('Phone is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const duplicate = contacts.find(
      c => c.name.toLowerCase() == values.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${values.name} is already in contacts`);
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.cform}>
        <div className={css.group}>
          <label>Name</label>
          <Field name='name' placeholder='Name' />
          <ErrorMessage name='name' component='div' style={{ color: 'red' }} />
        </div>
        <div className={css.group}>
          <label>Number</label>
          <Field name='number' placeholder='Number' />
          <ErrorMessage name='number' component='div' style={{ color: 'red' }} />
        </div>
        <button type='submit'>Add contact</button>
      </Form>
    </Formik>
  );
}
