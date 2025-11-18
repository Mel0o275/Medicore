import PageTitle from "../../components/PageTitle";
import MyCollapse from "../../components/shop/MyCollapse";
import MySelectElement from "../../components/shop/MySelectElement";
import ProductsContainer from "../../components/Products/ProductsContainer";
import MyPagination from "../../components/MyPagination";
import ScrollButton from "../../components/ScrollButton";
import { shopFilters } from "../../Constants/NavPages";
import { GiMedicines } from "react-icons/gi";
import useShopFilters from "../../Hooks/useShopFilters";
import LoadingScreenAnimation from "../../Animations/LoadingScreenAnimation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSearchStore from "../../Store/useSearchStore";
import { useEffect, useState } from "react";
const accent = "#00a297";
function Shop() {
  const page = useSearchStore((state) => state.page);
  const setPage = useSearchStore((state) => state.setPage);
  const { filters, clearAll } = useShopFilters();
  const fetchProducts = async () => {
    const url = import.meta.env.VITE_API_URL;
    const { data } = await axios.get(
      `${url}/products${filters ? `?${filters}` : ""}`
    );
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
    refetchOnWindowFocus: true,
  });
  const itemsPerPage = 12;
  const totalPages = Math.max(
    Math.ceil(data?.data?.products?.length / itemsPerPage),
    1
  );

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = data?.data?.products.slice(start, end) || [];

  const [showFilters, setShowFilters] = useState(true);
  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    return () => {
      clearAll();
      setPage(1);
    };
  }, []);
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page, setPage]);
  if (isLoading) return <LoadingScreenAnimation />;
  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title="shop" />
      <div className="w-max mb-5 mt-14 mx-8 md:mx-24 flex gap-5 ">
        <>
          <button
            className="w-max bg-[#00a297] text-white rounded-md px-6 text-lg cursor-pointer "
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={() => clearAll()}
            className="w-max bg-red-500 text-white rounded-md px-6 text-lg cursor-pointer "
          >
            Clear Filters
          </button>
        </>
      </div>

      <div className="mx-8 md:mx-24 flex flex-col gap-5 md:gap-0 md:grid grid-cols-5">
        {showFilters && (
          <div className="flex flex-col gap-5 w-full border-r-stone-200 md:border-r-2 md:pr-4">
            {shopFilters.map((title, index) => (
              <MyCollapse key={index} title={title} />
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
                Showing {data?.data?.products?.length > 0 ? start + 1 : 0}–
                {Math.min(end, data?.data?.products?.length) || 0} of{" "}
                {data?.data?.products?.length || 0} results
              </p>
              <MySelectElement />
            </div>
            {currentProducts.length > 0 && (
              <div className="pl-4">
                <ProductsContainer products={currentProducts} />
              </div>
            )}

            {currentProducts.length === 0 && (
              <div
                className="
        mt-28 p-8 max-w-xl mx-auto text-center
        rounded-2xl shadow-md
        flex flex-col items-center justify-center border
      "
                style={{
                  borderColor: accent,
                  backgroundColor: `${accent}15`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow"
                  style={{ backgroundColor: `${accent}22` }}
                >
                  <GiMedicines className={`text-4xl text-[${accent}]`} />
                </div>

                <h2
                  className="text-2xl font-semibold mb-2"
                  style={{ color: accent }}
                >
                  No Products Found
                </h2>

                <p className="text-sm text-gray-700 max-w-md">
                  Try changing filters or search for something else.
                </p>
              </div>
            )}
          </div>

          <MyPagination
            count={totalPages || 1}
            page={page || 1}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}

export default Shop;
