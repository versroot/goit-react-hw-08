import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/contacts">Contacts</NavLink>
    </nav>
  );
}
