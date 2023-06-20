const User = require("../models/userModel");

// handle err for email & password
function handleErrors(err){
    console.log(err.message, err.code);
    let errors = {email : "", password : ""}; 

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



// controller action 
const signup_get = async (req, res) =>{
    // try {
    //     const allUsers = await User.find({});
    //     return res.status(200).send({ allUsers});
    // } catch (err) {
    //     console.log(err);
    //     return res.status(400).send("Error, user not created");
    // }
    res.render("signup");
}

const login_get = (req, res) => {
    res.render("login");
}

const signup_post =  async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.create({ email, password}); // create & save in database
        return  res.status(201).json(user);
    } catch (err) {
       const errors =  handleErrors(err);
       return res.status(400).json(errors);
    }
}


const login_post = (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send("login post")
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}