import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redex/features/mapsllice';
import L from "leaflet";
import axios, { getAdapter } from 'axios';
import { useNavigate } from 'react-router-dom';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const UpdateLocation = ({ location }) => {
  const map = useMap();

  React.useEffect(() => {
    if (location?.latitude && location?.longitude) {
      map.setView(
        [location.latitude, location.longitude],
        13,
        { animate: true }
      );
    }
  }, [location, map]);

  return null;
};





const CheckOut = () => {
  const navigate = useNavigate()
  const [addressInput, setAddressInput] = useState("");
  const user = useSelector(state => state.user.userData)
  
  const coods = useSelector(state => state.map.location)

  const address = useSelector(state => state.map.address)
  const items = useSelector(state => state.user.cartItems)
  console.log("items",items);
  
  const dispatch = useDispatch()

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  let deliveryfee = totalPrice > 200 ? "Free" : 40


  const getaddress = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_GEOAPIKEY;
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(res.data.results[0].formatted))
      console.log(res.data.results[0].formatted);

    } catch (err) {
      console.log(err)
    }
  }
  const getlocationByName = async () => {
    const apiKey = import.meta.env.VITE_GEOAPIKEY;
    try {
      const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&format=json&apiKey=${apiKey}`)
      console.log(res.data.results[0].bbox)
      const { lat1, lon1 } = res.data.results[0].bbox
      dispatch(setLocation({ latitude: lat1, longitude: lon1 }))


    }
    catch (err) {
      console.log(err)
    }
  }

  const onDragEnd = (e) => {
    if (!e) {
      console.log("event undefined");
      return;
    }

    const { lat, lng } = e.target.getLatLng();
    // console.log("Lat:", lat);
    // console.log("Lng:", lng);
    dispatch(setLocation({ latitude: lat, longitude: lng }))
    getaddress(lat, lng)


  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      dispatch(setLocation({ latitude, longitude }))
      getaddress(latitude, longitude)
    })
  }

  const PlaceOrder =async() =>{
    const formattedItems = items.map((item) => ({
      food: item.id,        // 🔥 id → food
      quantity: item.quantity,
      price: item.price,
    }));

    try{
      const data = {
        items:items,
        totalPrice,
        deliveryAddress: {
          address: addressInput,
          latitude:coods.latitude,
          longitude:coods.longitude,
        },
        paymentMethod: "cash",
      };
      const res = await axios.post("http://localhost:4000/api/order/place-order",data,{withCredentials:true})
      console.log(res.data)
      navigate("/order-success");

    }catch(err){
      console.log("err",err)
    }
  } 
  useEffect(() => {
    setAddressInput(address)
  }, [address])


  return (
    <div className="w-full min-h-screen bg-gray-100 py-6 ">
      
      <div className="max-w-4xl mx-auto px-4 relative">
         <button onClick={()=>navigate(-1)} className ="text-2xl   absolute top-2 right-6">X</button>
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">

          <div className="flex items-center gap-2 mb-4">
            <CiLocationOn className="text-2xl text-red-600" />
            <h2 className="text-lg font-semibold">Delivery Location</h2>
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter delivery address"
              className="flex-1 outline-none text-sm"
            />

            <button
              onClick={getlocationByName}
              className="bg-black text-white px-4 py-1 rounded-md text-sm"
            >
              Search
            </button>

            <MdMyLocation
              className="text-2xl cursor-pointer text-gray-700 hover:text-black"
              onClick={getCurrentPosition}
            />
          </div>

          <div className="mt-4 h-64 rounded-lg overflow-hidden">
            {coods?.latitude && coods?.longitude && (
              <MapContainer
                className="h-full w-full"
                center={[coods.latitude, coods.longitude]}
                zoom={13}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UpdateLocation location={coods} />
                <Marker
                  position={[coods.latitude, coods.longitude]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            )}
          </div>

        </div>
      </div>


      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-4">

          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="border-b pb-3 mb-3 space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <p className="font-medium">
                  {item.name} <span className="text-gray-800">x {item.quantity}</span>
                </p>
                <p className="font-medium ">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Total</p>
              <p>₹{totalPrice}</p>
            </div>

            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>{deliveryfee === "Free" ? "Free" : `₹${deliveryfee}`}</p>
            </div>

            <div className="flex justify-between">
              <p>GST</p>
              <p>₹18</p>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <p>Grand Total</p>
              <p>₹{deliveryfee === "Free" ? totalPrice + 18 : totalPrice + 40 + 18}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-md p-4">

          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

          <div className="space-y-3">

            {/* Cash on Delivery */}
            <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-black">
              <input
                type="radio"
                name="payment"
                className="accent-black"
                defaultChecked
              />
              <div>
                <p className="font-medium text-sm">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when your order arrives</p>
              </div>
            </label>

            {/* UPI */}
            <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-black">
              <input
                type="radio"
                name="payment"
                className="accent-black"
              />
              <div>
                <p className="font-medium text-sm">UPI</p>
                <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
              </div>
            </label>

            {/* Card */}
            <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-black">
              <input
                type="radio"
                name="payment"
                className="accent-black"
              />
              <div>
                <p className="font-medium text-sm">Credit / Debit Card</p>
                <p className="text-xs text-gray-500">Visa, MasterCard, RuPay</p>
              </div>
            </label>

          </div>

          {/* Place Order Button */}
          <button onClick={PlaceOrder}
            className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Place Order
          </button>

        </div>
      </div>



    </div>
  )
}

export default CheckOut