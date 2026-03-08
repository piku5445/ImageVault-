const { verifyAccessToken } = require("../lib/token");
const User = require("../model/user");

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;



  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "You are not auth user! you cant enter the building",
    });
  }

  const token = authHeader.split(" ")[1];


  try {
    const payload = verifyAccessToken(token);



    const user = await User.findById(payload.sub);


    if (!user) {
      return res.status(401).json({
        message: "User not found! you cant enter the building",
      });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({
        message: "Token invalidated",
      });
    }

    // Attach user info to request
    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = requireAuth;
