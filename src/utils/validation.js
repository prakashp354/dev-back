
// const validator=require("validator");

// const validateSignUpData = (req)=>{
//     const {firstName,lastName,emailId,password}=req.body;
//     if(!lastName || !firstName){
//         throw new Error("name is not valid!");
//     }
//      if(!validator.isEmail(emailId)){
//         throw new Error("email is not valid!");
//     }
//      if(!validator.isStrongPassword(password)){
//         throw new Error("password is not valid");
//     }
// };

// const validateEditProfileData= (req)=>{
//  const allowEditedFields = ["firstName","lastName","gender","age","about","emailId"]

//  const isEditAllowed = Object.keys(req.body).every((field)=>
//     allowEditedFields.includes(field)
// );
//  return isEditAllowed;
// };
// module.exports={
//     validateSignUpData,
//     validateEditProfileData
// }


// utils/validation.js
const validator = require("validator");

// ✅ Validate signup request body
const validateSignUpData = (body) => {
  const { firstName, lastName, emailId, password } = body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
};

// ✅ Validate profile edit request body
const validateEditProfileData = (body) => {
  // If body is missing or not an object → reject immediately
  if (!body || typeof body !== "object") return false;

  const allowedFields = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "about",
    "emailId",
    "photoUrl",   // 👈 added since your frontend sends it
  ];

  return Object.keys(body).every((field) =>
    allowedFields.includes(field)
  );
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
