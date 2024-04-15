const mongoose=require("mongoose");

const userProfileSchemal=mongoose.Schema({
    
    image_url:{type:String,require:true}
   
})


const UserProfileModal=mongoose.model("profiles",userProfileSchemal);



module.exports={UserProfileModal}