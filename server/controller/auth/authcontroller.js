const User = require("../../model/user");
const { hashPassword, checkPassword } = require("../../lib/hash");
const jwt = require("jsonwebtoken");
const registerSchema = require("./authSchema").registerSchema;
const loginSchema = require("./authSchema").loginSchema;
const sendEmail = require("../../lib/email");
const { createAccessToken ,createRefreshToken,verifyRefreshToken} = require("../../lib/token");
const {OAuth2Client}=require("google-auth-library");
function getAppUrl() {
  return process.env.APP_URL || `http://localhost:${process.env.PORT}`;
}
function getGoogleClient(){
  const clientId=process.env.GOOGLE_CLIENT_ID;
  const clientSecret=process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri=process.env.GOOGLE_REDIRECT_URI;

  if(!clientId || !clientSecret || !redirectUri){
    throw new Error("Google OAuth environment variables are not set");
  }
  return new OAuth2Client(clientId,clientSecret,redirectUri);
}
const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existUser = await User.findOne({ email: normalizedEmail });

    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false,
   
    });
    
   //email verification
  const verification=jwt.sign({
     sub:newUser._id,


  },
  process.env.JWT_SECRET,
  {
    expiresIn:"1d"
  }


  )
    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verification}`;
    await sendEmail(
      newUser.email,
      "Verify Your Email",
      `<p>Please click the following link to verify your email: <a href="${verifyUrl}">Verify Email</a></p>`
    );

    res.status(201).json({
      message: "User registered successfully. Please check your email to verify your account.",
         user: {
        id: newUser._id,
       
        email: newUser.email,
        role: newUser.role,
       isVerified: newUser.isEmailVerified,


      },
    });
 
  } catch (err) {
  console.error("REGISTER ERROR:", err);
  res.status(500).json({
    message: err.message,
  });
}

};


const verifyEmailHandler = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({
      message: "Verification token is missing",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.json({
        message: "Email is already verified",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    return res.json({
      message: "Email is now verified! You can login",
    });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};

const login=async(req,res)=>{
    const result=loginSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: result.error.issues.map(e => e.message).join(", ")
        })
    }

    const {email,password}=result.data; 
    const normalizedEmail=email.toLowerCase().trim();
    const user=await User.findOne({email:normalizedEmail});

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const ok=await checkPassword(password,user.password);

    if(!ok){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

   if(!user.isEmailVerified){
    return res.status(403).json({
        message:"Please verify your email before logging in",
        isEmailVerified:false
    })
}
//    const accessToken = createAccessToken(user._id, user.role, user.tokenVersion);



// const refreshToken = createRefreshToken(
//   user._id,
//   user.tokenVersion
// );
const accessToken = createAccessToken(
  user._id.toString(),
  user.role,
  user.tokenVersion
);

const refreshToken = createRefreshToken(
  user._id.toString(),
  user.tokenVersion
);
    const isProd=process.env.NODE_ENV==="production";
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:isProd,
        sameSite: "lax",
        maxAge:7*24*60*60*1000
    })

    return res.json({
        message:"Login successful",
        accessToken,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            twoFactorEnabled: user.twoFactorEnabled,
          },
    })          
        }

async function refreshHandler(req, res) {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const payload = verifyRefreshToken(token);
   
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({ message: "Refresh token invalidated" });
    }

    // const newAccessToken = createAccessToken(
    //   user.id,
    //   user.role,
    //   user.tokenVersion
    // );

    // const newRefreshToken = createRefreshToken(
    //   user.id,
    //   user.tokenVersion
    // );
const newAccessToken = createAccessToken(
  user._id.toString(),
  user.role,
  user.tokenVersion
);

const newRefreshToken = createRefreshToken(
  user._id.toString(),
  user.tokenVersion
);
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Token refreshed",
      accessToken: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


const logoutHandler = async (_req, res) => {
  res.clearCookie("refreshToken", { path: "/" });

  return res.status(200).json({
    message: "Logged out",
  });
};
const crypto = require("crypto");

const forgotPasswordHandler = async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.json({
        message:
          "If an account with this email exists, we will send you a reset link",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await user.save();

    // const resetUrl = `${getAppUrl()}/auth/reset-password?token=${rawToken}`;
const resetUrl = `http://localhost:5173/reset-password?token=${rawToken}`;
    await sendEmail(
      user.email,
      "Reset your password",
      `
        <p>You requested password reset. Click on the below link to reset the password</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
      `
    );

    return res.json({
      message:
        "If an account with this email exists, we will send you a reset link",
    });

  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//const crypto = require("crypto");

const resetPasswordHandler = async (req, res) => {
  const { token, password } = req.body || {};

  if (!token) {
    return res.status(400).json({ message: "Reset token is missing" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be atleast 6 char long",
    });
  }

  try {
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() }, // expiry must be in future
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const newPasswordHash = await hashPassword(password);

    user.password = newPasswordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // invalidate old refresh tokens
    user.tokenVersion = user.tokenVersion + 1;

    await user.save();

    return res.json({
      message: "Password reset successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
async function googleAuthStartHandler(req, res) {
  try {
    const client = getGoogleClient();

   const url = client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["openid", "email", "profile"],
  redirect_uri: process.env.GOOGLE_REDIRECT_URI
});

    return res.redirect(url);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
async function googleAuthCallbackHandler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({
      message: "Missing code in callback",
    });
  }

  try {
    const client = getGoogleClient();

    const { tokens } = await client.getToken(code);
    //  console.log("Google OAuth tokens:", tokens,"code:",code);
    if (!tokens.id_token) {
      return res.status(400).json({
        message: "No google id_token is present",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload?.email;
    const emailVerified = payload?.email_verified;

    if (!email || !emailVerified) {
      return res.status(400).json({
        message: "Google email account is not verified",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
  const randomPassword = crypto.randomBytes(16).toString("hex");
  const passwordHash = await hashPassword(randomPassword);

  const name = payload?.name;

  user = await User.create({
    name,
    email: normalizedEmail,
    password: passwordHash,
    role: "user",
    isEmailVerified: true,
    twoFactorEnabled: false,
  });
}
    // const accessToken = createAccessToken(
    //   user.id,
    //   user.role,
    //   user.tokenVersion
    // );

    // const refreshToken = createRefreshToken(
    //   user.id,
    //   user.tokenVersion
    // );
const accessToken = createAccessToken(
  user._id.toString(),
  user.role,
  user.tokenVersion
);

const refreshToken = createRefreshToken(
  user._id.toString(),
  user.tokenVersion
);
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

return res.redirect(
  `${FRONTEND_URL}/google?token=${accessToken}`
);
    // return res.json({
    //   message: "Google login successfully",
    //   accessToken,
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role,
    //     isEmailVerified: user.isEmailVerified,
    //   },
    // });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


module.exports ={register,login,verifyEmailHandler,refreshHandler,logoutHandler,forgotPasswordHandler,resetPasswordHandler,googleAuthCallbackHandler,googleAuthStartHandler};
