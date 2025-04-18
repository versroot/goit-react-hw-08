import css from "./Contact.module.css";
import { BiSolidUser, BiSolidPhone } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li className={css.contact}>
      <div className={css.credentials}>
        <p className={css.name}>
          <BiSolidUser className={css.pic} />
          {contact.name}
        </p>
        <p className={css.number}>
          <BiSolidPhone className={css.pic} />
          {contact.number}
        </p>
      </div>
      <button className={css.deletebtn} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
