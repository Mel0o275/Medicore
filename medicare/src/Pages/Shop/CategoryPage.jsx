import PageTitle from "../../Components/PageTitle";
import MySelectElement from "../../Components/shop/MySelectElement";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import MyPagination from "../../Components/MyPagination";
import ScrollButton from "../../Components/ScrollButton";
import useShopFilters from "../../Hooks/useShopFilters";
import { GiMedicines } from "react-icons/gi";
import useSearchStore from "../../Store/useSearchStore";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ShopError from "../../Components/shop/ShopError";
import useAllProducts from "../../Hooks/useAllProducts";
import ShopLoading from "../../Components/shop/ShopLoading";
const accent = "#00a297";
function CategoryPage() {
  const { filters, clearAll } = useShopFilters();
  const { data, isLoading, isError, error } = useAllProducts(filters);
  const products = data?.data?.products || [];

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const page = useSearchStore((state) => state.page);
  const setPage = useSearchStore((state) => state.setPage);
  const itemsPerPage = 12;
  const totalPages = Math.max(Math.ceil(products?.length / itemsPerPage), 1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = products?.slice(start, end) || [];

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (isLoading) return <ShopLoading />;
  if (isError) return <ShopError error={error} />;
  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title={category} />

      <div className="mx-8 md:mx-24 flex flex-col gap-5 md:gap-0 md:grid grid-cols-5 mt-10">
        <div className={`${"col-span-5"} flex flex-col justify-between gap-10`}>
          <div>
            <div className="flex items-center justify-between w-full mb-10">
              <p className="text-[#00a297]/80 font-medium pl-4">
                Showing {products?.length > 0 ? start + 1 : 0}–
                {Math.min(end, products?.length) || 0} of{" "}
                {products?.length || 0} results
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
