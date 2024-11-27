import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useSelector } from 'react-redux'
import { useAuth } from '../Context/authContext';
import { toast } from 'react-toastify';

const navigation = [
    { name: "Dashboard", path: "/admin" },
    { name: "Order", path: "/Orders" },
    { name: "Cart", path: "/cart" },
    { name: "Check out", path: "/checkout" },
];
const Navbar = () => {
    const items = useSelector((state) => state.cart.cartItem)
    const [dropdown, setDropdown] = useState(false);
    const { currentUser, signout } = useAuth()
    console.log(currentUser)
    //handle signout
    const handleSignout = async () => { 
        try {
            await signout()
            setDropdown(false)
            toast.success("Đăng xuất thành công!")
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6 bg-blackBG'>
            <nav className='flex justify-between item-center'>
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to={"/"}> <RiBarChartHorizontalLine className='size-6' /> </Link>
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <HiOutlineSearch className='absolute inline-block left-3 inset-y-2' />
                        <input type="text" placeholder='search...' className='bg-[#EAEAEA] rounded-md w-full py-1 md:px-8 px-6 focus:outline-none' />
                    </div>
                </div>
                <div className='md:space-x-3 space-x-2 relative flex items-center'>
                    {currentUser ? <div className='relative'>
                        <button onClick={() => setDropdown(!dropdown)}>
                            {currentUser.photoURL ? <img src={currentUser.photoURL} alt="" className='size-7 rounded-full ring-2 ring-blue-500 ' /> : <img src={avatarImg} alt="" className='size-7 rounded-full ring-2 ring-blue-500 ' />}
                        </button>
                        {
                            dropdown && (
                                <div className='absolute right-0 mt-1 w-48 bg-white shadow-lg z-40 rounded-md'>
                                    <ul className='py-2'>
                                        {
                                            navigation.map((item) => (
                                                <li key={item.name} onClick={() => setDropdown(!dropdown)}>
                                                    <Link to={item.path} className='px-4 py-2 block text-sm hover:bg-gray-100'>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li onClick={() => handleSignout()} className='px-4 py-2 block text-sm hover:bg-gray-100'>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div> : <Link to="/login">
                        <FaRegUser className='size-6' />
                    </Link>}
                    <button className='hidden sm:block'>
                        <CiHeart className='size-6' />
                    </button>
                    <Link to={"/cart"} className='sm:px-6 p-1 px-2 flex items-center bg-primary rounded-md '>
                        <IoCartOutline className='' />
                        {
                            items.length > 0 ? <span className='text-sm sm:ml-1 font-semibold'>{items.length}</span> : <span className='text-sm sm:ml-1 font-semibold'>0</span>
                        }

                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
