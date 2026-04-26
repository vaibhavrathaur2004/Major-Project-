const Shop = require("../models/Shop");
const cloudinary = require('cloudinary').v2;

async function uploadFileCloudinary(file,folder){
    const options = { folder };
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}

exports.createShop = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, city, state, address } = req.body;
    const file = req.files.image;
    //console.log("file",file);
    


    if (!name || !city || !state || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const responce = await uploadFileCloudinary(file,"CloudData");
   // console.log("responce of cloudinary",responce);
    

    // Create shop
    const shop = await Shop.create({
      name,
      image:responce.secure_url,
      city,
      state,
      address,
      owner: userId,
    });

    //console.log("shop create", shop);
    

    // Populate owner details
    await shop.populate("owner");

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });

  } catch (err) {
    console.log("Shop creation error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
 

exports.getMyShop = async (req, res) => {

  const userId = req.user._id || req.user.id;
  //console.log("use id", userId);
  
  try {
    const shop = await Shop.findOne({ owner: userId })
      .populate("owner").populate("items");
  
    

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.getShopByCity = async(req,res)=>{
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
    

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}