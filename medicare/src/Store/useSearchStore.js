import { create } from "zustand";

const useSearchStore = create((set) => ({
  query: "",
  category: [],
  brand: [],
  price: "",
  sort: "",
  page: 1,

  setQuery: (newQuery) => set({ query: newQuery }),
  setCategory: (newCategory) => set({ category: newCategory }),
  setBrand: (newBrand) => set({ brand: newBrand }),
  setPrice: (newPrice) => set({ price: newPrice }),
  setSort: (newSort) => set({ sort: newSort }),
  setPage: (newPage) => set({ page: newPage }),
  clearQuery: () => set({ query: "" }),
  clearCategory: () => set({ category: [] }),
  clearBrand: () => set({ brand: [] }),
  clearSort: () => set({ sort: "" }),
  clearPrice: () => set({ price: "" }),
}));

export default useSearchStore;
