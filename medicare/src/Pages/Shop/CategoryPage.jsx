import PageTitle from "../../components/PageTitle";
import MySelectElement from "../../components/shop/MySelectElement";
import ProductsContainer from "../../components/Products/ProductsContainer";
import MyPagination from "../../components/MyPagination";
import ScrollButton from "../../components/ScrollButton";
import useShopFilters from "../../Hooks/useShopFilters";
import LoadingScreenAnimation from "../../Animations/LoadingScreenAnimation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GiMedicines } from "react-icons/gi";
import useSearchStore from "../../Store/useSearchStore";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
const accent = "#00a297";
function CategoryPage() {
  const page = useSearchStore((state) => state.page);
  const setPage = useSearchStore((state) => state.setPage);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { filters, clearAll } = useShopFilters();
  const fetchProducts = async () => {
    const url = import.meta.env.VITE_API_URL;
    const { data } = await axios.get(
      `${url}/products${filters ? `?${filters}` : ""}`
    );
    return data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
  });
  const itemsPerPage = 12;
  const totalPages = Math.max(
    Math.ceil(data?.data?.products?.length / itemsPerPage),
    1
  );

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = data?.data?.products.slice(start, end) || [];

  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);
  if (isLoading) return <LoadingScreenAnimation />;
  if (isError) {
    return (
      <section className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center bg-stone-100/50 p-6 rounded-lg mx-8 md:mx-24">
        <MdOutlineReportGmailerrorred className="text-6xl text-[#00a29755]" />
        <h2 className="text-3xl font-bold text-[#00a29755]">
          Oops! Something went wrong.
        </h2>
        <p className="text-stone-600 text-lg">
          {error?.response?.data?.message ||
            "Unable to load the product. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#00a297] text-white rounded-md hover:bg-[#008377] transition"
        >
          Retry
        </button>
      </section>
    );
  }
  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title={category} />

      <div className="mx-8 md:mx-24 flex flex-col gap-5 md:gap-0 md:grid grid-cols-5 mt-10">
        <div className={`${"col-span-5"} flex flex-col justify-between gap-10`}>
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

export default CategoryPage;
