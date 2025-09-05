const mongoose = require("mongoose"); 
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password: " + value);
      }
    }
  },
  photoUrl: {
    type: String,
    
  },
  gender: {
    type: String,
    enum:{
      values:["male","female","others"],
      message:'{VALUE} is not a valid type gender'
    }
    // validate(value) {
    //   if (!["male", "female", "others"].includes(value)) {
    //     throw new Error("Gender is not valid");
    //   }
    // }
  },
  about:{
    type:String
  },
  age:{
    type:Number,
    min:18
  }
  

}, { timestamps: true });

userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Chandu@1234560124");
  return token;
};


userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
