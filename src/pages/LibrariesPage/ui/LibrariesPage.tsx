import { Header } from "@/widgets/Header";
import { SearchInput } from "@/features/LibrarySearch";
import { FieldFilter } from "@/features/LibrarySearchFields";
import { LibraryList } from "@/widgets/LibraryList";

import s from "./LibrariesPage.module.scss";

export function LibrariesPage() {
  return (
    <div>
      <Header />
      <section className={s.librariesSection}>
        <div className={s.sectionWrapper}>
          <h1 className={s.librariesHeading}>Libraries Browser</h1>
          <FieldFilter />
          <SearchInput />
          <LibraryList />
        </div>
      </section>
    </div>
  );
}
