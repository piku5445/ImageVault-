const jwt = require('jsonwebtoken');
const authMiddlewre = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Token not found please login to continue',
    });
  }
  //user information
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.userInfo = decoded;
    next();
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: 'Token not found please login to continue',
    });
  }
};
module.exports = authMiddlewre;
