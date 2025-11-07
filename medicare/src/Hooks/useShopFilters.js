import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../Constants/NavPages";

export default function useShopFilters() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFiltered] = useState(products);

  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";
  const categories = searchParams.get("categories") || "";
  const brands = searchParams.get("brands") || "";

  const selectedCategories = categories
    .split(",")
    .map((c) => c.trim().toLowerCase().split("-").join(" "))
    .filter(Boolean);

  const selectedBrands = brands
    .split(",")
    .map((c) => c.trim().toLowerCase().split("-").join(" "))
    .filter(Boolean);

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase())
      );
    }

    setFiltered(result);
  }, [categories, brands]);

  const itemsPerPage = 16;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const validPage = Math.min(Math.max(pageFromURL, 1), totalPages);
  const [page, setPage] = useState(validPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filtered.slice(start, end);

  useEffect(() => {
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", 1);
      setSearchParams(newParams);
    }
  }, [filtered]);

  const handlePageChange = (e, value) => {
    setPage(value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", value);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  return {
    showFilters,
    setShowFilters,
    searchParams,
    setSearchParams,
    page,
    setPage,
    sort,
    products: filtered,
    currentProducts,
    totalPages,
    start,
    end,
    handlePageChange,
    clearFilter,
  };
}
