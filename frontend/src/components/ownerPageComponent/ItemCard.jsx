import React from 'react';
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



const ItemCard = ({ data }) => {
    const navigate = useNavigate()
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 m-4 transform transition hover:scale-105 hover:shadow-2xl">
      
      {/* Image */}
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <button onClick={()=>navigate(`/edit-item/${data._id}`)} className="absolute top-2 right-2" ><MdEdit size={34} color="#FF5200" className="bg-white p-1 rounded-full hover:bg-gray-300"  /></button>
      </div>

      {/* Info */}
     <div className="p-4 flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 truncate">{data.name}</h2>
        
        <p className="text-black font-medium">
            Price: <span className="text-[#FF5200] font-semibold">₹{data.price}</span>
        </p>
        
        <p className="text-black font-medium">
            Type: <span className="capitalize">{data.foodType}</span>
        </p>
        
        <p className="text-black text-sm">
            Category: <span className="uppercase font-medium">{data.category}</span>
        </p>
        </div>


      
    </div>
  );
};

export default ItemCard;
