import { create } from "zustand";
type SearchType = {
  title: string;
  location: string;
};

type SearchState = {
  search: SearchType;
  setSearch: (SearchType: SearchType) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  search: {
    title: "",
    location: "",
  },
  setSearch: (search) => set(() => ({ search })),
}));
