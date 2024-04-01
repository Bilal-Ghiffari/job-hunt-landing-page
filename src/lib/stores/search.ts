import { create } from "zustand";
type SearchType = {
  title: string;
  location: string;
};

type SearchState = {
  search: SearchType;
  setSearch: (SearchType: SearchType) => void;
  resetSearch: () => void;
};

const initialData = {
  title: "",
  location: "",
};

export const useSearchStore = create<SearchState>((set) => ({
  search: initialData,
  setSearch: (search) => set(() => ({ search })),
  resetSearch: () => set({ search: initialData }),
}));
