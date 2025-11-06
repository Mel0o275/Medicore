import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../Constants/NavPages";

export default function useShopFilters() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const validPage = Math.min(Math.max(pageFromURL, 1), totalPages);
  const [page, setPage] = useState(validPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = products.slice(start, end);

  useEffect(() => {
    if (pageFromURL !== validPage) {
      searchParams.set("page", validPage);
      setSearchParams(searchParams);
    }
  }, []);

  const handlePageChange = (e, value) => {
    setPage(value);
    searchParams.set("page", value);
    setSearchParams(searchParams);
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
    products,
    currentProducts,
    totalPages,
    start,
    end,
    handlePageChange,
    clearFilter,
  };
}
