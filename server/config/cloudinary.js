const cloudinary = require("../config/cloudinary");

const uploadCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "imagevault"
  });

  return {
    url: result.secure_url,
    publicId: result.public_id
  };
};

module.exports = { uploadCloudinary, cloudinary };