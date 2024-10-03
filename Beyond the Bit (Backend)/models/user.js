// here we make a Model in which we have a Schema. Schema is nothing but the Structure which we need to follow to save the data in the database.

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    firstName:{
        type: String
    },

    lastName:{
        type: String
    },

    emailID:{
        type: String
    },

    password:{
        type: String
    },

    age:{
        type: Number
    },

    gender:{
        type: String
    }
})

const userModel = mongoose.model("User", userSchema) // Here "User" is a MOdel name and "userSchema" is a Schema which we need to follow.
module.exports = userModel;