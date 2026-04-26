import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentcity } from "../redex/features/userSlice";
import { setAddress, setLocation } from "../redex/features/mapsllice";

function getCurrentCity() {

    const dispatch = useDispatch()
    useEffect(() => {
        const apiKey = import.meta.env.VITE_GEOAPIKEY;

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;

            const res = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
            );
          //  console.log(res.data.results[0].formatted);
            
            dispatch(setCurrentcity(res.data.results[0].city))
            dispatch(setLocation({latitude,longitude}))
            dispatch(setAddress(res.data.results[0].formatted))
            
           
           
        });
    }, []);

    
}

export default getCurrentCity;
