const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists
        const existing_user = await User.findOne({ email });
        if (existing_user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash the password
        const hash_password = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hash_password,
            phone,
            role,
        });

        // Create JWT payload
        const payload = {
            id: user._id
        };

        // Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Send token as cookie
        res.cookie('token', token);

        // Send response
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data:{
                user,
                token
            }
            
           
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password } = req.body;

        // Check for missing fields
        if (!email || !password ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists
        const existing_user = await User.findOne({ email });
        if (!existing_user) {
            return res.status(400).json({
                success: false,
                message: 'User NOT exists',
            });
        }

        // Hash the password
        const isPasswordMatched = await bcrypt.compare(password,existing_user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: 'wrong password',
            });
        }

        // Create JWT payload
        const payload = {
            id: existing_user._id
        };

        // Generate JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Send token as cookie
        res.cookie('token', token);

        // Send response
        return res.status(200).json({
            success: true,
            message: 'User Login successfully',
            data:{
              existing_user,
              token,   
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};

exports.logout = async(req,res)=>{
    try{
        res.clearCookie('token')
        return res.status(200).json({
            success: true,
            message: ' Log out successfully',
        });

    }catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

exports.getCurrentUser = async (req, res) => {
    return res.json({
        success: true,
        data: req.user
    });
};