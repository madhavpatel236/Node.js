// here we make a Model in which we have a Schema. Schema is nothing but the Structure which we need to follow to save the data in the database.

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    emailID: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // with the help of the 'unique' property index was automatically made behind the seen so we don't need to use the 'index' property. 
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
    },

    photoURL: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalide URL");
        }
      },
    },

    gender: {
      type: String,
      required: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("please add the right gender!!");
        }
      },
    },

    about: {
      type: String,
      default: "This is a default about us of this user",
    },

    skills: {
      type: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// here we directly add some functionality which is directly locked with the user model like make a token for the cookies or passwordValidator for the post /signin API.
userSchema.methods.PasswordValidator = async function (passwordEnteredByUser) {
  const currentUser = this;
  const passwordHash = currentUser.password 

  const checker = await bcrypt.compare(passwordEnteredByUser, passwordHash);

  return checker;
};

userSchema.methods.getJWT = async function () {
  const currentUser = this;

  const token = await jwt.sign({ _id: currentUser._id }, "Madhav@123", {
    expiresIn: "7d",
  }); // _id = paylode or secreat info and Madhav@123 = private key

  return token;
};

const userModel = mongoose.model("User", userSchema); // Here "User" is a Model name and "userSchema" is a Schema which we need to follow.
module.exports = userModel;
