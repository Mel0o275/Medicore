import * as React from "react";
import PageTitle from "../../components/PageTitle";
import { FaCartPlus, FaShareAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import MyRating from "../../components/MyRating";
import MyTab from "../../components/Tab/MyTab";
import ProductCard from "../../components/Products/ProductCard";
import ScrollButton from "../../components/ScrollButton";
import {
  features,
  relatedProducts,
  products,
  reviews,
} from "../../Constants/NavPages";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const [quantities, setQuantities] = React.useState({});
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const increment = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrement = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));

  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      <PageTitle title="Product Detail" />

      <div className="mx-8 md:mx-24">
        <div className="flex flex-col md:flex-row gap-8 items-stretch mt-14">
          <div className="flex-1 flex flex-col gap-6">
            <div className="relative min-h-[50vh] group border-2 border-stone-200 rounded-md overflow-hidden flex-1">
              <img
                src={product.images[0]}
                alt="Front"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={product.images[1]}
                alt="Back"
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="grid grid-cols-3 text-center bg-[#00a297]/20 border rounded-lg divide-x divide-[#00a297]/40">
              {features.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-center gap-2 py-4 px-10"
                >
                  {f.icon}
                  <span className="font-medium text-[#00a297]">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <span className="bg-[#00a297] text-white w-max text-xs px-2 py-1 rounded-md">
              -13%
            </span>
            <p className="text-stone-400 font-semibold">
              Brand: <span className="text-[#00a297]">{product.brand}</span>
            </p>
            <p className="text-stone-400 font-semibold">
              Category:{" "}
              <span className="text-[#00a297]">{product.category}</span>
            </p>
            <h2 className="text-3xl font-semibold">{product.title}</h2>

            <div className="flex items-center w-full gap-10">
              <p className="text-2xl font-semibold">{product.price}</p>
              <MyRating value={product.ratings} />
            </div>

            <ul className="mt-4 space-y-1 text-gray-700">
              <li>{product.desc}</li>
            </ul>

            <div className="my-6 space-y-4">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
                >
                  <div className="flex gap-4">
                    <img src={item.img} className="w-[5em]" />
                    <div className="font-semibold">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-stone-500">${item.price}</p>
                      <span className="text-[#00a297] text-sm">
                        {item.stock} in stock
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => decrement(item.id)} className="p-2">
                      -
                    </button>
                    <span className="px-4">{quantities[item.id] || 0}</span>
                    <button onClick={() => increment(item.id)} className="p-2">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-5">
              <button className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row">
                <FaCartPlus /> <span>Add To Cart</span>
              </button>
              <button className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row">
                <MdFavorite /> <span>Add To Wishlist</span>
              </button>
              <button className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row">
                <FaShareAlt /> <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <MyTab page="details" reviews={reviews} />
        </div>
        <h3 className="text-xl mb-5 font-semibold">Related Products</h3>
        <div className=" flex gap-3 overflow-x-auto hide-scrollbar">
          {products.map((product, i) => (
            <div className="w-full md:w-[30%]" key={i}>
              <ProductCard key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
