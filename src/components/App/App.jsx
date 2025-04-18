import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";

import { fetchContacts } from "../../redux/contactsOps";
import {
  selectLoading,
  selectError,
  // selectFilteredContacts,
} from "../../redux/contactsSlice";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const contacts = useSelector(selectFilteredContacts);

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>

      {error && <p className="error">Error: {error}</p>}

      <ContactForm />

      <SearchBox />

      {loading ? <p className="loading">Loading contacts…</p> : <ContactList />}
    </div>
  );
}
