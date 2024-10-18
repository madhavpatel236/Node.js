const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  // loggedin user show their own req. only
  // only show the interested status req.

  try {
    const loggedInUserId = req.user._id;

    const checkRequest = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoURL",
      "skills",
      "gender",
      "about",
      "age",
    ]);

    if (!checkRequest) {
      res.status(400).json({
        message: "there are no panding requests",
      });
    }
    res.json({
      message: `This is your pending requests`,
      checkRequest,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  // only show the loggedIn user connections
  // user cannot change any things only show the accepted req.

  try {
    const loggedinUser = req.user;

    const connections = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "accept",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoURL",
      "skills",
      "gender",
      "about",
      "age",
    ]);

    res.json({
      message: "This is your Connections!!!",
      connections,
    });
  } catch (err) {
    res.status(400).status("ERROR: ", err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  // feed structure:
  // - Do't show their profile card,
  // - Do't show their already connection cards [ "accepted", "rejected"]
  // - Do't show the already showed card like for this conditions [ "intesrested", "ignored" ]

  try {
    const loggedInUser = req.user;

    //  /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
    //  /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
    //  /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
    //  /feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)
    //  skip = (page-1)*limit;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Here we check that in the loggedin User collecetion there are any 4 request [ "accept", "reject", "interested" , "ignored"] are available for any user then we can't show the athor user(user: b) profile on the loggedin user profile.
    const availabaleConnectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select(" fromUserId toUserId "); // select work as a filter which value we add in the select that's only show at the end from the database, Here we also chain the .populate() for show the info of the users instand of ids.
    // another syntex:  .select(["fromUserId", "toUserId"])
    // another syntex:  .select(["fromUserId", "toUserId"]).populate("fromUserId", "firstName lastName skills")

    // Here we add the user which is not showen in the user feed from the availableConnectionRequest, in short for hide them we make a array of that user Id in this set().
    const hideUserFromFeed = new Set(); // set() is a data set which is work as a array but they cannot permit to enter the duplicate element into them.
    availabaleConnectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    // Now with the help of the upper set() we get the result as below

    const availableUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
      
    res.json({ data: availableUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
