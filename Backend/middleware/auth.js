const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        // Correct method
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user; 
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
