const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'owner','deliveryPartner'],
        default: 'user',
    },
    }, { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);
