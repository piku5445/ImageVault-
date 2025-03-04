const express=require("express")
const authMiddleWare=require('../middlewares/authMiddleware')
const adminMiddleWare=require('../middlewares/adminMiddleWare')

const router=express.Router()
router.get("/welcome",authMiddleWare,adminMiddleWare,(req,res)=>{
    res.json({
        message:"welcome to admin page"
    })
})
module.exports=router