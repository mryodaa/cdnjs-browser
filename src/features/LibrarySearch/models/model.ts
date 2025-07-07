import { create } from "zustand";

import { useDebounce } from "@/shared/lib/useDebounce";

interface ISearchState {
  query: string;
  setQuery(query: string): void;
}

export const useSearchStore = create<ISearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query: query }),
}));

export function useDebounceQuery(delay = 500) {
  const query = useSearchStore((s) => s.query);
  return useDebounce(query, delay);
}
