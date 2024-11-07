const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validator");

const profileRoute = express.Router();

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    userInfo = req.user;
    res.send(userInfo);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user; // req.user come from the userAuth middleware.

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your data is upadate now!!!!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRoute;
