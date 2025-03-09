const Image=require("../models/image")
const { uploadCloudinary ,cloudinary} = require("../helpers/cloudinaryHelpers")
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


const deleteImageController=async(req,res)=>{
    try{
  
      //for deleating an image first we need userid and then we need image id so er can delete it both from database and cloudinary
  
      const userId=req.userInfo.userId
      const imageId=req.params.id
      //we will find the particular user then we will find the image id and then we will delete it\
    //   const user=await User.findById(userId)
    //   if(!user){
    //     res.status(400).json({
    //       success:false,
    //       message:"used doesnt exist"
    //     })
    //   }
      const image=await Image.findById(imageId)
      if(!image){
        res.status(400).json({
          success:false,
          message:"image doesnt exist"
        })
      }
      //check if the image is uploaded by the current user
      if(image. uploadedBy.toString()!=userId){
        return  res.status(403).json({
          success:false,
          message:"you are not authorized to delete this image"
        })
      }
    //   67cd36542aadf88dad1e2a36
      //delete the image from cloudinary
      await cloudinary.uploader.destroy(image.publicId)
  //delete the image from database
  await Image.findByIdAndUpdate(imageId)
    res.status(200).json({
      success:true,
      message:"image deleted successfully"
    })
    }catch(e){
      console.log(e)
      res.status(500).json({
        success:false,
        message:"error while deleting the image"
      })
  
    }
  }
module.exports={UploadImage,fetchImages, deleteImageController}