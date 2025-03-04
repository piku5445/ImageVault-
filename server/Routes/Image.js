const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware');
const adminMiddleWare = require('../middlewares/adminMiddleWare');
const multerMiddleWare=require('../middlewares/ImageUploadMiddleWare')
const router=express.Router()
const {UploadImage}=require('../controllers/ImageController')
router.post('/upload',authMiddleWare,adminMiddleWare,multerMiddleWare.single('image'),UploadImage)
module.exports=router