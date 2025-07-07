import { memo } from "react";
import { Pagination, type SxProps } from "@mui/material";

interface IPaginatorProps {
  count: number;
  page: number;
  onChange: (e: unknown, v: number) => void;
}

export const Paginator = memo<IPaginatorProps>(
  ({ count, page, onChange }) => {
    const sx: SxProps = {
      button: { color: "#fff" },
      "& .MuiPaginationItem-root.Mui-selected": {
        background: "#ff6400",
        color: "#000",
      },
    };
    return (
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        siblingCount={2}
        boundaryCount={2}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={sx}
      />
    );
  },
  (prev, next) => prev.page === next.page && prev.count === next.count
);
