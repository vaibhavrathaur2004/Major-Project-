const express = require('express');
const { createShop, getMyShop, getShopByCity } = require('../controllers/shopController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post("/add-shop",userAuth ,createShop)
router.get("/my-shop",userAuth ,getMyShop)
router.get("/get-shop/:city",getShopByCity)

module.exports = router;
