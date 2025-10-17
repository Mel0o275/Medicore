import React from "react";
import { useForm } from "react-hook-form";
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


export default function Checkout() {

    const schema = z.object({
        name : z.string().min(3, "Name Must Be At Least 3 Characters"),
        email : z.string("Invalid Email Address").min(5, "Email Must Be At Least 5 Characters").email("Invalid Email Address"),
        phone : z.string().min(10, "Phone Number Must Be At Least 10 Digits").regex(/^[0-9]+$/, "Phone Number Must Contain Only Digits"),
        city : z.string().min(2, "City Must Be At Least 2 Characters"),
        address : z.string().min(5, "Address Must Be At Least 5 Characters")
    })

    const form = useForm({
        defaultValues: {
            name : "",
            email : "",
            phone : "",
            city : "",
            address : ""
        },
        resolver : zodResolver(schema)
    })

    const { register, handleSubmit, formState : {errors} } = form;

    function onsubmit(values) {
        console.log(values);
    }



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
                                        type="text"
                                        placeholder="Full Name"
                                        {...register("name")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${
                                            errors.name
                                                ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                                : "focus:ring-[#00A297]"
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.name.message}
                                        </p>
                                    )}
                                </div>
    
                                <div className="flex flex-col">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${
                                            errors.email
                                                ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                                : "focus:ring-[#00A297]"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.email.message}
                                        </p>
                                    )}
                                </div>
    
                                <div className="flex flex-col">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        {...register("phone")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${
                                            errors.phone
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
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none ${
                                            errors.city
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
                                        {...register("address")}
                                        className={`px-4 py-2 rounded-xl bg-gray-100 focus:bg-white focus:ring-2 outline-none resize-none ${
                                            errors.address
                                                ? "border-2 border-[#FFD166] focus:ring-[#FFD166]"
                                                : "focus:ring-[#00A297]"
                                        }`}
                                    ></textarea>
                                    {errors.address && (
                                        <p className="mt-2 text-[#8B6E00] bg-[#FFF9E6] border border-[#FFD166] rounded-lg px-3 py-1 text-sm">
                                            ⚠️ {errors.address.message}
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
                                        name="payment"
                                        defaultChecked
                                        className="accent-[#00A297]"
                                    />
                                    <span className="text-gray-700">
                                        Cash on Delivery
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="accent-[#00A297]"
                                    />
                                    <span className="text-gray-700">
                                        Credit / Debit Card
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
    
                    <div className="p-4 bg-white rounded-2xl shadow-md h-fit">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Order Summary
                        </h2>
                        <div className="divide-y text-base">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">Panadol (x2)</span>
                                <span className="text-gray-800 font-medium">
                                    100 EGP
                                </span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="text-gray-800 font-medium">
                                    100 EGP
                                </span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">Discount</span>
                                <span className="text-red-500 font-medium">
                                    -10 EGP
                                </span>
                            </div>
                            <div className="flex justify-between py-2 font-semibold text-[#00A297] text-xl">
                                <span>Total</span>
                                <span>90 EGP</span>
                            </div>
                        </div>
    
                        <button
                            className="cursor-pointer w-full mt-4 px-6 py-2.5 rounded-xl bg-[#00A297] text-white text-lg font-medium hover:bg-[#00887F] shadow-md transition"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}    
