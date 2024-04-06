const express=require("express");
const { addUser,getUser,editUser,deleteUser } = require("../controller/userController");
const userRouter=express.Router();




userRouter.post("/add",addUser);
userRouter.get("/allData",getUser)
userRouter.patch("/edit/:id",editUser)
userRouter.delete("/remove/:id",deleteUser)


module.exports={userRouter}