//connect to data base
const mongoose=require('mongoose')
require('dotenv').config()
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DBURL,{
           
            
        })
       
        console.log("connected sucessfully")

    }
    catch(e){
        console.error("connection failed")
        process.exit(1)
    }
}
module.exports=connectDB