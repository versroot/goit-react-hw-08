import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectContactsLoading,
  selectContactsError,
} from "../../redux/contacts/selectors";
import { selectFilter } from "../../redux/filters/selectors";
import styles from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter).toLowerCase();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visible = contacts.filter((c) => c.name.toLowerCase().includes(filter));

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={styles.list}>
        {visible.map((c) => (
          <Contact key={c.id} contact={c} />
        ))}
      </ul>
    </>
  );
}
