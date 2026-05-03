import React from 'react'

export const OwnerOrders = ({ orders }) => {

    const statusColors = {
    pending: "bg-orange-100 text-orange-600",
    preparing: "bg-yellow-100 text-yellow-600",
    delivered: "bg-green-100 text-green-600",
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 md:p-10">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        🍽️ <span className="text-orange-500">Owner</span> Orders
      </h1>

      {orders?.length === 0 ? (
        <p className="text-gray-500">No orders available</p>
      ) : (
        <div className="grid gap-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl p-6 shadow-md border border-orange-100 hover:shadow-xl transition"
            >
              
              {/* Top */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-700">
                    {order._id}
                  </p>

                  {/* User Info */}
                  <div className="mt-3 text-sm text-gray-700 flex gap-5">
                    <p>👤 {order.user?.name}</p>
                    <p className="text-blue-500">📞 {order.user?.phone}</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status === "pending" ? "Pending" : order.status === "preparing" ? "Preparing" : "Delivered"} 
                </span>
              </div>

              {/* Items */}
              <div className="mt-5 space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between bg-gray-50 p-2 rounded-lg"
                  >
                    <p className="text-sm">
                      {item.food?.name} × {item.quantity}
                    </p>
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="mt-4 text-sm text-gray-600">
                📍 {order.deliveryAddress?.address}
              </div>


                {/* Items */}
<div className="mt-5 space-y-4">
  {order.shops?.map((shopData, index) => (
    <div
      key={index}
      className="bg-gray-50 rounded-xl p-4 border border-gray-100"
    >
      
      {/* Shop Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={shopData.shop?.image}
          alt="shop"
          className="w-10 h-10 rounded-full object-cover"
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
            className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.food?.image}
                alt={item.food?.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.food?.name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-semibold text-gray-700">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                
                {order.status === "pending" && (
                  <button
                    onClick={() => updateStatus(order._id, "preparing")}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Accept Order
                  </button>
                )}

                {order.status === "preparing" && (
                  <button
                    onClick={() => updateStatus(order._id, "delivered")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Mark Delivered
                  </button>
                )}

                {order.status === "delivered" && (
                  <span className="text-green-600 font-medium">
                    ✅ Completed
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="mt-5 border-t pt-3 flex justify-between px-3">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-bold text-orange-600">
                  ₹{order.shops.reduce((total, shop) => {
                      const itemsTotal = shop.items.reduce((sum, item) => {
                        return sum + item.price * item.quantity;
                      }, 0);

                      return total + itemsTotal;
                    }, 0)}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

