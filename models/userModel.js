const mongoose = require("mongoose");
const { Schema } = mongoose;
const {isEmail} = require('validator');
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    email : {
        type : String,
        required  : [true, "Please enter an email"],
        unique : true,
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
    }, 
    password : {
        type : String,
        required : [true, "Please enter a password"],
        minlength : [6, "Minimum password length is 6 characters"]
    }
});

// fire function before document saved to db
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})




const User = mongoose.model("User", UserSchema);
module.exports = User;

/*
What is the validate function val argument come from?
It is from submit form when user click submit btn and email will pass as an argument.
If it returns true, it's a valid email & if it return false we thorw error
*/