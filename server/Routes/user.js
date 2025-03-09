const express = require('express');
const { register, login,changePassword } = require('../controllers/controller'); // Correct import

const router = express.Router();
const authMiddleWare = require('../middlewares/authMiddleware');
router.post('/register', register); // Register route
router.post('/login', login); // Login route
router.post('/changePassword', authMiddleWare,changePassword)

module.exports = router;
