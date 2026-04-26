const express = require('express');
const { signup, login, logout, getCurrentUser } = require('../controllers/userController');
const { userAuth } = require('../middleware/auth');
const router = express.Router();

// Routes
router.post('/user/signup', signup);
router.post('/user/login', login);
router.post('/user/logout', logout);

router.get('/user/current',userAuth,getCurrentUser)

module.exports = router;
