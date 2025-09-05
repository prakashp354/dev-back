// middlewares/auth.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login!!");
    }

    let decodedObj;
    try {
      decodedObj = jwt.verify(token, "Chandu@1234560124"); // Use env var for secret in prod!
    } catch (err) {
      return res.status(401).send("Invalid token");
    }

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
