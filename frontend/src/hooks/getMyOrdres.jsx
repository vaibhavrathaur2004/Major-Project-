import React, { useEffect } from 'react'
import axios  from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { use } from 'react'
import { setMyOrders } from '../redex/features/userSlice'

function getMyOrders(){
   const dispatch = useDispatch()
   const userData = useSelector(state=> state.user.userData)
  
    useEffect(()=>{
        const fetchMyOrders =async()=>{
            try{
                const result = await axios.get(`http://localhost:4000/api/order/my-orders`, {withCredentials:true})
                console.log("result", result.data.data);
                dispatch(setMyOrders(result.data.data))
            } catch (err) {
                console.log(err);
            }
        }
        fetchMyOrders()
    },[userData])
}
   
export default getMyOrders;
