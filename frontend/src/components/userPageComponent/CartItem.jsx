import React from "react";
import { useDispatch } from "react-redux";
import { MdCircle } from "react-icons/md";
import {toast} from 'react-hot-toast'
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../redex/features/userSlice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border rounded-xl p-4 shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Image */}
        <img
          src={data.image}
          alt={data.name}
          className="w-24 h-24 rounded-lg object-cover"
        />

        {/* Info */}
        <div className="flex flex-col gap-1">
          
          {/* Veg / Non-Veg */}
          <div
            className={`w-fit border px-2 py-1 rounded-md ${
              data.foodType === "veg"
                ? "border-green-600"
                : "border-red-600"
            }`}
          >
            <MdCircle  size={12}
              className={
                data.foodType === "veg"
                  ? "text-green-600"
                  : "text-red-600"
              }
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            {data.name}
          </h3>

          <p className="text-orange-500 font-bold">
            ₹{data.price}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 border rounded-full px-3 py-1">
          <button
            disabled={data.quantity === 1}
            onClick={() => dispatch(decreaseQuantity(data.id))}
            className={`text-lg ${
              data.quantity === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:text-red-500"
            }`}
          >
            −
          </button>

          <span className="font-medium">
            {data.quantity}
          </span>

          <button
            onClick={() => dispatch(addToCart(data))}
            className="text-lg hover:text-green-600"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
         onClick={() => {
            dispatch(removeFromCart(data.id));
            toast.error("Removed from cart 🛒");
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;