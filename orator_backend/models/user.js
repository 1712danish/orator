const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    resetToken:String,
    expireToken:Date,
    user_type:{
        type:String,
        default:"user"
    }
})

exports.User = mongoose.model("User",userSchema);