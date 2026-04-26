// index.js
const express = require('express');
const fileupload = require("express-fileupload");
const app = express();
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000

const {dbConnect} = require('./dbConfig/dbConnection')
dbConnect()
app.use(express.json())
app.use(cookieParser()); // For reading cookies

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
}));

app.use(fileupload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}));

const cloudinary = require('./dbConfig/cloudinary')
cloudinary.cloudinaryConnect();


const UserRoutes = require('./routes/userRoutes')
const ShopRoutes = require('./routes/shopRoutes')
const ItemRoutes = require('./routes/itemRoutes')
const OrderRoutes = require('./routes/orderRoutes')

app.use('/api/auth',UserRoutes)
app.use('/api/shop',ShopRoutes)
app.use('/api/item',ItemRoutes)
app.use('/api/order',OrderRoutes)
// Basic route
app.get('/', (req, res) => {
  res.send('this is the first request');
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running at  ${PORT} ✅`);
});
