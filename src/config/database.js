const mongoose = require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://chandubajjuri354:Chandu12345@prakash354.vcazwu2.mongodb.net/devTinder");
};
module.exports=connectDB;