import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PageTitle from "../../components/PageTitle";
import MyCollapse from "../../components/shop/MyCollapse";
import MySelectElement from "../../components/shop/MySelectElement";
import ProductsContainer from "../../components/Products/ProductsContainer";
import MyPagination from "../../components/MyPagination";
import ScrollButton from "../../components/ScrollButton";
import { products, shopFilters } from "../../Constants/NavPages";

function Shop() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const validPage = Math.min(Math.max(pageFromURL, 1), totalPages);
  const [page, setPage] = useState(validPage);

  let sortedProducts = [...products];
  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "rating-desc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sort === "latest") {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = sortedProducts.slice(start, end);
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

  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />

      <PageTitle title="shop" />

      <button
        className="w-max bg-[#00a297] text-white rounded-md px-6 text-lg cursor-pointer mb-5 mt-14 mx-8 md:mx-24"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="mx-8 md:mx-24 flex flex-col gap-5 md:gap-0 md:grid grid-cols-5">
        {showFilters && (
          <div className="flex flex-col gap-5 w-full border-r-stone-200 md:border-r-2 md:pr-4">
            {shopFilters.map((title, index) => (
              <MyCollapse
                key={index}
                title={title}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            ))}
          </div>
        )}

        <div
          className={`${
            showFilters ? "col-span-4" : "col-span-5"
          } flex flex-col justify-between gap-10`}
        >
          <div>
            <div className="flex items-center justify-between w-full mb-10">
              <p className="text-[#00a297]/80 font-medium pl-4">
                Showing {start + 1}–{Math.min(end, sortedProducts.length)} of{" "}
                {sortedProducts.length} results
              </p>
              <MySelectElement />
            </div>

            <div className="pl-4">
              <ProductsContainer products={currentProducts} />
            </div>
          </div>
          <MyPagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}

export default Shop;
