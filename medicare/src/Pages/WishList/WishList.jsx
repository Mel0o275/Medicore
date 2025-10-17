import React, { useState } from "react";
import { Heart, Trash2 } from "lucide-react";

export default function WishList() {
    const [wishlist, setwishlist] = useState([
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

    function handledelete(id) {
        const updatedwishlist = wishlist.filter((item) => item.id !== id);
        setwishlist(updatedwishlist);
    }

    function addToCart(id) {
        console.log(`Item with id ${id} added to cart`);
        
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6">

            {wishlist.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl shadow-md text-center text-gray-600">
                    <Heart className="mx-auto mb-3 text-[#00A297]" size={40} />
                    <p className="text-lg font-medium mb-2">Your wishlist is empty!</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Start adding your favorite products.
                    </p>
                    <button className="cursor-pointer px-6 py-2.5 bg-[#00A297] text-white rounded-xl font-medium hover:bg-[#00887F] shadow-md transition">
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.price} EGP
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                onClick={() => addToCart(item.id)}
                                className="cursor-pointer px-4 py-2 rounded-xl bg-[#00A297] text-white text-sm font-medium hover:bg-[#00887F] transition shadow-md">
                                    Add to Cart
                                </button>
                                <button
                                onClick={() => handledelete(item.id)}
                                className="cursor-pointer p-2 rounded-xl bg-[#FFF9E6] border border-[#FFD166] text-[#8B6E00] hover:bg-[#FFEFBF] transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
