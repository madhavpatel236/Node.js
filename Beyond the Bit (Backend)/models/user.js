// here we make a Schema which is a structure which is follow for save the data in the database.



const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    
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

const userModel = mongoose.model("User", userSchema)
module.exports = userModel;