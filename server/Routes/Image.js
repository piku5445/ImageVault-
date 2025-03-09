const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware');
const adminMiddleWare = require('../middlewares/adminMiddleWare');
const multerMiddleWare=require('../middlewares/ImageUploadMiddleWare')

const router=express.Router()
const {UploadImage,fetchImages}=require('../controllers/ImageController')
router.post('/upload',authMiddleWare,adminMiddleWare,multerMiddleWare.single('image'),UploadImage)
//to get all imges
router.get('/get',authMiddleWare,fetchImages)
module.exports=router
