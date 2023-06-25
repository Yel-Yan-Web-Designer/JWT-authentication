const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/userModel");

const requireAuthMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;


    // check json web token is existed & verify it
    if(token){
        jwt.verify(token , "jwt secret code" , (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // if token exist, show user name in view else show nth
    if(token){
         jwt.verify(token , "jwt secret code",async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                console.log(user.email)
                res.locals.user = user;
                next();
            }
         })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports =  {requireAuthMiddleware, checkUser} ;