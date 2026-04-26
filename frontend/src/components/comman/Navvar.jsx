import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaSearchLocation } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';


const Navvar = () => {
    const user  =useSelector(state => state.user.userData)
    const shop = useSelector(state => state.owner.shopData)
    const city = useSelector(state=>state.user.currentCity)
    const items = useSelector(state=>state.user.cartItems)

    return (
        <div className="bg-[#FF5200]  w-full">
            <div className="max-w-7xl mx-auto w-11/12 py-3 text-white flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-3xl text-[#FCEDD6]font-bold tracking-wide">Sasta Swiggy</h1>

                {/* Location + Search */}
                {user.role === 'user' && 
                    <div className="flex items-center gap-6">

                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <CiLocationOn size={25} />
                            <p className="text-lg font-medium">{city}</p>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                            <FaSearchLocation size={20} className="text-gray-600" />
                            <input
                                type="text"
                                placeholder="Search for food..."
                                className="text-black text-sm outline-none w-40 sm:w-56"
                            />
                        </div>
                    </div>
                }

                {/* Cart + Sign in */}
                {user.role === 'user' && 
                    <div className="flex items-center gap-6">

                        {/* Cart */}
                        <div className="flex items-center gap-2 cursor-pointer relative  p-1" >
                           {items?.length > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                {items.length}
                                </span>
                            )}
                            <MdShoppingCart size={25} />
                            <Link to="/cart" className="text-lg">Cart</Link>
                        </div>

                        {/* Sign in */}
                        <div className="flex items-center gap-2">
                            {/* <FiUser size={24} /> */}
                            {/* <Link
                                to="/signup"
                                className="bg-black text-white px-4 py-2 rounded-lg font-medium"
                            >
                                Sign In
                            </Link> */}

                            <p className="flex items-center justify-center font-bold p-1 w-8 h-8 rounded-full bg-black text-white">{user?.name.slice(0,1)}</p>
                        </div>
                    </div>
                }

                {user.role === "owner" && 
                   <div className="flex gap-5 items-center justify-center ">
                   {shop &&  
                     <button className=" text-xl bg-black px-5 py-2 rounded"> + Add Food Item </button>
                   }

                    <div className="relative">
                        <button className="text-xl  bg-black px-5 py-2 rounded">My Orders</button>
                        {/* <span className="absolute flex items-center justify-center bg-[#886840] w-7 rounded-full p-1 ">0</span> */}
                    </div>
                   </div>
                }
            </div>
        </div>

    )
}

export default Navvar