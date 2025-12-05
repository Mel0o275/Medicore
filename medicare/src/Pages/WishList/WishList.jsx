import React, { useContext, useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WishContext } from "../../Context/wishContext";
import WishlistLoading from "../../Components/WishLoading/WishLoading";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/cartContext";

export default function WishList() {

    const API = import.meta.env.VITE_API_URL;
    console.log(API);
    const { count: Wishcount, setCount: setWishCount } = useContext(WishContext);


    const token = localStorage.getItem("token");
    const [wishItems, setWishItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delet, setDelete] = useState(false);

    async function getUserwish() {
        try {
            //get user data from the cart
            const { data } = await axios.get(`${API}/wish`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(data);
            setWishItems(data.products);
            console.log(wishItems);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserwish();
    }, []);



    async function handledelete(itemId) {
        try {
            await axios.delete(`${API}/wish/${itemId}`, {
                headers: { Authorization: token }
            });
            setWishCount(prev => prev - 1);
            setDelete(true);
            setWishItems(prev => prev.filter(item => item.product_id !== itemId));

        } catch (err) {
            console.error(err);
        }
        finally {
            setDelete(false)
        }
    }
    const { count: count, setCount: setCount } = useContext(CartContext);

    async function addToCart(id) {
        if (!token?.trim()) {
            navigate("/login");
            return;
        }

        try {
            const { data } = await axios.post(
                `${API}/cart`,
                {
                    _id: id,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log(1);
            console.log(data);
            if (data.products.length != -1) {
                toast(`Product added to cart succsessfully✨`, {
                    position: "top-center",
                    duration: 3000,
                });
                setCount(count + 1);
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) return <WishlistLoading />;


    return (
        <div className="max-w-5xl mx-auto mt-4 md:mt-8 px-4 sm:px-6 lg:px-8 py-6 md:p-20">
            {wishItems.length === 0 ? (
                <div className="p-4 sm:p-6 md:p-8 bg-white rounded-xl md:rounded-2xl shadow-md text-center text-gray-600">
                    <Heart className="mx-auto mb-3 text-[#00A297]" size={32} md:size={40} />
                    <p className="text-base sm:text-lg md:text-lg font-medium mb-2">Your wishlist is empty!</p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        Start adding your favorite products.
                    </p>
                    <Link to='/shop'>
                        <button className="cursor-pointer px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-[#00A297] text-white rounded-lg md:rounded-xl font-medium hover:bg-[#00887F] shadow-md transition text-sm sm:text-base">
                            Browse Products
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:gap-6 p-4 sm:p-6 md:p-10">
                    {wishItems.map((item) => (
                        <div
                            key={item.product_id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                                <img
                                    src={item.images[0].url}
                                    alt={item.title}
                                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-lg md:rounded-xl object-cover bg-gray-100 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        {item.price} EGP
                                    </p>
                                </div>
                            </div>
    
                            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => addToCart(item.product_id)}
                                    className="cursor-pointer px-3 sm:px-4 py-2 rounded-lg md:rounded-xl bg-[#00A297] text-white text-xs sm:text-sm font-medium hover:bg-[#00887F] transition shadow-md flex-1 sm:flex-none text-center"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handledelete(item.product_id)}
                                    disabled={delet}
                                    className={`p-2 rounded-lg md:rounded-xl border transition flex-shrink-0
                                        ${delet
                                            ? "cursor-not-allowed bg-gray-300 border-gray-400 text-gray-600"
                                            : "cursor-pointer bg-[#FFF9E6] border-[#FFD166] text-[#8B6E00] hover:bg-[#FFEFBF]"
                                        }`}
                                >
                                    <Trash2 size={16} sm:size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
