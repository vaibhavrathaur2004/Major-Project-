const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    image: {
        type: String,
         required: true,
    },
    city:{
        type:String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ],
    }, { timestamps: true }
)

module.exports = mongoose.model('Shop', ShopSchema);
