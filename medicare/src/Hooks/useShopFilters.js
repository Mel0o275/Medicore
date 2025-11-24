import { useSearchParams } from "react-router-dom";
import useSearchStore from "../Store/useSearchStore";
import { useEffect } from "react";

export default function useShopFilters() {
  const [searchParams] = useSearchParams();
  let query = useSearchStore((state) => state.query);
  const category = useSearchStore((state) => state.category);
  const setCategory = useSearchStore((state) => state.setCategory);
  const setPage = useSearchStore((state) => state.setPage);
  let categoryquery = searchParams.get("category") || "";
  useEffect(() => {
    if (categoryquery && categoryquery !== category) {
      setCategory(categoryquery);
    }
  }, [categoryquery, category, setCategory]);

  const brand = useSearchStore((state) => state.brand);
  const price = useSearchStore((state) => state.price);
  const sort = useSearchStore((state) => state.sort);
  const clearCategory = useSearchStore((state) => state.clearCategory);
  const clearBrand = useSearchStore((state) => state.clearBrand);
  const clearSort = useSearchStore((state) => state.clearSort);
  const clearPrice = useSearchStore((state) => state.clearPrice);
  const clearQuery = useSearchStore((state) => state.clearQuery);

  let filters = "";
  const [min, max] = price.split("-");
  const minValue = parseFloat(min);
  const maxValue = parseFloat(max);
  let selectedCategories = "";
  if (Array.isArray(category) && category.length > 0) {
    selectedCategories = category.length > 0 ? category.join(",") : category[0];
  }

  let selectedBrands = "";
  if (Array.isArray(brand) && brand.length > 0) {
    selectedBrands = brand.length > 0 ? brand.join(",") : brand[0];
  }
  if (selectedCategories || categoryquery) {
    filters += `category=${selectedCategories || categoryquery}&`;
  }
  if (selectedBrands) {
    filters += `brand=${selectedBrands}&`;
  }
  if (price) {
    if (price == "All") {
      filters;
    } else {
      filters += `price[gte]=${minValue}&price[lte]=${maxValue}&`;
    }
  }
  if (sort) {
    filters += `sort=${sort}&`;
  }
  if (query && query.length > 3) {
    filters += `search=${query}&`;
  }
  if (filters.endsWith("&")) {
    filters = filters.slice(0, -1);
  }
  const clearAll = () => {
    filters = "";
    clearBrand();
    clearCategory();
    clearPrice();
    clearSort();
    clearQuery();
    setPage(1);
  };
  return { filters, clearAll };
}
