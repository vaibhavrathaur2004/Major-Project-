const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post("/place-order",userAuth,placeOrder)

module.exports = router;
