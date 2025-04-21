// src/components/ContactList/ContactList.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
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
import { logout } from "../../redux/auth/operations";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts) || [];
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter).toLowerCase();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Ensure logout is only dispatched once
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!isRefreshing && isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isRefreshing, isLoggedIn]);

  useEffect(() => {
    const msg = typeof error === "string" ? error : error?.message;
    if (msg === "Please authenticate" && !hasLoggedOut.current) {
      hasLoggedOut.current = true; // prevent multiple logout dispatches
      dispatch(logout());
    }
  }, [error, dispatch]);

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
