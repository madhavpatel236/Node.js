// here we make a Model in which we have a Schema. Schema is nothing but the Structure which we need to follow to save the data in the database.

const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    emailID: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    photoURL:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalide URL")
            }
        }
    },

    gender: {
        type: String,
        required: true,
        lowercase: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("please add the right gender!!")
            }
        }
    },

    about:{
        type: String,
        default: "This is a default about us of this user"
    },

    skills:{
        type: []
    },

},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
      }
})

const userModel = mongoose.model("User", userSchema) // Here "User" is a MOdel name and "userSchema" is a Schema which we need to follow.
module.exports = userModel;