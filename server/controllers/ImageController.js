const Image=require("../models/image")
const { uploadCloudinary } = require("../helpers/cloudinaryHelpers")
const UploadImage=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"please select file to upload"
            })
        }
        const {url,publicId}=await uploadCloudinary(req.file.path)
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
const fetchImages=async(req,res)=>{
    try{
        const images=await Image.find({});
        if(images){
            return res.status(200).json({
                success:true,
                data:images,
                message:"image fetched successfully"
            })
        }

    }
    catch(e){
        res.status(500).json({
            success:false,
            message:"error while fetching the images"
        })
    }
}
module.exports={UploadImage,fetchImages}