const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const cacheMiddleware = require("./cach");
const rateLimit = require("express-rate-limit");

const app=express();


require("dotenv").config();

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests  please try again later"
  });

app.use(express.json())
app.use(limiter);
app.use("/users",userRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port no ${process.env.port}`)
})
