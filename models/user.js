const mongoose = require("mongoose");
// var Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema  = new mongoose.Schema({
    firstName : {
        type:String,
        trim: true,
        required : true
    },
    lastName :{
        type:String,
        trim: true,
        required : true
    },
    email :{
        type : String,
        trim : true,
        unique : true,
        require : true
    },
    // userName :{
    //     type : String,
    //     trim : true,
    //     unique : true,
    //     require : true
    // },
    profilePic :{
        type : String,
        defualt : "/images/profilePic.jpeg"
    }

});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User" , userSchema);

module.exports = User;
