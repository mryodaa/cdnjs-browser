import { useSearchStore } from "../models/model";
import s from "./SearchInput.module.scss";

export const SearchInput = () => {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <input
      type="text"
      placeholder="Search libraries…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={s.searchInput}
    />
  );
};
