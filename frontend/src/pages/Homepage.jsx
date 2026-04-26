import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryPartner from '../components/DeliveryPartner'

const Homepage = () => {
  const user = useSelector(state => state.user.userData)
  
  return (
    <div >
      {user.role === "user" && <UserDashboard/>}
      {user.role === "owner" && <OwnerDashboard/>}
      {user.role === "deliveryPartner" && <DeliveryPartner/>}

    </div>
  )
}

export default Homepage