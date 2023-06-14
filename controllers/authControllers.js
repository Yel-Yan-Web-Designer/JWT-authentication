const User = require("../models/userModel");

// controller action 

const signup_get = async (req, res) =>{
    try {
        const allUsers = await User.find({});
        return res.status(200).send({ allUsers});
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error, user not created");
    }
}

const login_get = (req, res) => {
    res.send("login get");
}

const signup_post =  async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.create({ email, password}); // create & save in database
        return  res.status(201).json(user);
    } catch (err) {
        console.log(err)
       return res.status(400).send("Error, user not created");
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