import { useContext } from "react";
import MyRating from "../MyRating";
import { MdFavorite } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/wishContext";

const ProductCard = ({ product: { _id, price, title, images, ratings } }) => {
  const navigate = useNavigate();
  const { likedItems, toggleLike } = useContext(WishContext);

  const handleLike = () => {
    const token = localStorage.getItem("token");
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    const currentlyLiked = likedItems.includes(_id);
    toggleLike(_id);

    const action = currentlyLiked ? "removed from" : "added to";
    toast(`Product ${action} wishlist ✨`, { position: "top-center", duration: 2000 });
  };

  return (
    <div className="w-full rounded-lg border border-stone-200 overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-[400px]">
      <div className="relative h-48 sm:h-52 md:h-56 flex-shrink-0">
        <img
          src={images[0].url}
          alt="Front"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={images[1].url}
          alt="Back"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute right-3 top-3 transition-all duration-300">
          <MdFavorite
            onClick={handleLike}
            className={`cursor-pointer text-3xl p-1.5 rounded-full transition-colors duration-500
              ${likedItems.includes(_id) ? "bg-[#00a297] text-white" : "bg-gray-300 text-black"}
              hover:bg-[#00a297] hover:text-white`}
          />
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold mb-1 text-sm md:text-base line-clamp-2">{title}</h3>
        <div className="py-2">
          <MyRating value={ratings} />
        </div>
        <p className="text-gray-700 text-sm md:text-base font-bold">{price} L.E</p>
        <div className="mt-auto flex justify-center items-center">
          <NavLink
            to={`/shop/productdetails/${_id}`}
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
