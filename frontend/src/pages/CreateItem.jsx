import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdRestaurant } from "react-icons/md";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setShopData } from '../redex/features/ownerSlice';

const CreateItem = () => {
    const categoryList = ["indian",
        "chinese",
        "italian",
        "mexican",
        "south_indian",
        "north_indian",
        "fast_food",
        "desserts",
        "bakery",
        "beverages",
        "healthy",
        "bbq",
        "seafood",
        "vegan",
        "street_food"
    ]

    const owner = useSelector(state => state.owner.shopData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [foodType, setFoodType] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImage(file)
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formmdata = new FormData();
        formmdata.append("name", name)
        formmdata.append("price", price)
        formmdata.append("foodType", foodType)
        formmdata.append("category", category)
        formmdata.append("image", image)

        const result = await axios.post("http://localhost:4000/api/item/add-item", formmdata, { withCredentials: true })
        dispatch(setShopData(result.data.data))
        navigate(-1)
        console.log("responce", result.data.data);

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3">
            <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl relative ">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-3xl"
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                    <MdRestaurant className="text-[#FF5200]" />
                    Add Item
                </h1>

                <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>

                    {/* Item Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter item name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="₹ Price"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Food Type */}
                    <div>
                        <p className="block text-sm font-semibold text-gray-700 mb-2">
                            Food Type
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-5 cursor-pointer">
                                <input
                                    type="radio"
                                    name="foodType"
                                    value="veg"
                                    checked={foodType === "veg"}
                                    onChange={(e) => setFoodType(e.target.value)}
                                    className="accent-[#FF5200]"
                                />
                                Veg
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="foodType"
                                    value="nonveg"
                                    checked={foodType === "nonveg"}
                                    onChange={(e) => setFoodType(e.target.value)}
                                    className="accent-[#FF5200]"
                                />
                                Non-Veg
                            </label>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
                        >
                            <option value="">Select category</option>
                            {categoryList.map((item, index) => (
                                <option key={index} value={item}>
                                    {item.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Item Image
                        </label>

                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-[#FF5200] file:text-white
              hover:file:bg-[#ff3f00] cursor-pointer"
                        />

                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-2 w-full h-44 object-cover rounded-xl shadow"
                            />
                        ) : (<div className="w-full h-40 mt-2 bg-gray-100 border rounded-md flex items-center justify-center text-gray-400 text-sm">
                            Image Preview
                        </div>)}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-2 bg-[#FF5200] hover:bg-[#ff3f00] text-white py-3 rounded-xl font-semibold text-lg transition"
                    >
                        Add Item
                    </button>

                </form>
            </div>
        </div>
    );




}

export default CreateItem