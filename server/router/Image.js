// const express = require('express');
// const authMiddleWare = require('../middlewares/authMiddleware');
// const adminMiddleWare = require('../middlewares/adminMiddleWare');
// const multerMiddleWare=require('../middlewares/ImageUploadMiddleWare')

// const router=express.Router()
// const {UploadImage,fetchImages,deleteImageController,fetchImagesController}=require('../controllers/ImageController')
// router.post('/upload',authMiddleWare,adminMiddleWare,multerMiddleWare.single('image'),UploadImage)
// //to get all imges
// router.get('/get',authMiddleWare,fetchImages)
// router.delete('/:id',authMiddleWare,adminMiddleWare,deleteImageController)
// module.exports=router
const express = require("express");

const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");
const upload = require("../middlewares/ImageUploadMiddleWare");

const {
  UploadImage,
  fetchImages,
  deleteImageController
} = require("../controller/ImageController");

const router = express.Router();

// Upload Image (Admin only)
router.post(
  "/upload",
  requireAuth,
  requireRole("admin"),
  upload.array("image", 10),
  UploadImage
);
// Get all images (Authenticated users)
router.get(
  "/get",
  requireAuth,
  fetchImages
);

// Delete image (Admin only)
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteImageController
);

module.exports = router;