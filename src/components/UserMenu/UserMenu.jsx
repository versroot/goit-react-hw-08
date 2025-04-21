import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);

  return (
    <div className={styles.userMenu}>
      <span>Welcome, {email}</span>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
