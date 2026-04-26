const Order = require("../models/Order")
const Item = require("../models/Item");


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
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
