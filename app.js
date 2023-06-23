const express = require("express");
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const connectDB = require('./db/connectDB');

// middleware
app.use(express.static('./public'));
app.use(express.json()); // change json string into json when post req

// view engine
app.set('view engine', "ejs");


const port = process.env.PORT || 9000;


// database connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("Connected To DB");
        app.listen(port, () => console.log(`Server listens at ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start();


// routes
app.get("/", (req, res) => {
    return res.render("home")  
})
app.get("/smoothies", (req, res) => {
    return res.render("smoothies")
})

// authentication
app.use(authRoutes);


// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());


