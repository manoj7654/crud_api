const {UserModal}=require("../modal/userModal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const Upload=require("../helper/upload");
const { UserProfileModal } = require("../modal/userProfileModal");
require("dotenv").config()

const addUser=async(req,res)=>{
    const {name,email,phone,password}=req.body;
    try {
        const result=await UserModal.find({email});
        if(result.length){
            return res.json({message:"Email already exists"})
        }
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                res.json(err.message)
            }else{
                const user=new UserModal({name,email,phone,password:secure_password});
                await user.save();
            }

        })
       
        res.status(201).json({message:"User added successfully"})
    } catch (error) {
        res.send(error.message)
    }
}


const getUser=async(req,res)=>{
    const {limit}=req.query
    const {page}=req.query;
    const skip=(page*limit)-limit

    try {
        const user=await UserModal.find().skip(skip).limit(limit);
        res.status(200).json(user)
    } catch (error) {
        res.send(error.message)
    }
}

const editUser=async(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    try {
       await UserModal.findByIdAndUpdate({_id:id},body);
        res.status(200).json({mesage:"User data has been updated"})
    } catch (error) {
        res.send(error.message)
    }
}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
  
    try {
       await UserModal.findByIdAndDelete({_id:id});
        res.status(200).json({mesage:"User data has been deleted"})
    } catch (error) {
        res.send(error.message)
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModal.find({email});
        if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user[0]._id},process.env.key)
                res.status(200).json({message:"login successfull","token":token})
            }else{
                res.status(401).json(err)
            }
          })
        }else{
            res.send(err.mesage)
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getUsersByMonth = async (req, res) => {
    try {
        const usersByMonth = await UserModal.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    count: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);
        res.status(200).json(usersByMonth);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadProfile=async(req,res)=>{
    try {
        const upload=await Upload.uploadFile(req.file.path);
        let store=new UserProfileModal({
            image_url:upload.secure_url
        });
       let result= await store.save();
        res.json({message:"File upload successfull",url:result})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports={addUser,getUser,editUser,deleteUser,login,getUsersByMonth,uploadProfile}