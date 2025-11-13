import PageTitle from "../../components/PageTitle";
import { FaCartPlus, FaShareAlt } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import MyRating from "../../components/MyRating";
import MyTab from "../../components/Tab/MyTab";
import ProductCard from "../../components/Products/ProductCard";
import ScrollButton from "../../components/ScrollButton";
import { features, products, reviews } from "../../Constants/NavPages";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ShareModal from "./ShareModal";
import { FaRegEye } from "react-icons/fa";
function ProductDetailsPage() {
  const [openmodal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const handleInc = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDec = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    else setQuantity(1);
  };
  return (
    <section className="pb-14 bg-stone-100/50">
      <ScrollButton />
      {openmodal && (
        <ShareModal
          open={openmodal}
          handleClose={() => setOpenModal(false)}
          shareUrl={window.location.href}
        />
      )}
      <PageTitle title="Product Detail" />

      <div className="mx-8 md:mx-24">
        <div className="flex flex-col md:flex-row gap-8 items-stretch mt-14">
          <div className="flex-1 flex flex-col gap-6">
            <div className="relative max-h-[55vh] group border-2 border-stone-200 rounded-md overflow-hidden flex-1">
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

            <div className="mt-4 space-y-1 text-gray-500 text-xl">
              <p>{product.desc}.</p>
              <p className="flex items-center gap-3 pt-4">
                <FaRegEye className=" text-xl text-[#00a297]" /> 20 people
                visited this page
              </p>
            </div>
            <div className="flex justify-center gap-5 my-2">
              <button
                className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row"
                onClick={() => handleDec()}
              >
                <FaCircleMinus />
              </button>
              <span className="font-bold border border-1 rounded-full p-1 px-2">
                {quantity}
              </span>
              <button
                className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row"
                onClick={() => handleInc()}
              >
                <FaCirclePlus />
              </button>
            </div>
            <div className="flex gap-5">
              <button className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row">
                <FaCartPlus /> <span>Add To Cart</span>
              </button>
              <button className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row">
                <MdFavorite /> <span>Add To Wishlist</span>
              </button>
              <button
                className="px-3 py-1.5 bg-[#00a297] text-white md:text-lg rounded-md items-center gap-1 flex md:gap-4 flex-col md:flex-row"
                onClick={() => setOpenModal(true)}
              >
                <FaShareAlt /> <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          <MyTab
            page="details"
            reviews={reviews}
            productTitle={product.title}
          />
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
