import React, { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaSearchLocation } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redex/features/userSlice';
import { setShopData } from '../../redex/features/ownerSlice';

const Navvar = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.user.userData)
    const shop = useSelector(state => state.owner.shopData)
    const city = useSelector(state => state.user.currentCity)
    const items = useSelector(state => state.user.cartItems)

    const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/user/logout', null, { withCredentials: true });
      console.log(res.data);
      
      dispatch(setUserData(null));
      dispatch(setShopData(null));
      setOpen(false);
      navigate("/login", { replace: true });
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

    return (
        <div className="bg-[#FF5200] shadow-md w-full">
            <div className="max-w-7xl mx-auto w-11/12 py-3 text-white flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#FCEDD6]">
                    Cravoni<span className="text-black">X</span>
                </h1>

                {/* USER NAV */}
                {user?.role === 'user' && (
                    <>
                        {/* Location + Search */}
                        <div className="hidden md:flex items-center gap-6">

                            {/* Location */}
                            <div className="flex items-center gap-2 hover:scale-105 transition">
                                <CiLocationOn size={24} />
                                <p className="text-sm font-medium">{city}</p>
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                                <FaSearchLocation size={18} className="text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search food..."
                                    className="text-black text-sm outline-none w-40 sm:w-56"
                                />
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4 sm:gap-6">

                            <Link
                                to="/my-orders"
                                className="hidden sm:block bg-black px-4 py-2 rounded-full text-sm hover:bg-gray-900 transition"
                            >
                                My Orders
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className="relative flex items-center gap-1 hover:scale-105 transition">
                                {items?.length > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {items.length}
                                    </span>
                                )}
                                <MdShoppingCart size={24} />
                            </Link>

                            {/* Profile */}
                            <div className="relative">
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="cursor-pointer flex items-center justify-center font-bold w-9 h-9 rounded-full bg-black text-white hover:scale-105 transition"
                                >
                                    {user?.name?.slice(0, 1)}
                                </div>

                                {/* Dropdown */}
                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            to="/my-orders"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Orders
                                        </Link>

                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                handleLogout()
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* OWNER NAV */}
                {user?.role === "owner" && (
                    <div className="flex gap-4 items-center">

                        {shop && (
                            <button className="bg-black px-4 py-2 rounded-full hover:bg-gray-900 transition">
                                + Add Food Item
                            </button>
                        )}

                        <Link
                            to="/my-orders"
                            className="bg-black px-4 py-2 rounded-full hover:bg-gray-900 transition"
                        >
                            Orders
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navvar
