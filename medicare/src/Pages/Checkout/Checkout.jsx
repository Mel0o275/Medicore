//Checkout

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios";
import { CartContext } from "../../Context/cartContext";


export default function Checkout() {

    const schema = z.object({
        details: z.string().min(5, "Address Must Be At Least 5 Characters"),
        phone: z.string().min(10, "Phone Number Must Be At Least 10 Digits").regex(/^[0-9]+$/, "Phone Number Must Contain Only Digits"),
        city: z.string().min(2, "City Must Be At Least 2 Characters"),
        payment: z.enum(["cash", "card"])
    })

    const form = useForm({
        defaultValues: {
            details: "",
            phone: "",
            city: "",
            payment: "cash"
        },
        resolver: zodResolver(schema)
    })

    const { register, handleSubmit, formState: { errors } } = form;

    const API = import.meta.env.VITE_API_URL;
    console.log(API);
    const token = localStorage.getItem("token");
    const { count, setCount, getUserCart, setCartItems, cartItems } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    console.log(count);

    useEffect(() => {
        console.log("User Cart:", cartItems);
    }, [cartItems]);


    async function onsubmit(values) {
        try {
            setLoading(true);

            let { data } = await axios.post(`${API}/checkout`, values, {
                headers: { Authorization: token }
            });

            if (data.status === "success") {

                let res = await axios.delete(`${API}/cart`, {
                    headers: { Authorization: token }
                });

                setCartItems([]);
                setCount(0);
                await getUserCart();

                window.location.href = "/Home";
            }

        } catch (err) {
            console.log("Checkout Error:", err.response?.data || err);

        } finally {
            setLoading(false);
        }
    }

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * (item.count || 1),
        0
    );

    const discount = 0.05;
    const totalAfterDiscount = subtotal - subtotal * discount;


    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="max-w-5xl mx-auto mt-8 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 bg-white rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Customer Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        {...register("phone")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${errors.phone
                                            ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                            : "focus:ring-[#00A297]"
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        {...register("city")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${errors.city
                                            ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                            : "focus:ring-[#00A297]"
                                            }`}
                                    />
                                    {errors.city && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.city.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <textarea
                                        rows={3}
                                        placeholder="Delivery Address"
                                        {...register("details")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none resize-none ${errors.details
                                            ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                            : "focus:ring-[#00A297]"
                                            }`}
                                    ></textarea>
                                    {errors.details && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.details.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-2xl shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Payment Method
                            </h2>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="cash"
                                        {...register("payment")}
                                        defaultChecked
                                        className="accent-[#00A297]"
                                    />
                                    <span>Cash on Delivery</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="card"
                                        {...register("payment")}
                                        className="accent-[#00A297]"
                                    />
                                    <span>Credit / Debit Card</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl shadow-md h-fit">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Order Summary
                        </h2>

                        <div className="divide-y text-base">

                            {/* Cart Items */}
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <div
                                        key={item.product_id}
                                        className="flex justify-between py-1"
                                    >
                                        <span className="text-gray-700">
                                        {item.title.split(" ").slice(0, 2).join(" ")} (x{item.count})
                                        </span>
                                        <span className="text-gray-800 font-medium">
                                            {item.price * item.count} EGP
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">
                                    Your cart is empty
                                </p>
                            )}

                            {/* Subtotal */}
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="text-gray-800 font-medium">
                                    {subtotal} EGP
                                </span>
                            </div>

                            {/* Discount */}
                            {discount > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-700">Discount</span>
                                    <span className="text-red-500 font-medium">
                                        -{discount} EGP
                                    </span>
                                </div>
                            )}

                            {/* Total */}
                            <div className="flex justify-between py-2 font-semibold text-[#00A297] text-xl">
                                <span>Total</span>
                                <span>{totalAfterDiscount} EGP</span>
                            </div>
                        </div>

                        <button
                            disabled={loading || cartItems.length === 0}
                            className={`cursor-pointer w-full mt-4 px-6 py-2.5 rounded-xl text-white text-lg font-medium shadow-md transition
                                ${loading || cartItems.length === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#00A297] hover:bg-[#00887F]"
                                }`}
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
}    
