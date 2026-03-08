const mongoose=require("mongoose");
require("dotenv").config();
const connectDb=async()=>{
try{
  await mongoose.connect(process.env.DBURL)
  console.log("Database connected successfully")
}

catch(err){
console.log("Database connection failed",err)
process.exit(1);
}
} 


module.exports=connectDb;