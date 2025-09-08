const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest=require("../models/connectionRequest");
const mongoose = require("mongoose");



const requestRouter = express.Router();

const sendEmail = require("../utils/sendEmail");

requestRouter.post("/request/send/:status/:toUserId",
  userAuth,
  async(req,res)=>{
  try{
    const  fromUserId= req.user._id;
    const toUserId= req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];
    if (!allowedStatus.includes(status)) {
  return res.status(400).json({
    message: "Invalid status value",
  });
}
      if (fromUserId.equals(toUserId)) {
      return res.status(400).json({
        message: "Cannot Send The Request To Yourself!!!",
      });
    }
    
    const toUser = await User.findById(toUserId)
    if(!toUser){
       return res.status(404).json({
        message :"User not found"
       });
    }
    // if there is an existing connection request
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[{fromUserId,toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    });
    if(existingConnectionRequest){
     return res.status(400).send({message :"Connection Request Already Exists"})
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,toUserId,status
    });
    const data = await connectionRequest.save();

    const emailRes = await sendEmail.run();

    console.log(emailRes)

    res.json({
      message:`${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    })
  }catch(err){
    res.status(400).send("ERROR :"+err.message
      
    )
  }
});
requestRouter.post("/request/review/:status/:requestId",
  userAuth,
  async(req,res)=>{
    try {
      const {status,requestId} = req.params;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Status not allowed!!!"});
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested",
      });
   
       if(!connectionRequest){
        return res.status(400).json({ message:"Connection Request Not Found"});
       }
       connectionRequest.status = status;
        
       const data = await connectionRequest.save();
       res.json({message:"connection request" + status ,data});
    } catch (error) {
      res.status(400).send("ERROR :"+ error.message)
    }
  }
);
module.exports=requestRouter;
