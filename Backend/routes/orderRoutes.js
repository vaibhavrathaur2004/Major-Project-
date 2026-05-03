const express = require('express');
const { placeOrder, getMyOrders, getOwnerOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post("/place-order",userAuth,placeOrder)
router.get("/my-orders",userAuth,getOrders)
router.post("/update-order-status/:orderId",userAuth,updateOrderStatus)

// router.get("/user-orders",userAuth,getMyOrders)
// router.get("/owner-orders",userAuth,getOwnerOrders)

module.exports = router;
