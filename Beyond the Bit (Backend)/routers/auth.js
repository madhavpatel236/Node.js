const express = require("express");
const { signupValidator } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailID, password, gender } = req.body;

    // validate the detail cradentiales
    signupValidatoralidator(req);

    // password hash
    const HashPasswordValue = await bcrypt.hash(password, 10); // bcrypt is a library from which we can encrypt our password directly.

    // creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailID,
      gender,
      password: HashPasswordValue,
    }); // Here 'User' is come form the model folder in which we have a user.js and in whcich we have a model User.

    await user.save();
    res.send("Saved the user data successfully!! ");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailID, password } = req.body;

  try {
    // check email is present in the DB or not
    const presentUser = await User.findOne({ emailID: emailID });
    if (!presentUser) {
      throw new Error("please enter valid email address!!");
    }
    // check the password
    const isPasswordValid = await presentUser.PasswordValidator(password); // here we directly add a functionality from the user model instand of write here because this is directly locked with the user.
    if (isPasswordValid) {
      // create a JWT token
      const token = await presentUser.getJWT(); // here we directly add a functionality from the user model instand of write here because this is directly locked with the user.

      // add a token to cookies and send the response back to the user from the server.
      res.cookie("token", token); // it is a expressjs property.
      res.send(presentUser);
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
