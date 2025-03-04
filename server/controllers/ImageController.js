const UploadImage=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"please select file to upload"
            })
        }

    }
    catch(e){
        console.error("error while uploading the image")
    }
}