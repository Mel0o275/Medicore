import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useShopFilters(products = []) {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtered, setFiltered] = useState([]);

  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";
  const categories = searchParams.get("categories") || "";
  const brands = searchParams.get("brands") || "";
  const price = searchParams.get("price") || "";
  const rating = searchParams.get("rating") || "";
  console.log(categories);

  const selectedCategories = categories
    .split(",")
    .map((c) => c.trim().toLowerCase().replaceAll("-", " "))
    .filter((item) => item.trim() != "");
  console.log(selectedCategories);
  const selectedBrands = brands
    .split(",")
    .map((b) => b.trim().toLowerCase().replaceAll("-", " "))
    .filter((item) => item.trim() != "");

  let selectedPrice = null;
  if (price && price.toLowerCase() !== "all") {
    const match = price.match(/(\d+)l\.e-(\d+)l\.e/i);
    if (match) {
      selectedPrice = {
        min: parseInt(match[1]),
        max: parseInt(match[2]),
      };
    }
  }

  const selectedRating = rating ? parseInt(rating) : null;

  useEffect(() => {
    if (!products) return setFiltered([]);

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

    if (selectedPrice) {
      result = result.filter(
        (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
      );
    }

    if (selectedRating) {
      result = result.filter((p) => Math.round(p.ratings) === selectedRating);
    }

    switch (sort) {
      case "-rating":
        result.sort((a, b) => b.ratings - a.ratings);
        break;
      case "-createdAt":
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "price":
        result.sort((a, b) => a.price - b.price);
        break;
      case "-price":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFiltered(result);
  }, [products, categories, brands, sort, price, rating]);

  const itemsPerPage = 12;
  const totalPages = Math.max(Math.ceil(filtered.length / itemsPerPage), 1);
  const validPage = Math.min(Math.max(pageFromURL, 1), totalPages);
  const [page, setPage] = useState(validPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filtered.slice(start, end);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", 1);
      setSearchParams(newParams);
    }
  }, [filtered, page, totalPages, searchParams, setSearchParams]);

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
