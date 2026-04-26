import React from 'react'

const FoodTypeCard = ({data}) => {
  return (
    <div className="">
    <div className="w-30 h-30 shrink-0  flex flex-col items-center justify-center hover:scale-105">
        <img src={data.image} alt=""  className="h-full w-full  bg-amber-200 object-cover rounded-full"    />
    </div>
        <div className="text-center mt-2 ">{data.name}</div>
    </div>
  )
}

export default FoodTypeCard