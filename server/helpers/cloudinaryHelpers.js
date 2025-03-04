const cloudinary=require('cloudinary')
const uploadCloudinary=async(filepath)=>{
    try{
const result=await cloudinary.uplloader.upload(filepath)
return{
    url:result.secure_url,
    publicId:result.public_id
}
    }catch(error){
        console.error("error while uploading the file to cloudinary",error)
        throw new Error("error while uploading the file to cloudinary")
    }
}
module.exports={uploadCloudinary}