const Image=require("../models/image")
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers")
const UploadImage=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"please select file to upload"
            })
        }
        const {url,publicId}=await uploadToCloudinary(req.file.path)
        const newImage=new Image({
            url:url,
            publicId:publicId,
            uploadedBy:req.userInfo.userId,
        })
        await newImage.save()
            return res.status(201).json({
                success:true,
                message:"image uploader Successfully",


                image:newImage
            })
    
    }
    catch(e){
        console.error(e)
    }
}
module.export={UploadImage}