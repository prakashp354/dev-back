    const expess = require("express");
    const {validateSignUpData}=require("../utils/validation");
    const User = require("../models/user");
    const authRouter = expess.Router();
    const bcrypt = require("bcrypt");

    authRouter.post("/signup",async(req,res)=>{
        try{  
      validateSignUpData(req.body);
      const {firstName,lastName,emailId ,password} = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash)
      const user = new User({firstName,lastName,emailId,password:passwordHash});
      const savedUser = await user.save();
      const token = await savedUser.getJWT();
          res.cookie("token", token, );

      res.json({ message:"user added successfully",data:savedUser})
      }catch(err){
        res.send("ERROR :"+err.message)
      }
    });

    // authRouter.post("/login",async(req,res)=>{
    //   try{
    //    const {emailId,password}=req.body;
    //    const user = await User.findOne({emailId:emailId})
    //    if(!user){
    //     throw new Error(" invalid credentials")
    //    }
    //    const isPasswordValid=await user.validatePassword(password);
    //    if(isPasswordValid){
    //     const token = await user.getJWT();
    //     res.cookie("token",token);
    //     res.send(user);
    //    }else{
    //     throw new Error("invalid credentials ")
    //    }
    //   }
    //   catch(err){
    //     res.send("ERROR : "+err.message)
    //   }
    // });

    authRouter.post("/login", async (req, res) => {
      try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
          const token = await user.getJWT();
          res.cookie("token", token, );
          return res.json(user); 
        } else {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });


    authRouter.post("/logout",async(req,res)=>{
      res.clearCookie("token", {
        httpOnly: true,
      });
      res.send("logged out");
    });

    module.exports = authRouter;
