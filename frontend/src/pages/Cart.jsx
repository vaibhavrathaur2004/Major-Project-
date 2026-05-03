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
          <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            
            {/* Image */}
            <div className="bg-orange-50 p-6 rounded-full shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="empty-cart"
                className="w-24 opacity-80"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">
              Your cart is empty
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 mt-2 max-w-xs">
              Looks like you haven’t added anything yet. Let’s find something delicious 🍕
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-orange-600 hover:shadow-lg transition"
            >
              Order Food 🍔
            </button>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10 py-6">
  
            {/* Left - Items */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* <h2 className="text-2xl font-semibold text-gray-800">
                Your Order 🍽️
              </h2> */}

              {items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </div>

            {/* Right - Summary */}
            <div className="bg-white border shadow-md p-6 rounded-2xl h-fit sticky top-20">
              
              <h2 className="text-xl font-semibold mb-4">
                Bill Details
              </h2>

              {/* Calculations */}
              {(() => {
                const itemTotal = items.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                );

                const deliveryFee = itemTotal > 199 ? 0 : 40;
                const platformFee = 5;

                const total = itemTotal + deliveryFee + platformFee;

                return (
                  <>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Item Total</span>
                      <span>₹{itemTotal}</span>
                    </div>

                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                        {deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Platform Fee</span>
                      <span>₹{platformFee}</span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>

                    {/* Savings hint */}
                    {deliveryFee !== 0 && (
                      <p className="text-xs text-orange-500 mt-2">
                        Add items worth ₹{200 - itemTotal} more to get FREE delivery 🚀
                      </p>
                    )}

                    {/* CTA */}
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full mt-5 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition shadow-md"
                    >
                      Proceed to Checkout →
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
