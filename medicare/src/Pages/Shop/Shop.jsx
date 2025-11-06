import PageTitle from "../../components/PageTitle";
import MyCollapse from "../../components/shop/MyCollapse";
import MySelectElement from "../../components/shop/MySelectElement";
import ProductsContainer from "../../components/Products/ProductsContainer";
import MyPagination from "../../components/MyPagination";
import ScrollButton from "../../components/ScrollButton";
import { shopFilters } from "../../Constants/NavPages";
import useShopFilters from "../../Hooks/useShopFilters";

function Shop() {
  const {
    showFilters,
    setShowFilters,
    searchParams,
    setSearchParams,
    page,
    products,
    currentProducts,
    totalPages,
    start,
    end,
    handlePageChange,
    clearFilter,
  } = useShopFilters();

  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title="shop" />
      <div className="w-max mb-5 mt-14 mx-8 md:mx-24 flex gap-5 ">
        <button
          className="w-max bg-[#00a297] text-white rounded-md px-6 text-lg cursor-pointer "
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <button
          className="w-max bg-[#00a297] text-white rounded-md px-6 text-lg cursor-pointer "
          onClick={() => clearFilter()}
        >
          clear filters
        </button>
      </div>

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
                Showing {start + 1}–{Math.min(end, products.length)} of{" "}
                {products.length} results
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
