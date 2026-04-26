import React from 'react'

const ShopCard = ({data}) => {
  return (
    <div className="">

        <div className="w-80 h-50 shrink-0  flex flex-col items-center justify-center hover:scale-95">
            <img src={data.image} alt=""  className="h-full w-full  bg-amber-200 object-cover rounded-xl"    />
        </div>
        
        <div className="flex flex-col  mt-2">
            <p className="text-xl font-semibold">{data.name}</p>
            <p className="">⭐️ 4.1 . <span className="font-semibold">30-40 mins</span></p>

            <p>{data.address}</p>
        </div>
    </div>
  )
}

export default ShopCard