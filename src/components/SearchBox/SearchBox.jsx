import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);
  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(changeFilter(value));
  };
  return (
    <form className={css.searchForm}>
      <label>Find contacts by name</label>
      <input
        className={css.searchInput}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}
