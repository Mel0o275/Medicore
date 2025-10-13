import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

//Mockup Footer Component

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">MyBrand</h2>
                    <p className="text-sm">
                        Your go-to place for stylish design and creative web experiences.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-pink-500 cursor-pointer">Home</li>
                        <li className="hover:text-pink-500 cursor-pointer">About</li>
                        <li className="hover:text-pink-500 cursor-pointer">Services</li>
                        <li className="hover:text-pink-500 cursor-pointer">Contact</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <FaFacebook className="hover:text-pink-500 cursor-pointer" />
                        <FaTwitter className="hover:text-pink-500 cursor-pointer" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                        <FaLinkedin className="hover:text-pink-500 cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="text-center text-sm border-t border-gray-700 py-4">
                © {new Date().getFullYear()} MyBrand. All rights reserved.
            </div>
        </footer>
    );
}
