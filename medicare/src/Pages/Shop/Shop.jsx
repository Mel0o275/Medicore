import PageTitle from "../../Components/PageTitle";
import MyCollapse from "../../Components/shop/MyCollapse";
import MySelectElement from "../../Components/shop/MySelectElement";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import MyPagination from "../../Components/MyPagination";
import ScrollButton from "../../Components/ScrollButton";
import { shopFilters } from "../../Constants/NavPages";
import { GiMedicines } from "react-icons/gi";
import useShopFilters from "../../Hooks/useShopFilters";
import useSearchStore from "../../Store/useSearchStore";
import { useEffect, useState } from "react";
import useAllProducts from "../../Hooks/useAllProducts";
import ShopError from "../../Components/shop/ShopError";
import ShopLoading from "../../Components/shop/ShopLoading";
import useTheme from "../../Store/useTheme";
const accent = "#00a297";
function Shop() {
  const theme = useTheme();
  const { filters, clearAll } = useShopFilters();
  const { data, isLoading, isError, error } = useAllProducts(filters);
  const products = data?.data?.products;

  const page = useSearchStore((state) => state.page);
  const setPage = useSearchStore((state) => state.setPage);
  const itemsPerPage = 12;
  const totalPages = Math.max(Math.ceil(products?.length / itemsPerPage), 1);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = products?.slice(start, end) || [];

  const [showFilters, setShowFilters] = useState(true);
  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page, setPage]);
  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (isLoading) return <ShopLoading />;
  if (isError) return <ShopError error={error} />;

  return (
    <section
      className="pb-14"
      style={{
        color: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
      }}
    >
      <ScrollButton />
      <PageTitle title="shop" />
      <div className="w-max mb-5 mt-14 mx-8 md:mx-24 flex gap-5 ">
        <>
          <button
            className="w-max rounded-md px-6 text-lg cursor-pointer "
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
              <p className=" font-medium pl-4">
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
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow"
                  style={{
                    backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                  }}
                >
                  <GiMedicines className={`text-4xl `} />
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                  No Products Found
                </h2>

                <p className="text-sm  max-w-md">
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
