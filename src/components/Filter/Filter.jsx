import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import styles from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={e => dispatch(setFilter(e.target.value))}
      placeholder="Filter contacts"
    />
  );
}
