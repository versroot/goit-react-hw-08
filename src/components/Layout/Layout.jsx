import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <AppBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
