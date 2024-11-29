import React from 'react'
import { FaGithub, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-[#051616] text-white py-16 px-4">
            <div className="container mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                   

                    {/* Shop Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Shop Info</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/about" className="hover:text-primary">About Us</a></li>
                            <li><a href="/contact" className="hover :text-primary">Contact Us</a></li>  
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Account</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/book" className="hover:text-primary">Shop details</a></li>
                            <li><a href="/cart" className="hover:text-primary">Shopping Cart</a></li>
                            <li><a href="/Orders" className="hover:text-primary">Order History</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <div className="space-y-2 text-gray-300">
                            <p>Address: 01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh, Việt Nam</p>
                            <p>Email: 22110240@student.hcmus.edu.vn</p>
                            <p>Phone: 0849522039</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="relative flex w-full max-w-[600px]">
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="w-full px-4 py-3 rounded-full bg-white text-gray-800"
                        />
                        <button className="absolute right-0 bg-yellow-300 text-white px-6 py-3 rounded-full">
                            <span className="hover:text-black">Subscribe Now</span>
                        </button>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://github.com/phanvanthuan06052004/Mern-Project" className="text-white hover:text-primary border border-white rounded-full p-2">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://www.facebook.com" className="text-white hover:text-primary border border-white rounded-full p-2">
                            <FaFacebook size={20} />
                        </a>
                        <a href="https://www.youtube.com" className="text-white hover:text-primary border border-white rounded-full p-2">
                            <FaYoutube size={20} />
                        </a>
                        <a href="https://www.linkedin.com" className="text-white hover:text-primary border border-white rounded-full p-2">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-300">
                    <p>© Team Thuan Phat, Book MERN.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
