const Image=require("../model/image")

const fs = require("fs");

const { uploadCloudinary, cloudinary } = require("../helpers/cloudinaryHelpers");

const UploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select images to upload",
      });
    }

    const userId = req.user.id;

    const uploadedImages = [];

    for (const file of req.files) {
      const { url, publicId } = await uploadCloudinary(file.path);

      fs.unlinkSync(file.path); // delete local file

      uploadedImages.push({
        url,
        publicId,
        uploadedBy: userId,
      });
    }

    const savedImages = await Image.insertMany(uploadedImages);

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      images: savedImages,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error while uploading images",
    });
  }
};
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
const fetchImagesController=async(req,res)=>{
    try{
     const page=parseInt(req.query.page)||1
     const limit=parseInt(req.query.limit)||2;
     const skip=(page-1)*limit
     const sortBy=req.query.sortBy || "createdAt"
     const totalImages=await Image.countDocuments()
     const sortOrder=req.query.sortOrder==='asc' ? 1 :-1
     const totalPages=Math.ceil(totalImages/limit);
     const sortObj={};
     sortObj[sortBy]=sortOrder;
     const images=await Image.find().sort(sortObj).skip(skip).limit(limit)
     if(images){
        res.status(200).json({
            success:true,
            currentPage:page,
            totalPages:totalPages,
            totalImages:totalImages,
            data:images,
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

    
  const deleteImageController = async (req, res) => {
  try {

    const userId = req.user.id;
    const imageId = req.params.id;

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    // check ownership
    if (image.uploadedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image"
      });
    }

    // delete from cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // delete from DB
    await Image.findByIdAndDelete(imageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (e) {
    console.log(e);

    res.status(500).json({
      success: false,
      message: "Error while deleting the image"
    });
  }
};
module.exports={UploadImage,fetchImages, deleteImageController,fetchImagesController}