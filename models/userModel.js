const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email : {
        type : String,
        required  : true,
        unique : true,
        lowercase : true
    }, 
    password : {
        type : String,
        required : true,
        minLength : [6, "characters must be at least 6 words"]
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;