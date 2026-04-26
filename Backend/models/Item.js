const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    image: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    foodType: {
        type: String,
        enum:["veg","nonveg"]
    },
    category: {
        type: String,
        enum: [
            "indian",
            "chinese",
            "italian",
            "mexican",
            "south_indian",
            "north_indian",
            "fast_food",
            "desserts",
            "bakery",
            "beverages",
            "healthy",
            "bbq",
            "seafood",
            "vegan",
            "street_food"
        ],
        required: true
        }

    }, { timestamps: true }
)

module.exports = mongoose.model('Item', ItemSchema);
