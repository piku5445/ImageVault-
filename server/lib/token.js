const jwt = require("jsonwebtoken");
      
const createAccessToken =(userId, role, tokenVersion) => {
  const payload = { sub: userId, role, tokenVersion };


  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );
};


const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired access token");
  }
};
const createRefreshToken = (userId, tokenVersion) => {
  const payload = {
    sub: userId,
    tokenVersion,
  };

  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );
};

module.exports = {
    createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
};