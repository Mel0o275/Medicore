import MyRating from "../MyRating";
import { MdFavorite, MdRemoveRedEye } from "react-icons/md";

import { NavLink } from "react-router-dom";
const ProductCard = ({
  product: {
    id,
    priceRange,
    rating,
    name,
    images: { front, back },
  },
}) => {
  return (
    <div className="w-full rounded-lg border border-stone-200 overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 sm:h-44 md:h-48">
        <img
          src={front}
          alt="Front"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={back}
          alt="Back"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="absolute flex flex-col right-[-40px] transition-all duration-300 group-hover:right-3 gap-2 top-3">
          <MdFavorite className="text-black bg-gray-300 p-1.5 rounded-full transition-colors duration-500 hover:bg-[#00a297] hover:text-white" />
          <MdRemoveRedEye className="text-black bg-gray-300 p-1.5 rounded-full transition-colors duration-500 hover:bg-[#00a297] hover:text-white" />
        </div>
      </div>

      <div className="p-3 flex flex-col justify-center">
        <h3 className="font-semibold mb-1 text-sm md:text-base line-clamp-2">
          {name}
        </h3>
        <div className="py-4">
          <MyRating value={rating} />
        </div>
        <p className="text-gray-700 text-sm md:text-base font-bold">
          {priceRange}
        </p>
        <div className="mt-2 flex justify-center items-center">
          <NavLink
            to={`/shop/productdetails/${id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="px-3 py-1.5 bg-[#00a297] text-white text-sm rounded-md 
         transform transition-all duration-300 
         translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            View Product
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
