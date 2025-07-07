import { create } from "zustand";

interface IFieldState {
  fields: string[];
  toggle(v: string): void;
}

export const useFieldStore = create<IFieldState>((set) => ({
  fields: ["name"],
  toggle: (v) => {
    set((s) => ({
      fields: s.fields.includes(v)
        ? s.fields.filter((f) => f !== v)
        : [...s.fields, v],
    }));
  },
}));
