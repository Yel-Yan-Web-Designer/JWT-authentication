const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

// handle err for email & password
function handleErrors(err){
    console.log(err.message, err.code);
    let errors = {email : "", password : ""}; 

    // incorrect email
    if(err.message === "incorrect email"){
        errors.email = err.message
    }
    
    // incorrect pasword
    if(err.message === "incorrect password"){
        errors.password = err.message;
    }

    // duplicate email error
    if(err.code === 11000){
        errors.email = "This email is already registered"
        return errors;
    };

    // validation errors
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(x => {
            let { properties } = x;
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id }, "jwt secret code", {
        expiresIn : maxAge
    })
}

// controller action 
const signup_get = async (req, res) =>{
    res.render("signup");
}

const login_get = (req, res) => {
    res.render("login");
}
const logout_get = (req, res) => {
    res.cookie('jwt', '' , { maxAge : maxAge})
    res.redirect("/")
}

const signup_post =  async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.create({ email, password}); // create & save in database
        const token = await createToken (user._id);
        res.cookie('jwt', token , {
            httpOnly : true,
            maxAge : maxAge * 1000
        })
        return  res.status(201).json({ user });
    } catch (err) {
       const errors =  handleErrors(err);
       return res.status(400).json({errors});
    }
}


const login_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userCheck = await User.login(email, password);
        const token = await createToken(userCheck._id);
        res.cookie("jwt", token , {httpOnly : true , maxAge : maxAge * 1000 })
        return res.status(201).json({user : userCheck._id})
    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ errors });
    }
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}