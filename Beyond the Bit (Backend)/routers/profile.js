const express = require("express");

const {userAuth} = require('../middlewares/auth')

const profileRoute = express.Router();

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send("reading cookies!!!!");
  } catch (err) {
    throw new Error("something went Wrong!!!!" + err.message);
  }
});

module.exports = profileRoute;
