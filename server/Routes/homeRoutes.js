const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware');
const { route } = require('./authRoute');
const router = express.Router();
router.get('/welcome', authMiddleWare, (req, res) => {
  const { username, userId, role } = req.userInfo;

  res.json({
    status: true,
    message: 'Welcome to home page',
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});
module.exports = router;
