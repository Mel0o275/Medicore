import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Panadol",
      price: 50,
      image:
        "https://cdn11.bigcommerce.com/s-vhzbg5/images/stencil/1280x1280/products/1687/4607/apiifop6i__35317.1499347716.jpg?c=2",
      quantity: 1,
    },
    {
      id: 2,
      name: "Vitamin C",
      price: 80,
      image:
        "https://cdn11.bigcommerce.com/s-vhzbg5/images/stencil/1280x1280/products/1687/4607/apiifop6i__35317.1499347716.jpg?c=2",
      quantity: 1,
    },
    {
      id: 3,
      name: "Aspirin",
      price: 60,
      image:
        "https://cdn11.bigcommerce.com/s-vhzbg5/images/stencil/1280x1280/products/1687/4607/apiifop6i__35317.1499347716.jpg?c=2",
      quantity: 1,
    },
  ]);

  const discount = 0.05;

  function handleIncrease(id) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function handleDecrease(id) {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  }

  function handleRemove(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }


  function handleClear() {
    setCart([]);
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalAfterDiscount = subtotal - subtotal * discount;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.price} EGP each
                  </p>

                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      −
                    </button>
                    <span className="mx-4 text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="font-semibold text-[#00A297] text-lg">
                    {item.price * item.quantity} EGP
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="cursor-pointer text-red-500 text-sm mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-800">{subtotal} EGP</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400
                focus:bg-white focus:ring-2 focus:ring-[#00A297] outline-none transition"
            />
            <button className="cursor-pointer px-5 py-2 rounded-full bg-[#00A297] text-white hover:bg-[#00887F] shadow-sm transition">
              Apply
            </button>
          </div>

          <hr className="my-5 border-gray-200" />

          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total (after 5% discount)</span>
            <span className="text-[#00A297]">{totalAfterDiscount.toFixed(2)} EGP</span>
          </div>

          <div className="flex flex-col items-center w-full">
            <button
              onClick={handleClear}
              className="cursor-pointer w-full mt-6 px-6 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="cursor-pointer w-full mt-3 px-6 py-3 rounded-xl bg-[#00A297] text-white font-medium hover:bg-[#00887F] shadow-md transition text-center"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
