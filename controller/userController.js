const {UserModal}=require("../modal/userModal");



const addUser=async(req,res)=>{
    const {name,email,phone}=req.body;
    try {
        const user=new UserModal({name,email,phone});
        await user.save();
        res.status(201).json({message:"User added successfully"})
    } catch (error) {
        res.send(error.message)
    }
}

const getUser=async(req,res)=>{
    try {
        const user=await UserModal.find();
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

module.exports={addUser,getUser,editUser,deleteUser}