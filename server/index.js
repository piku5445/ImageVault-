const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/db');
const Router = require('./Routes/user');
const homeRoute = require('./Routes/homeRoutes');
const adminRoute = require('./Routes/adminRoutes');
const ImageRouter = require('./Routes/Image');

const app = express();


app.use(cors());
app.use(express.json({ limit: "100mb" })); // Increased JSON payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Increased URL-encoded payload limit
5
app.use('/api/website/user', Router);
app.use('/api/website/home', homeRoute);
app.use('/api/website/admin', adminRoute);
app.use('/api/website/image', ImageRouter);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
