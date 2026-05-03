import React from "react";
import { useSelector } from "react-redux";
import { OwnerOrders } from "../components/OwnerOrders";
import UserOrders from "../components/UserOrders";

const MyOrders = () => {
  const orders = useSelector((state) => state.user.myOrders);
  const user = useSelector((state) => state.user.userData);

  

  if (!user) return <div>Loading...</div>;
  return (
    <>
    {user.role === "user" ? (
      <UserOrders orders={orders} />
    ) : (
      <OwnerOrders orders={orders} />
    )}
  </>
  );
};

export default MyOrders;
