const express = require('express');
const router = express.Router();

// load Signup controller
const { Signup, Login, Delete } = require("../../controllers/AuthController");
const { userVerification } = require("../../middleware/AuthMiddleware");

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.send('Users testing!'));

// @route   POST api/users/signup
// @desc    create new user
// @access  Public
router.post('/signup', Signup);

// @route post api/users/login
// @desc login existing user
// @access Public
router.post('/login', Login);

// @route post api/users/login
// @desc login existing user
// @access Public
router.post('/delete/', Delete);

// @route post api/users/verify
// @desc verify current user
// @access Public
router.post('/verify', userVerification);

module.exports = router;