import React, { useEffect } from 'react'
import axios  from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setShopInCity } from '../redex/features/userSlice'

function fetchShopInCity(){
   const dispatch = useDispatch()
   const city = useSelector(state=> state.user.currentCity)
   
  
    useEffect(()=>{
        const fetchshop =async(req,res)=>{
            try{
                const result = await axios.get(`http://localhost:4000/api/shop/get-shop/${city}`,{withCredentials:true})
               // console.log("result", result.data);
                dispatch(setShopInCity(result.data.data))
                
            }
            catch(err){
                console.log(err);
            }   
        }
        fetchshop()
    },[city])

   
}

export default fetchShopInCity;
