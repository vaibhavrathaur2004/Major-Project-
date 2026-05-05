const express = require('express');
const { addItem, updateItem, getItemById, getAllItem, getItemByCity } = require('../controllers/itemController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post("/add-item",userAuth, addItem);
// Keep edit-item as the canonical item-by-id route (GET + PUT)
router.put("/edit-item/:id", userAuth, updateItem);
router.get("/edit-item/:id",userAuth, getItemById);
router.delete("/delete-item/:id",userAuth, getItemById);
router.get("/get-all/:city",userAuth, getItemByCity);

module.exports = router;
 
