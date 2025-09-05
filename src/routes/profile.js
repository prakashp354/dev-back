const express = require("express");

const profileRouter = express.Router();
const{userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
try{
  const user = req.user;
 
  res.send(user)}
  catch(err){
    res.send("ERROR : "+err.message)
  };
});

// profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).send("User not authenticated");
//     }
//     console.log("PATCH /profile/edit payload", req.body);
//     if (!validateEditProfileData(req.body)) {
//       throw new Error("edit is invalid");
//     }
//     const newUser = req.user;
//     Object.keys(req.body).forEach((key) => (newUser[key] = req.body[key]));
//     await newUser.save();
//     res.json({
//       message: `${newUser.firstName}, successfully updated profile`,
//       data: newUser,
//     });
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!req.user) { 
      return res.status(401).send("User not authenticated");
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      // Immediately fail if no data
      return res.status(400).send("No profile data submitted");
    }
    if (!validateEditProfileData(req.body)) {
      throw new Error("edit is invalid");
    }
    const newUser = req.user;
    Object.keys(req.body).forEach((key) => (newUser[key] = req.body[key]));
    await newUser.save();
    res.json({
      message: `${newUser.firstName}, successfully updated profile`,
      data: newUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/forgotpassword",userAuth,async(req,res)=>{
     try{

     }catch(err){
      res.status(400).send("ERROR :"+err.message)
     }
});
module.exports = profileRouter;