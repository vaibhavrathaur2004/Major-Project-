import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const UserOrders = ({ orders }) => {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 md:p-10">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow hover:bg-orange-50 transition"
        >
          ←
        </button>

        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-orange-500">My</span> Orders
        </h1>
      </div>

      {/* Empty State */}
      {orders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            📦
          </div>
          <p className="text-gray-600 text-lg font-medium">No orders yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Start ordering your favorite food 🍔
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-orange-100"
            >
              
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-700">
                    {order._id}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === "pending"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status === "pending" ? "Pending" : "Completed"}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
                    {order.paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment"}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                    {order.paymentStatus === "pending" ? "Pending" : "Completed"}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="mt-5 bg-orange-50 p-3 rounded-xl border border-orange-100">
                <p className="text-xs text-gray-500">Delivery Address</p>
                <p className="text-sm text-gray-700 font-medium">
                  {order.deliveryAddress?.address}
                </p>
              </div>

              {/* Shops & Items */}
              <div className="mt-6 space-y-4">
                {order.shops?.map((shopData, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-gray-50 hover:bg-orange-50 transition"
                  >
                    {/* Shop Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={shopData.shop?.image}
                        alt="shop"
                        className="w-11 h-11 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {shopData.shop?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {shopData.shop?.address}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {shopData.items?.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between items-center bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.food?.image}
                              alt={item.food?.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.food?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="font-semibold text-gray-800">
                            ₹{item.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex px-2 justify-between items-center border-t pt-4">
                <p className="text-gray-500 text-sm">Total Amount</p>
                <p className="text-xl font-bold text-orange-600">
                  ₹{order.finalTotal}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders