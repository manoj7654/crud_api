const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
  });

  const uploadFile=async(filepath)=>{
    try {
        const result=await cloudinary.uploader.upload(filepath);
        console.log(result);
        return result
    } catch (error) {
        console.log(error.message)
    }
  }

  module.exports={uploadFile}