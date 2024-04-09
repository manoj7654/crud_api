const express=require("express");
const { addUser,getUser,editUser,deleteUser,login } = require("../controller/userController");
const { authenticate } = require("../middleware/userAuthentication");
const userRouter=express.Router();




userRouter.post("/add",addUser);
userRouter.post("/login",login)
userRouter.get("/allData",authenticate,getUser)
userRouter.patch("/edit/:id",authenticate,editUser)
userRouter.delete("/remove/:id",authenticate,deleteUser)


module.exports={userRouter}