const Item = require("../models/Item");
const Shop = require("../models/Shop");
const cloudinary = require('cloudinary').v2;

async function uploadFileCloudinary(file,folder){
    const options = { folder };
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}


exports.addItem = async (req, res) => {
  try {
    const { name, price, category, foodType } = req.body;
    const file = req.files.image;
    const userId = req.user._id || req.user.id

    // Validation
    if (!name || !price || !category || !foodType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find shop of looged user id + 
    const shop = await Shop.findOne({ owner: userId });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found for this user",
      });
    }

    //image upload
    const responce = await uploadFileCloudinary(file,"CloudData");

    // Create item
    const item = await Item.create({
      name,
      price,
      category,
      image:responce.secure_url,
      foodType,
      shop: shop._id,
    });
   //update shop 
    const updatedShop = await Shop.findOneAndUpdate(
      { _id: shop._id },
      { $push: { items: item._id } },
      { new: true }
    ).populate("items");

    

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: updatedShop,
    });

  } catch (error) {
    console.log("Item creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//-
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params; // item id
    const { name, price, category, foodType } = req.body;
    const userId = req.user?._id || req.user?.id;

    // 1. Check shop of logged-in user
    const shop = await Shop.findOne({ owner: userId });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found for this user",
      });
    }

    // 2. Check item ownership (item must belong to this shop)
    const ownsItem = shop.items?.some((itemId) => String(itemId) === String(id));
    if (!ownsItem) {
      return res.status(403).json({
        success: false,
        message: "Item does not belong to this shop",
      });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (price !== undefined) updateFields.price = price;
    if (category !== undefined) updateFields.category = category;
    if (foodType !== undefined) updateFields.foodType = foodType;

    // Optional image update
    const file = req.files?.image;
    if (file) {
      const response = await uploadFileCloudinary(file, "CloudData");
      updateFields.image = response.secure_url;
    }

    const item = await Item.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Return updated shop (so frontend Redux can refresh without a full reload)
    const updatedShop = await Shop.findById(shop._id).populate("items");

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedShop,
    });

  } catch (error) {
    console.log("Item update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getItemById = async(req,res)=>{
  const {id} = req.params;
//  console.log(id);
  
  try{
    const item = await Item.findById(id);
    if(!item){
      return res.status(400).json({
        success: false,
        message: "Item not present",
     });
    }
    

    return res.status(200).json({
      success: true,
      message: "Item fetched successfully",
      data: item,
    });

  } catch (error) {
    console.log("Item creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params; // itemId
    const userId = req.user._id || req.user.id;

    // 1️⃣ Find shop of logged-in user
    const shop = await Shop.findOne({ owner: userId });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found for this user",
      });
    }

    // 2️⃣ Check item belongs to this shop
    const itemExists = shop.items.includes(id);
    if (!itemExists) {
      return res.status(403).json({
        success: false,
        message: "Item does not belong to this shop",
      });
    }

    // 3️⃣ Remove item from shop
    const updatedShop = await Shop.findByIdAndUpdate(
      shop._id,
      { $pull: { items: id } },
      { new: true }
    ).populate("items");

    // 4️⃣ Delete item from Item collection
    await Item.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: updatedShop,
    });

  } catch (error) {
    console.log("Item deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllItem = async (req,res)=>{
  try{
    const items = await Item.find({})
    if(!items){
      return res.status(400).json({
        success:false,
        message:"item is not present",
      })
    }

    return res.status(200).json({
      success:true,
      data:items
    })
  } catch (error) {
    console.log("Item deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

exports.getItemByCityy = async(req,res) => {
  const {city} = req.params;
  try{
    const shop = await Shop.find({city:city}).populate("items")
        if(!shop){
          return res.status(404).json({
            success: false,
            message: "Shop not found for this user",
          });
        }


        return res.status(200).json({
          success: true,
          data: shop,
      });
      
  }catch (error) {
    console.log("Item deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
exports.getItemByCity = async (req, res) => {
  const { city } = req.params;

  try {
    const shops = await Shop.find({ city }).populate("items");

    if (!shops || shops.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No shops found",
      });
    }

    const allItems = shops.flatMap(shop =>
      shop.items.map(item => ({
        ...item._doc,
        shopName: shop.name,
      }))
    );

    return res.status(200).json({
      success: true,
      data: allItems,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
