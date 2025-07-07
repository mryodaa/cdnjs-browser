import { create } from "zustand";

interface IPaginationState {
  page: number;
  setPage(p: number): void;
}

export const usePaginationStore = create<IPaginationState>((set) => ({
  page: 1,
  setPage: (p) => set({ page: p }),
}));
