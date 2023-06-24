const jwt = require('jsonwebtoken');

const requireAuthMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;


    // check json web token is existed & verify it
    if(token){
        jwt.verify(token , "jwt secret code", (err, decodedToken) => {
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

module.exports =  requireAuthMiddleware ;