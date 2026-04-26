import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdRestaurant } from "react-icons/md";
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { setShopData } from '../redex/features/ownerSlice';

const CreateShop = () => {
    const owner = useSelector(state =>state.owner.shopData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("") 
    const [address,setAddress] = useState("")
    const [image,setImage] = useState("")

    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImage(file)
        }  
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formmdata = new FormData();
        formmdata.append("name",name)
        formmdata.append("city",city)
        formmdata.append("state",state)
        formmdata.append("address",address)
        formmdata.append("image",image)

        const result = await axios.post("http://localhost:4000/api/shop/add-shop",formmdata,{withCredentials:true})
        dispatch(setShopData(result.data.data))
        console.log("responce",result.data);
        
    }

    return (
        <div className="w-full max-w-lg mx-auto  p-6  rounded-xl shadow-lg mt-3 relative overflow-none">

            <button className="absolute top-0 right-0 text-black font-extrabold bor5er-none text-5xl" onClick={()=>navigate(-1)}>⤬</button>

            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
               <MdRestaurant  /> Create Your Shop
            </h1>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit} >

                {/* Shop Name */}
                <div>
                    <label className="block text-gray-700 font-medium">Shop Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter shop name"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                {/* City + State */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                            value={city}
                            onChange={(e)=> setCity(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">State</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                            value={state}
                            onChange={(e)=>setState(e.target.value)}
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 font-medium">Address</label>
                    <textarea
                        name="address"
                        rows="3"
                        placeholder="Enter full address"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium">Shop Image</label>

                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="mt-2 block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold    file:bg-blue-50 file:text-blue-700    hover:file:bg-blue-100"
                    />

                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            className="w-full h-40 object-cover rounded-md mt-3 shadow"
                            alt="Preview"
                        />
                    ) : (
                        <div className="w-full h-40 mt-3 bg-gray-100 border rounded-md flex items-center justify-center text-gray-400 text-sm">
                            Image Preview
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#FF5200] hover:bg-[#FF5600] text-white py-2 rounded-md font-semibold text-lg transition shadow">
                    Create Shop
                </button>

            </form>
        </div>
    );




}

export default CreateShop