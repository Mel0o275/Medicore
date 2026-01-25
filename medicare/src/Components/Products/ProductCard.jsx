import { useContext } from "react";
import MyRating from "../MyRating/MyRating";
import { MdFavorite } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/wishContext";
import useTheme from "../../Store/useTheme";

const ProductCard = ({ product: { _id, price, title, images, ratings } }) => {
  const navigate = useNavigate();
  const { likedItems, toggleLike } = useContext(WishContext);
  const theme = useTheme();

  const handleLike = () => {
    const token = localStorage.getItem("token");
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    const currentlyLiked = likedItems.includes(_id);
    toggleLike(_id);

    const action = currentlyLiked ? "removed from" : "added to";
    toast(`Product ${action} wishlist ✨`, {
      position: "top-center",
      duration: 2000,
    });
  };

  return (
    <div className="w-full rounded-lg   overflow-hidden group cursor-pointer shadow-lg hover:shadow-lg transition-shadow duration-300 flex flex-col h-[400px]"  style={{
            border:'1px solid',
            borderColor:theme.mode!=='dark' ?'':theme.primaryColor,
              color:
                theme.mode !== "dark" ? 'white' : "#0F172A",
            }}>
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
              ${
                likedItems.includes(_id)
                  ? ` color:${theme.mode !== "dark" ? theme.primaryText : theme.primaryColor}
                    backgroundColor: ${
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText
                    }
                `
                  : `color:${theme.mode !== "dark" ? theme.primaryText : theme.primaryColor}
                    backgroundColor: ${
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText
                    }`
              }
             hover:text-white`}
          />
        </div>
      </div>

      <div
        className="p-3 flex flex-col flex-1 shadow-inner "
        style={{
          color: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
        }}
      >
        <h3 className="font-semibold mb-1 text-sm md:text-base line-clamp-2 ">
          {title}
        </h3>
        <div className="py-2">
          <MyRating value={ratings} />
        </div>
        <p className="text-gray-500 text-sm md:text-base font-bold">
          {price} L.E
        </p>
        <div className="mt-auto flex justify-center items-center">
          <NavLink
            to={`/shop/productdetails/${_id}`}
            onClick={() => window.scrollTo(0, 0)}
            style={{
              backgroundColor:theme.primaryColor,
              color:
                theme.mode !== "dark" ? 'white' : "#0F172A",
            }}
            className="px-3 py-1.5 text-sm rounded-md transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            View Product
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
