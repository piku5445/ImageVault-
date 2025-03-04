const express = require('express');
const { register, login } = require('../controllers/controller'); // Correct import

const router = express.Router();

router.post('/register', register); // Register route
router.post('/login', login); // Login route

module.exports = router;
