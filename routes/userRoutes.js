const express=require("express");
const { addUser,getUser,editUser,deleteUser,login,getUsersByMonth,uploadProfile } = require("../controller/userController");
const { authenticate } = require("../middleware/userAuthentication");
const userRouter=express.Router();

const multer  = require('multer');

const uploader=multer({
    storage:multer.diskStorage({}),

})


userRouter.post("/add",addUser);
userRouter.post("/profile",uploader.single("file"),uploadProfile)
userRouter.post("/login",login)
userRouter.get("/allData",authenticate,getUser)
userRouter.get("/byMonth",getUsersByMonth)
userRouter.patch("/edit/:id",authenticate,editUser)
userRouter.delete("/remove/:id",authenticate,deleteUser)


module.exports={userRouter}