const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Only admin can access this route',
    });
  }
  next();
};
module.exports = isAdminUser;
