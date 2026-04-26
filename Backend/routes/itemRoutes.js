const express = require('express');
const { addItem, updateItem, getItemById, getAllItem } = require('../controllers/itemController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post("/add-item",userAuth, addItem);
router.put("/update-item",userAuth, updateItem);
router.get("/edit-item/:id",userAuth, getItemById);
router.delete("/delete-item/:id",userAuth, getItemById);
router.get("/get-all",userAuth , getAllItem);

module.exports = router;
 