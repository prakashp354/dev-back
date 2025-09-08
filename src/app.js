// const express = require("express");
// const connectDB = require ("./config/database");
// const app = express();


// const cookiePareser=require("cookie-parser");
// const jwt = require("jsonwebtoken"); 
// const cors = require("cors");


// app.use(cors({
//   origin:["http://localhost:5173", "http://3.27.114.89"],
//   credentials:true,
// }))
// app.use(express.json());
// app.use(cookiePareser());

// const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile");
// const requestRouter = require("./routes/request");
// const userRouter = require("./routes/user");

// app.use("/",authRouter);
// app.use("/",profileRouter);
// app.use("/",requestRouter);
// app.use("/",userRouter);

// connectDB()
// .then(()=>{
//     console.log("db successfully created")

// app.listen(7777,"0.0.0.0",()=>{
//     console.log("server running");
// });
// })
// .catch((err)=>{
//   console.log(err.message)
// });

// src/app.js


require("dotenv").config();  // ✅ Load environment variables from .env

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://3.27.114.89"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// ✅ Database Connection + Server Start
connectDB()
  .then(() => {
    console.log("✅ DB connected successfully");

    app.listen(process.env.PORT || 7777, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 7777}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });
