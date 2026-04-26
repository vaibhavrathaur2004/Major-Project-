import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/userPageComponent/CartItem";
import {  useNavigate } from 'react-router-dom';


const Cart = () => {
  const items = useSelector((state) => state.user.cartItems);
  const navigate  = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 ">
         
        
        {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          ←
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your Cart
        </h1>
      </div>


        {items.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty-cart"
              className="w-32 opacity-70"
            />
            <p className="text-xl text-gray-500">
              Your cart is empty
            </p>
            <button onClick={() =>navigate("/") } className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
              Order Now
            </button>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left - Items */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </div>

            {/* Right - Summary */}
            <div className="bg-gray-50 p-5 rounded-xl h-fit">
              <h2 className="text-xl font-semibold mb-4">
                Bill Details
              </h2>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Item Total</span>
                <span>
                  ₹{
                    items.reduce((total,item)=> total+item.quantity * item.price ,0)
                  }
                 
                </span>
              </div>

              {/* <div className="flex justify-between text-gray-600 mb-2">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div> */}

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ₹{
                    items.reduce((total,item)=>total+item.quantity*item.price,0 ) 
                  }
                 
                </span>
              </div>

              <button onClick={()=> navigate("/checkout")} className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
