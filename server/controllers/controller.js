const User = require('../models/user');
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        status: false,
        message: "All the fields are required. Please fill the information."
      });
    }

    const userExist = await User.findOne({ $or:[{email},{username}]});
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "Email already exists."
      });
    }
    //hash your password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();
    res.status(200).json({
      status: true,
      message: "User registered successfully."
    });

  } catch (e) {
    console.error("Error in register", e);
    res.status(500).json({
      success: false,
      message: "Error in register"
    });
  }
};
const login=async(req,res)=>{
  try{
    const {username,password}=req.body
    if(!username || !password){
      return res.status(400).json({
        status:false,
        message:"All the feilds are required please fill the information"
      })
    }
  const existuser=await User.findOne({username})
  if(!existuser){
    return res.status(400).json({
      status:false,
      message:"User does not existu"

    })
  }
  const isPasswordMatched=await bcrypt.compare(password,existuser.password)
  // if(existuser.password!==password){
  //   return res.status(400).json({
  //     status:false,
  //     message:"password dont match"
  //   })
  // }
  if(!isPasswordMatched){
    return res.status(400).json({
      status:false,
      message:"password dont match"
    })
  }

  //craeting the token
  const accessToken=jwt.sign({
    userId:existuser._id,
    username:existuser.username,
    role:existuser.role

  },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
  res.status(200).json({
    status:true,
    message:"User logged in successfully",
    accessToken
  })
  }
  catch(e){
    console.error("error in login")
  }
}

module.exports ={register,login}