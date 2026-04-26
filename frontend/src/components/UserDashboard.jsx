import React, { useRef } from 'react'
import Navvar from './comman/Navvar'
const image1 = "/photo/image1.jpg";
const image2 = "/photo/image2.webp";
const image3 = "/photo/image3.jpg";
const image4 = "/photo/image4.avif";
const image5 = "/photo/image5.jpg";
const image6 = "/photo/image6.jpg";
const image7 = "/photo/image7.jpg";
const image8 = "/photo/image8.avif";
const image9 = "/photo/image9.jpg";
const image10 = '/photo/Aloo-paratha-in-plate.jpg'
import FoodTypeCard from './userPageComponent/FoodTypeCard'
import { useSelector } from 'react-redux'
import ShopCard from './userPageComponent/ShopCard'

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ItemCard from './userPageComponent/ItemCard';


const data = [
  {
    "name": "Burger",
    "type": "Fast Food",
    "image": image1
  },
  {
    "name": "Momos",
    "type": "Snack",
    "image": image2
  },
  {
    "name": "Paratha",
    "type": "Indian Food",
    "image": image3
  },
  {
    "name": "Cake",
    "type": "Dessert",
    "image": image4
  },
  {
    "name": "Noodles",
    "type": "Fast Food",
    "image": image5
  },
  {
    "name": "Ice Cream",
    "type": "Dessert",
    "image": image6
  },
  {
    "name": "Roll",
    "type": "Fast Food",
    "image": image7
  },
  {
    "name": "Pizza",
    "type": "Fast Food",
    "image": image8
  },
  {
    "name": "Sandwich",
    "type": "Snack",
    "image": image9
  },
  {
    "name": "Dosa",
    "type": "Indian Food",
    "image": image10
  },
  {
    "name": "Samosa",
    "type": "Snack",
    "image": image1
  },
  {
    "name": "Pasta",
    "type": "Fast Food",
    "image": image5
  }
]
 

const UserDashboard = () => {
  const city = useSelector(state=> state.user.currentCity)
  const [items ,setItems] = useState([])
  useEffect(()=>{
        const getItems =async(req,res)=>{
            try{
                const result = await axios.get(`http://localhost:4000/api/item/get-all`,{withCredentials:true})
              //  console.log("result", result.data);
                setItems(result.data.data)
                
            }
            catch(err){
                console.log(err);
            }   
        }
        getItems()
    },[])

  const shops = useSelector(state => state.user.shopInCity)
  
  const createRef = useRef()
  const shopRef = useRef()
  const scrollHandler = (direction, ref) => {
    if (ref.current) {
      const amount = 200;
      ref.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };



  return (
    <div >
      <Navvar />
      {/* food */}
      <div className=" w-11/12 flex flex-col gap-5  mx-auto  mt-8 " >

        <div className="flex justify-between items-center">

          <p className="text-2xl font-semibold text-start">  What's on your mind?   </p>
          <div className="flex gap-1 items-center">
            <button onClick={() => scrollHandler('left', createRef)} className="   bg-gray-200  hover:bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center z-10"
            >◀︎ </button>
            <button onClick={() => scrollHandler('right', createRef)} className="  bg-gray-200 hover:bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center z-10"
            >▶︎</button>

          </div>

        </div>

        <div className="w-full relative mt-8">

          <div className="w-full flex gap-10  overflow-x-auto border-b-2 pb-7 border-gray-300 " ref={createRef}>
            {
              data.map((ele, index) => (
                <FoodTypeCard data={ele} key={index} />

              ))
            }
          </div>


        </div>

      </div>

      {/* shop */}
      <div className=" w-11/12 flex flex-col gap-5 mx-auto border-b-2 border-gray-300 pb-8  mt-8 " >
        <div className="flex justify-between items-center">

          <p className="text-2xl font-semibold text-start"> Top restaurant chains in {city} </p>
          <div className="flex gap-1 items-center">
            <button onClick={() => scrollHandler('left', shopRef)} className="   bg-gray-200  hover:bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center z-10"
            >◀︎ </button>
            <button onClick={() => scrollHandler('right', shopRef)} className="  bg-gray-200 hover:bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center z-10"
            >▶︎</button>

          </div>

        </div>
        <div className="w-full relative">


          <div className="w-full flex gap-10  overflow-x-auto " ref={shopRef}>
            {
              shops.map((ele, index) => (
                <ShopCard data={ele} key={index} />

              ))
            }
          </div>


        </div>

      </div>

      {/* item */}
      <div className="w-11/12 mx-auto mt-8 flex flex-col bg-white p-2 sm:p-4 lg:p-6">
        <h1 className="ttext-xl sm:text-2xl font-semibold mb-4"> Order your first Food </h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
           {items.map((item,index)=>(
            <ItemCard data={item}  key={index}/>
           ))}

        </div>
      </div>

    </div>
  )
}

export default UserDashboard

