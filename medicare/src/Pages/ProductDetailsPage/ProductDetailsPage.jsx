import PageTitle from "../../Components/PageTitle";
import { FaCartPlus, FaShareAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import MyTab from "../../Components/Tab/MyTab";
import ProductCard from "../../Components/Products/ProductCard";
import ScrollButton from "../../Components/ScrollButton";
import { features, reviews } from "../../Constants/NavPages";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import ShareModal from "./ShareModal";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/cartContext";
import { WishContext } from "../../Context/wishContext";
import useViewProduct from "../../Hooks/product/useViewProduct";
import ShopError from "../../Components/shop/ShopError";
import ShopLoading from "../../Components/shop/ShopLoading";
import MyRating from "../../Components/MyRating/MyRating";
import useTheme from "../../Store/useTheme";
import { Button } from "@mui/material";

function ProductDetailsPage() {
  const theme = useTheme();

  const mainColor =
    theme.mode !== "dark" ? theme.primaryText : theme.primaryColor;

  const softBg = `${mainColor}33`; // 20%
  const softBorder = `${mainColor}66`; // 40%

  const { id } = useParams();
  const { data, isLoading, isError, error } = useViewProduct(id);
  const product = data?.data?.product;
  const relatedProducts = data?.data?.relatedProducts;
  const [openmodal, setOpenModal] = useState(false);

  const { count, setCount } = useContext(CartContext);
  const { likedItems, toggleLike } = useContext(WishContext);
  const isLiked = likedItems.includes(product?._id || id);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // async function handleInc() {
  //   // setQuantity((prev) => prev + 1);

  //   if (!token?.trim()) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const { data } = await axios.patch(`${API}/cart/${id}/+`, {}, {
  //       headers: {
  //         Authorization: token
  //       }
  //     })
  //     console.log(1);
  //     console.log(data.message);

  //     if (data.message == 'success') {
  //       setQuantity((prev) => prev + 1);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // async function handleDec() {
  //   // if (quantity > 1) setQuantity((prev) => prev - 1);
  //   // else setQuantity(1);

  //   if (!token?.trim()) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (quantity <= 1) return;

  //   try {
  //     const { data } = await axios.patch(`${API}/cart/${id}/-`, {}, {
  //       headers: { Authorization: token }
  //     });
  //     if (data.message === 'success') {
  //       setQuantity(prev => prev - 1);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  // };

  async function addToCart() {
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API}/cart`,
        { _id: id },
        { headers: { Authorization: token } },
      );

      if (data.products.length !== -1) {
        toast("Product added to cart succsessfully✨", {
          position: "top-center",
          duration: 3000,
        });
        setCount(count + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleToggleWish = async () => {
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    const productId = product?._id || id;
    if (!productId) return;

    const wasLiked = likedItems.includes(productId);
    await toggleLike(productId);

    toast(
      wasLiked
        ? "Product removed from wishlist"
        : "Product added to wishlist successfully✨",
      { position: "top-center", duration: 3000 },
    );
  };

  if (isLoading) return <ShopLoading />;
  if (isError) return <ShopError error={error} />;

  return (
    <section className="pb-14 ">
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
            <div className="relative max-h-[55vh] min-h-[400px] group border-2 border-stone-200 rounded-md overflow-hidden flex-1">
              <img
                src={product.images[0].url}
                alt="Front"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={product.images[1].url}
                alt="Back"
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div
              className="grid grid-cols-3 text-center border rounded-lg divide-x"
              style={{
                backgroundColor: softBg,
                borderColor: softBorder,
                divideColor: softBorder,
              }}
            >
              {features.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-center gap-2 py-4 px-10"
                  style={{ color: mainColor }}
                >
                  {f.icon}
                  <span className="font-medium" style={{ color: mainColor }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex-1 flex flex-col gap-4"
            style={{ color: mainColor }}
          >
            <span
              className="w-max text-xs px-2 py-1 rounded-md"
              style={{ backgroundColor: mainColor, color: theme.mode !== "dark" ? "white" : "#0F172A" }}
            >
              -13%
            </span>

            <p className="text-stone-400 font-semibold">
              Brand: <span style={{ color: mainColor }}>{product.brand}</span>
            </p>

            <p className="text-stone-400 font-semibold">
              Category:{" "}
              <span style={{ color: mainColor }}>{product.category}</span>
            </p>

            <h2 className="text-3xl font-semibold">{product.title}</h2>

            <div className="flex items-center w-full gap-10">
              <p className="text-2xl font-semibold">{product.price} L.E</p>
              <MyRating value={product.ratings} />
            </div>

            <div className="mt-4 space-y-1  text-xl">
              <p>{product.desc}.</p>
              <p className="flex items-center gap-3 pt-4">
                <FaRegEye className="text-xl" style={{ color: mainColor }} />
                {product.visits} people visited this page
              </p>
            </div>

            <div className="flex gap-5 justify-center">
              <Button
                onClick={addToCart}
                
                sx={{
     backgroundColor:theme.mode!=='dark'?theme.primaryText:theme.primaryColor,
      color: theme.mode !== "dark" ? "white" : "#0F172A",gap:1}}
              >
                <FaCartPlus />
                <span className="hidden lg:block">Add To Cart</span>
              </Button>

              <Button
                onClick={handleToggleWish}
                sx={{
     backgroundColor:theme.mode!=='dark'?theme.primaryText:theme.primaryColor,
      color: theme.mode !== "dark" ? "white" : "#0F172A",gap:1}}
              >
                <MdFavorite />
                <span className="hidden lg:block">
                  {isLiked ? "In Wishlist" : "Add To Wishlist"}
                </span>
              </Button>

              <Button
                sx={{
     backgroundColor:theme.mode!=='dark'?theme.primaryText:theme.primaryColor,
      color: theme.mode !== "dark" ? "white" : "#0F172A",gap:1}}
                onClick={() => setOpenModal(true)}
              >
                <FaShareAlt />
                <span className="hidden lg:block">Share</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-10">
          <MyTab
            page="details"
            reviews={reviews}
            productTitle={product.title}
            productId={product._id}
          />
        </div>

        {relatedProducts && relatedProducts.length !== 0 && (
          <>
            <h3 className="text-xl mb-5 font-semibold"  style={{
          color: theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
        }}>Related Products</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar">
              {relatedProducts.map((product, i) => (
                <div className="w-full md:w-[30%]" key={i}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetailsPage;
