import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectContactsLoading,
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
  const filter = useSelector(selectFilter).toLowerCase();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isRefreshing && isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isRefreshing, isLoggedIn]);

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
