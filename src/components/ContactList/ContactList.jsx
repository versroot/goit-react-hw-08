import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectContactsLoading,
  selectContactsError,
} from "../../redux/contacts/selectors";
import { selectFilter } from "../../redux/filters/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Always use an array to prevent undefined crashes
  const contacts = useSelector(selectContacts) || [];
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter).toLowerCase();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // 1) Only fetch contacts once the user is confirmed logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  // 2) If the fetch fails with “Please authenticate”, log out & go to login
  useEffect(() => {
    const msg =
      typeof error === "string"
        ? error
        : error && error.message
        ? error.message
        : null;

    if (msg === "Please authenticate") {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [error, dispatch, navigate]);

  // Filter contacts by name
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
