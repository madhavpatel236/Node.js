// from this model we will save the user data which is interested in other perticular profile or just ignored it.

const express = require("express");
const mongoose = require("mongoose");

const ConnectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["ignored", "interested", "accept", "reject"],
        message: `{VALUE} is incorrect status`,
      },
    },
  },
  { timestamps: true }
);

// compound index
ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// check if fromUserId and toUserId same then cannot give the permisson to send the req to them self.
ConnectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // console.log("connectionRequest: ", connectionRequest);
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("same User cannot send the req");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);
module.exports = ConnectionRequestModel;
