import { memo } from "react";

import { Loader } from "@/shared/ui";

import type { ILibrary } from "../models/types";
import { useLibraryDetails } from "../models/queries";
import s from "./LibraryCard.module.scss";
import arrowIcon from "../../../app/assets/arrowIcon.svg";
import { useCollapsible } from "../models/useCollapsible";

export const LibraryCard = memo(function LibraryCard({
  name,
  version,
  description,
  keywords,
}: ILibrary) {
  const { open, height, toggle, innerRef } = useCollapsible();
  const { data: details, isLoading } = useLibraryDetails(name, open);
  useCollapsible([isLoading, details]);

  return (
    <li
      className={`${s.libraryCard} ${open ? s.openCard : ""}`}
      onClick={() => toggle()}
    >
      <div className={s.libraryWrapper}>
        <p className={s.libraryName}>{name}</p>
        <p className={s.libraryVersion}>v {version}</p>
      </div>

      {description && (
        <p className={open ? s.libraryDescriptionFull : s.libraryDescription}>
          {description}
        </p>
      )}

      <div className={s.detailsWrapper} style={{ maxHeight: height }}>
        <div
          ref={innerRef}
          className={s.detailsInner}
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && <Loader />}

          {details && (
            <>
              {details.homepage && (
                <p>
                  <strong>Homepage:</strong>{" "}
                  <a href={details.homepage}>{details.homepage}</a>
                </p>
              )}

              {details.repository?.url && (
                <p>
                  <strong>Repo:</strong>{" "}
                  <a href={details.repository.url}>{details.repository.url}</a>
                </p>
              )}

              {details.license && (
                <p>
                  <strong>License:</strong> {details.license}
                </p>
              )}

              {details.author?.name && (
                <p>
                  <strong>Author:</strong> {details.author.name}
                </p>
              )}

              {details.latest && (
                <p>
                  <strong>Latest file:</strong>{" "}
                  <a href={details.latest}>{details.latest.split("/").pop()}</a>
                </p>
              )}

              {details.versions?.length && (
                <p className={s.versionsWrapper}>
                  <strong>Last Versions:</strong>{" "}
                  {details.versions
                    .slice(-5)
                    .reverse()
                    .map((v) => (
                      <span key={v}>{v} </span>
                    ))}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {keywords?.length && (
        <div className={s.keywordsWrapper}>
          {(open ? keywords : keywords.slice(0, 8)).map((kw) => (
            <div key={kw} className={s.keyword}>
              <p className={s.keywordText}>{kw}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className={`${s.arrow} ${open ? s.open : ""}`}
        aria-label={open ? "Collapse" : "Expand"}
      >
        <img src={arrowIcon} alt="arrow" />
      </button>
    </li>
  );
});
