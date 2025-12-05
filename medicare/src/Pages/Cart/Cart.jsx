import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartLoading from "../../Components/CartLoading/CartLoading";
import { CartContext } from "../../Context/cartContext";

export default function Cart() {

  const API = import.meta.env.VITE_API_URL;
  console.log(API);

  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserCart() {
    try {
      //get user data from the cart
      const { data } = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: token
        }
      });
      console.log(data.products);
      setCartItems(data.products);
      console.log(cartItems);
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  }

  const [clearLoading, setClearLoading] = useState(false);

  async function clearCart() {
    setClearLoading(true);
    try {
      const { data } = await axios.delete(`${API}/cart`, {
        headers: {
          Authorization: token
        }
      });
      console.log(data);
      setCartItems([]);
      console.log(count);
      setCount(0);

      if (data.message === 'success') {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setClearLoading(false);
    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.count || 1),
    0
  );

  const discount = 0.05;
  const totalAfterDiscount = subtotal - subtotal * discount;

  const {count : count, setCount : setCount} = useContext(CartContext);
  console.log(count);

  async function increseCart(itemId) {
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.patch(`${API}/cart/${itemId}/+`, {}, {
        headers: { Authorization: token }
      });
      if (data.message === 'success') {
        setCount(count + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function decreseCart(itemId) {
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.patch(`${API}/cart/${itemId}/-`, {}, {
        headers: { Authorization: token }
      });
      if (data.message === 'success') {
        setCount(count - 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeItem(itemId, myCount) {
   try {
    const data = await axios.delete(`${API}/cart/${itemId}`,{
      headers : {
        Authorization : token
      }
    });
    console.log(data);
    console.log(cartItems);
    setCartItems(prev => prev.filter(item => item.product_id !== itemId));
    setCount(count-myCount)
   } catch (err) {
    console.log(err);
   }
  }

  useEffect(() => {
    getUserCart();
  }, [count]);
  if (loading) return <CartLoading />;

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-48 sm:h-60 md:h-80">
              <p className="text-gray-500 text-center text-sm sm:text-base">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product_id}
                className="p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                <div className="w-full sm:w-auto flex justify-center sm:block">
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-lg sm:rounded-xl object-cover border"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-2 sm:line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {item.price} EGP each
                  </p>

                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => decreseCart(item.product_id)}
                      className="cursor-pointer h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm sm:text-base"
                    >
                      −
                    </button>
                    <span className="mx-3 sm:mx-4 text-gray-800 font-medium text-sm sm:text-base">
                      {item.count || 1}
                    </span>
                    <button
                      onClick={() => increseCart(item.product_id)}
                      className="cursor-pointer h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm sm:text-base"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex justify-between sm:block text-right mt-3 sm:mt-0">
                  <p className="font-semibold text-[#00A297] text-base sm:text-lg">
                    {(item.price * (item.count || 1)).toFixed(2)} EGP
                  </p>
                  <button
                    onClick={() => removeItem(item.product_id, item.count)}
                    className="cursor-pointer text-red-500 text-xs sm:text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 h-fit sticky top-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between text-xs sm:text-sm py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">{subtotal.toFixed(2)} EGP</span>
            </div>

            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:bg-white focus:ring-2 focus:ring-[#00A297] outline-none transition"
              />
              <button className="cursor-pointer px-3 sm:px-4 py-2 rounded-full bg-[#00A297] text-white text-sm sm:text-base hover:bg-[#00887F] shadow-sm transition whitespace-nowrap">
                Apply
              </button>
            </div>

            <hr className="my-4 sm:my-5 border-gray-200" />

            <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800">
              <span className="text-xs sm:text-sm md:text-base">Total (after 5% discount)</span>
              <span className="text-[#00A297] text-sm sm:text-base md:text-lg">
                {totalAfterDiscount.toFixed(2)} EGP
              </span>
            </div>

            <div className="flex flex-col items-center w-full mt-4 sm:mt-5">
              <button
                onClick={clearCart}
                disabled={clearLoading}
                className={`w-full mt-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white font-medium transition text-sm sm:text-base
                  ${clearLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {clearLoading ? 'Clearing...' : 'Clear Cart'}
              </button>

              <Link
                to="/checkout"
                className="cursor-pointer w-full mt-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#00A297] text-white font-medium hover:bg-[#00887F] shadow-md transition text-center text-sm sm:text-base"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
