import React from "react";

export default function WishlistLoading() {
    const skeletonItems = [1, 2, 3]; // 3 items

    return (
        <div className="max-w-5xl mx-auto mt-8 p-20">
            <div className="grid grid-cols-1 gap-6">
                {skeletonItems.map((id) => (
                    <div
                        key={id}
                        className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md border border-gray-100 animate-pulse"
                    >
                        {/* Left Side: Image + Text */}
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-xl bg-gray-200"></div>

                            <div className="space-y-3">
                                <div className="h-5 w-40 bg-gray-200 rounded"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        {/* Right Side: Buttons */}
                        <div className="flex items-center gap-3">
                            <div className="px-4 py-2 rounded-xl bg-gray-200 w-24 h-10"></div>
                            <div className="p-2 rounded-xl bg-gray-200 w-10 h-10"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
