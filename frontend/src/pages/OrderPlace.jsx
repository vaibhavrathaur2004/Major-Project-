import React from "react";

const OrderPlace = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          🎉 Order Confirmed!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">
          Your food is being prepared 🍕  
          Sit tight, it’ll be on its way soon!
        </p>

        {/* Order Info */}
        <div className="bg-orange-100 rounded-lg p-4 mt-6 text-left">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Order ID:</span> #123456
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Status:</span> Preparing your food 👨‍🍳
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
            Track Order
          </button>
          <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
            Order More 🍔
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4">
          You’ll get updates when your order is on the way 🚴‍♂️
        </p>
      </div>
    </div>
  );
};

export default OrderPlace;