import PageTitle from "../../components/PageTitle";
import MyCollapse from "../../components/shop/MyCollapse";
import { useState } from "react";
import MySelectElement from "../../components/shop/MySelectElement";
import ProductsContainer from "../../components/Products/ProductsContainer";
import MyPagination from "../../components/MyPagination";
import ScrollButton from "../../Components/ScrollButton";

function Shop() {
  const [showFilters, setShowFilters] = useState(true);
  const shopFilters = [
    "Shop By Categories",
    "Brands",
    "Highlight",
    "Price Filter",
    "Average Rating",
  ];

  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title="shop" />
      <button
        className="w-max bg-[#00a297] text-white rounded-md px-6 text-lg cursor-pointer mb-5 mt-14 mx-8 md:mx-24"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        Filter
      </button>

      <div className="mx-8 md:mx-24 flex flex-col gap-5 md:gap-0 md:grid grid-cols-5 ">
        <div className="flex flex-col gap-5 w-full border-r-stone-200 md:border-r-2 md:pr-4">
          {showFilters &&
            shopFilters.map((title, index) => (
              <MyCollapse key={index} title={title} className="w-[50%]" />
            ))}
        </div>
        <div
          className={`${
            showFilters ? "col-span-4" : "col-span-5"
          } flex flex-col justify-between gap-10`}
        >
          <div className="">
            <div className="flex items-center justify-between w-full mb-10 ">
              <p className="text-[#00a297]/80 font-medium pl-4 ">
                Showing 1–12 of 24 results
              </p>
              <MySelectElement />
            </div>
            <div className="pl-4">
              <ProductsContainer />
            </div>
          </div>

          <MyPagination />
        </div>
      </div>
    </section>
  );
}

export default Shop;
