import React from "react";
import { FaHome, FaInfoCircle, FaPhoneAlt, FaUser } from "react-icons/fa";

//Mockup Navbar Component

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold text-pink-600">MyBrand</div>
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <li className="flex items-center gap-2 hover:text-pink-500 cursor-pointer">
                        <FaHome /> Home
                    </li>
                    <li className="flex items-center gap-2 hover:text-pink-500 cursor-pointer">
                        <FaInfoCircle /> About
                    </li>
                    <li className="flex items-center gap-2 hover:text-pink-500 cursor-pointer">
                        <FaPhoneAlt /> Contact
                    </li>
                    <li className="flex items-center gap-2 hover:text-pink-500 cursor-pointer">
                        <FaUser /> Profile
                    </li>
                </ul>
            </div>
        </nav>
    );
}
