import React from "react";
import { MdCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redex/features/userSlice";
import toast from "react-hot-toast";

const ItemCard = ({ data }) => {
  const dispatch = useDispatch()
  const item = useSelector(state => state.user.cartItems)
  // console.log("items",item)
  return (
    <div className="group w-full rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
        />

        {/* Veg / Non-Veg Badge */}
        {data.foodType === "veg" ? 
        (
            <div className="absolute flex top-3 right-3 items-center gap-2 border border-green-600 px-2 py-1 rounded-md">
                <MdCircle className="text-green-600" size={12} />
            </div>
        ) : 
        (
            <div className=" absolute top-3 right-3 flex items-center gap-2 border border-red-600 px-2 py-1 rounded-md">
                <MdCircle className="text-red-600" size={12} />
            </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">
          {data.name}
        </h1>

        {/* rating */}


        <div className="flex justify-between items-center">
            
          <p className="text-xl font-bold text-gray-900">
            ₹{data.price}
          </p>

          {/* Add to Cart */}
          <button onClick={()=> {
                dispatch(addToCart({
                id:data._id,
                name:data.name,
                price:data.price,
                image:data.image,
              // quantity:1,
                foodType:data.foodType
              }))
              toast.success("Add to cart 🛒");
          }
        } 
          className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all">
            + Add
          </button>
        </div> 
      </div>
    </div>
  );
};

export default ItemCard;
