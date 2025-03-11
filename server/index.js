const express =require('express')
const cors=require('cors')

require('dotenv').config()
const connectDB=require('./database/db')
const Router=require('./Routes/user')
const homeRoute=require('./Routes/homeRoutes')
const adminRoute=require('./Routes/adminRoutes')
const ImageRouter=require('./Routes/Image')

const app=express()
app.use(cors());
app.use(express.json())
app.use('/api/website/user',Router)
app.use('/api/website/home',homeRoute)
app.use('/api/website/admin',adminRoute)
app.use('/api/website/image',ImageRouter)
require('dotenv').config()
const PORT=process.env.PORT || 5000
connectDB().then(()=>{
    app.listen(PORT,
        console.log(`server is running on port ${PORT}`)
    )

}).catch((error)=>{
    console.log(error)
})

