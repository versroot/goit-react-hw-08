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
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts) || [];
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter).toLowerCase();

  // These two tell us exactly where we are in auth flow:
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Only fetch once refreshing is done AND user is logged in
  useEffect(() => {
    if (!isRefreshing && isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isRefreshing, isLoggedIn]);

  // Silently ignore errors on first load (401 before token)
  // Optional: you could show a retry button if you want.
  const visible = contacts.filter((c) => c.name.toLowerCase().includes(filter));

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ul className={css.list}>
        {visible.map((c) => (
          <Contact key={c.id} contact={c} />
        ))}
      </ul>
    </>
  );
}
