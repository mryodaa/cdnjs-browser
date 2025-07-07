import type { ILibrariesResponse } from "./types";

export const getTotal = (data?: ILibrariesResponse) =>
  data?.results.length ?? 0;

export const getMaxPage = (
  data: ILibrariesResponse | undefined,
  size: number
) => Math.max(1, Math.ceil(getTotal(data) / size));

export const getPageSlice = (
  data: ILibrariesResponse | undefined,
  size: number,
  page: number
) => {
  if (!data) return [];
  const start = (page - 1) * size;
  return data.results.slice(start, start + size);
};
