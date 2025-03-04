const mongoose = require("mongoose");
const ImageSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true,


    },
    publicId:{
        type:String,
        required:true,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    timestamp:true
})
module.export=mongoose.model("Image",ImageSchema)