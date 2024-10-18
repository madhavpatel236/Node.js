const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; // get the fromUserId from the middleware auth data
      const toUserId = req.params.userId;
      const status = req.params.status;

      // check the status of the request
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Incorret Status request!!!! ");
      }

      // check toUser is present in the DB or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("User not Present in DB!!!!");
      }

      // check if fromUserId and toUserId same then cannot give the permisson to send the req to them self.
      // this logic was writeen in the connectionRequest schema level with the help of the .pre function
      // Below concepts or validatoin is also valid at the API level.
      //  if(fromUserId == toUserId && toUserId == fromUserId){
      //     return res.status(400).send("Cannot sent the request to them self!!!!")
      // }

      // check that ConnectionRequest is already sent by the fromUser or toUser then we can't send the more one time req.
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          // mongoose Query: Here we check that at the time of sending the request by the fromUser and toUser, they may me sent the request each other or not if request sent earlier by any side then we cannot give the permission to send the req again.
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }, // here we swap the fromUserId to toUserId and wisevarsa because suppose if user 'A' sent a req to 'B' then user 'B' also cannot sent a req to the user 'A'.
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send("Connection already present!!!!");
      }

      // make a instance of the connectionRequestModel
      const ConnectionRequestData = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      // save the info at the DB
      await ConnectionRequestData.save();
      res.json({
        message: `${fromUserId} sent a connection successfully`,
        status,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

// Accept and reject the request API
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    // status only accept or reject
    // only change the status by the auth user

    try {
      const statusAllowed = ["accept", "reject"];

      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      if (!statusAllowed) {
        res.status(400).send("Status is invalid!!!!");
      }

      const conncetionRequest = await ConnectionRequest.findOne({
        _id: requestId, // Check the param request id to the database request saved reqest id.
        toUserId: loggedInUser._id, // check that only user that recive the request that show the options.
        status: "interested", // if other person send the req means interested in profile then and then show the options.
      });

      if (!conncetionRequest) {
        res.status(400).send({ message: "Connection request not found" });
      }

      conncetionRequest.status = status // we change the status in the DB as per the reciver status(Accept, reject)

      const data = await conncetionRequest.save();
      res.json({
        message: `Connection request accepted by the ${loggedInUser.firstName}`,
        data
      })

    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
