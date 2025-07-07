import { memo, useEffect, useMemo, useCallback } from "react";

import { useDebounceQuery } from "@/features/LibrarySearch";
import { useFieldStore } from "@/features/LibrarySearchFields";
import {
  getMaxPage,
  getPageSlice,
  getTotal,
  LibraryCard,
  useLibraries,
} from "@/entities/library";
import { Loader, Paginator } from "@/shared/ui";

import boxIcon from "../../../app/assets/boxIcon.png";
import { usePaginationStore } from "../models/model";
import s from "./LibraryList.module.scss";

const PAGE_SIZE = 50;
// это надо выносить
export const LibraryList = memo(function LibraryList() {
  const search = useDebounceQuery(400);
  const fields = useFieldStore((s) => s.fields);

  const { data, isLoading, error } = useLibraries(
    search,
    fields.length ? fields : ["name"]
  );

  const page = usePaginationStore((store) => store.page);
  const setPage = usePaginationStore((store) => store.setPage);

  const fieldsKey = useMemo(() => fields.slice().sort().join(","), [fields]);
  useEffect(() => setPage(1), [search, fieldsKey, setPage]);

  const total = getTotal(data);
  const maxPage = getMaxPage(data, PAGE_SIZE);

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [page, maxPage, setPage]);

  const slice = useMemo(() => {
    return getPageSlice(data, PAGE_SIZE, page);
  }, [data, page]);

  const handlePage = useCallback(
    (_: unknown, v: number) => setPage(v),
    [setPage]
  );

  if (isLoading)
    return (
      <div className={s.loaderWrapper}>
        <Loader size={3} />
      </div>
    );

  if (error) return <p>Error: {(error as Error).message}</p>;

  if (total === 0)
    return (
      <div className={s.notFoundBox}>
        <img className={s.boxIcon} src={boxIcon} alt="box" />
        <p className={s.boxIconLabel}>No Libraries Found</p>
      </div>
    );

  return (
    <>
      <p className={s.librariesCount}>{total} Libraries</p>
      <div className={s.paginationWrapper}>
        <Paginator count={maxPage} onChange={handlePage} page={page} />
      </div>
      <ul className={s.libraries}>
        {slice.map((lib) => (
          <LibraryCard key={lib.name} {...lib} />
        ))}
      </ul>
      <div className={s.paginationWrapper}>
        <Paginator count={maxPage} onChange={handlePage} page={page} />
      </div>
    </>
  );
});
