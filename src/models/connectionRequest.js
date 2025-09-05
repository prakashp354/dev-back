const mongoose = require ("mongoose");

const connectionRequestSchema= new mongoose.Schema({
   fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
   toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,

   },
   status:{
    type:String,
    required:true,
    enum:{
        values:["ignored","interested","accepted","rejected"],
        message:'{VALUE} is incorrect valid type '
    }
   }
},
{ timestamps:true}
);

connectionRequestSchema.pre("save",function(next){
    const connectionRequest =this;
    // checking for fromuserid to touserid same requset
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {throw new Error("Cannot Send The Request To Yourself!!!")
    }
    next();
});

const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;