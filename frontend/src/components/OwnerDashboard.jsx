import React from 'react'
import Navvar from './comman/Navvar'
import { MdRestaurant } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemCard from './ownerPageComponent/ItemCard';



const OwnerDashboard = () => {
  const shop = useSelector(state => state.owner.shopData)
  console.log("shopdata" , shop)
  
  
 
  
  const navigate =useNavigate();
  return (
    <div className="w-full">
      <Navvar />

      {!shop && <div className="w-full max-w-md p-6 mx-auto shadow-lg flex gap-4 items-center flex-col mt-12 bg-white rounded-xl ">

        <MdRestaurant className="text-5xl text-[#FF5200] drop-shadow-md" />

        <h1 className="text-2xl font-semibold text-gray-800">
          Add Your Restaurant
        </h1>

        <p className="text-center text-gray-600 leading-relaxed">
          Join our food delivery platform and reach thousands of hungry customers every day.
        </p>

        <button  className="mt-4 w-full bg-[#FF5200] hover:bg-[#FF5400] transition text-white py-2 rounded-lg font-medium shadow-md"
        onClick={() => navigate("/create-shop")}>
          Get Started
        </button>

      </div>}

      

      {shop  &&   <div className="w-full max-w-[60%] mx-auto flex flex-col items-center mt-12 bg-white rounded-xl gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome To {shop?.name} ❤️
        </h1>

        <div className="w-[90%]  shadow overflow-hidden rounded-t-2xl">
          <img src={shop.image} alt="" className="w-full h-64 object-cover" />

          <div className="flex flex-col gap-1 pl-3 p-3">
            <p className="text-2xl font-semibold">{shop.name}</p>
            <p className="text-xl"> {shop.address} {shop.state}</p>
            <button className="mt-2 mb-3 bg-[#FF5200] hover:bg-[#FF5400] transition text-white py-2 rounded-lg font-medium shadow-md" onClick={()=>navigate("/add-item")}>
            Add items +
            </button>
          </div>
         
        </div>

        
      </div>}

      {shop?.items?.length > 0 ? (
        <div className="w-[90%] grid mt-6  mb-6 mx-auto gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shop.items.map((item, index) => (
            <ItemCard data={item} key={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-12">
        
        </p>
      )}
      

      

    </div>
  )
}

export default OwnerDashboard

