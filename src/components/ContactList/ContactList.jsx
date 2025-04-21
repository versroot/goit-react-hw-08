// src/components/ContactList/ContactList.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectContactsLoading,
  selectContactsError,
} from "../../redux/contacts/selectors";
import { selectFilter } from "../../redux/filters/selectors";
import { selectToken } from "../../redux/auth/selectors";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();

  // grab token directly
  const token = useSelector(selectToken);
  // contacts state
  const contacts = useSelector(selectContacts) || [];
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter).toLowerCase();

  // only fetch once we have a token
  useEffect(() => {
    if (token) {
      dispatch(fetchContacts());
    }
  }, [dispatch, token]);

  // filter out by name
  const visible = contacts.filter((c) => c.name.toLowerCase().includes(filter));

  return (
    <>
      {isLoading && <p>Loading contacts…</p>}

      {/* no raw error rendering */}
      {error && <p style={{ color: "red" }}>Error fetching contacts.</p>}

      <ul className={css.list}>
        {visible.map((c) => (
          <Contact key={c.id} contact={c} />
        ))}
      </ul>
    </>
  );
}
