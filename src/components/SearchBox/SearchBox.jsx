import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);
  return (
    <form className={css.searchForm}>
      <label>Find contacts by name</label>
      <input
        className={css.searchInput}
        type='text'
        value={value}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </form>
  );
}
