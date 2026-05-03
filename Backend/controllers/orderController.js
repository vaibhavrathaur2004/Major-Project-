const Order = require("../models/Order")
const Item = require("../models/Item");
const User = require("../models/User");
const Shop = require("../models/Shop");


exports.placeOrder = async (req, res) => {
  const userId = req.user._id || req.user.id;

  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items provided" });
    }

    const shopOrders = {};
    let finalTotal = 0;

    for (let item of items) {
      // Fetch item from DB
      const foodItem = await Item.findById(item.id).populate("shop");
      if (!foodItem) {
        return res.status(400).json({ success: false, message: `Invalid item: ${item.name}` });
      }

      const shopId = foodItem.shop._id.toString(); // get shop id from DB
      const itemTotal = foodItem.price * item.quantity;

      if (!shopOrders[shopId]) {
        shopOrders[shopId] = {
          shop: shopId,
          items: [],
          shopTotal: 0,
        };
      }

      shopOrders[shopId].items.push({
        food: foodItem._id,
        quantity: item.quantity,
        name: foodItem.name,
        price: foodItem.price,
      });

      shopOrders[shopId].shopTotal += itemTotal;
      finalTotal += itemTotal;
    }

    const order = await Order.create({
      user: userId,
      shops: Object.values(shopOrders),
      finalTotal,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "pending" : "paid",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully ✅",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// ✅ GET USER ORDERS
// exports.getMyOrders = async (req, res) => {

//   const user = await User.findById(req.user.id);
//   if(user.role === 'user'){
//   }
//   if(user.role === 'owner'){
//   }
//   try {
//     const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
//           .populate("user", "name email") // user details
//           .populate("shops.shop", "name address image") // shop details
//           .populate("shops.items.food", "name price image description"); // food details

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getOwnerOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ "shops.shop": req.user.id }).sort({ createdAt: -1 })
//           .populate("user") // user details
//           .populate("shops.shop", "name address image") // shop details
//           .populate("shops.items.food", "name price image description"); // food details

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.getOrders = async (req, res) => {
  try {
    // Get user from DB
    const user = await User.findById(req.user.id);
    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let orders;

    // If normal user → get their own orders
    if (user.role === "user") {
      orders = await Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .populate("shops.shop", "name address image")
        .populate("shops.items.food", "name price image description");
    }

    // If owner → get orders for their shop
    if (user.role === "owner") {
      const myShops = await Shop.find({ owner: user._id }).select("_id");
      const myShopIds = myShops.map((s) => s._id);

      orders = await Order.find({ "shops.shop": { $in: myShopIds } })
        .sort({ createdAt: -1 })
        .lean({ virtuals: true })
        .populate("user", "name email phone")
        .populate("shops.shop", "name address image owner")
        .populate("shops.items.food", "name price image description");

      // Keep only the shops that belong to this owner (orders can include multiple shops)
      orders = orders.map((order) => {
        return {
          ...order,
          shops: (order.shops || []).filter((s) => {
            const shopId = s?.shop?._id || s?.shop;
            return myShopIds.some((id) => id.toString() === shopId?.toString());
          }),
        };
      });
    }

    // Optional: handle unknown role
    if (!orders) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role",
      });
    }

    res.status(200).json({
      success: true,
      data:orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("shops.shop");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if the logged in user is the owner of the shop for this order
    const isOwner = order.shops.some((s) => s.shop.owner.toString() === req.user.id);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this order",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}